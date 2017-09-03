const getPath              = require('path');
const webpack              = require('webpack');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const ManifestPlugin       = require('webpack-manifest-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');

const ENVIRONMENT = require('./constants_environment');
const PATH = require('./constants_path');

const sharedPlugins = [

  // Copies files during builds
  // See: https://github.com/kevlened/copy-webpack-plugin
  new CopyWebpackPlugin(
    [
      {
        from: PATH.STATIC_DIR + '/robots.txt',
        to: PATH.OUTPUT_DIR
      },
      {
        from: PATH.STATIC_DIR + '/favicon.ico',
        to: PATH.OUTPUT_DIR
      },
      {
        from: PATH.STATIC_DIR + '/index.html',
        to: PATH.OUTPUT_DIR
      }
    ]
  ),

  // Creates and manipulates HTML
  // See: https://github.com/jantimon/html-webpack-plugin
  new HtmlWebpackPlugin(
    {
      template: PATH.STATIC_DIR + '/index.html'
    }
  ),

  // Cleans out the build directories
  // See: https://github.com/johnagan/clean-webpack-plugin
  new CleanWebpackPlugin(
    [
      PATH.OUTPUT_DIR
    ],
    {
      root: PATH.ROOT_DIR
    }
  )
];

const ENVIRONMENT_PLUGINS = {
  'production': [

    // Output the name of modules during HMR/Dev
    // See: https://webpack.js.org/plugins/named-modules-plugin/
    new webpack.NamedModulesPlugin(),

    // Gives each chunk a name. Useful for long-time caching of modules
    new webpack.NamedChunksPlugin(
      (chunk) => {
        if (chunk.name) {
          return chunk.name;
        }
        return chunk
          .mapModules(m => getPath.relative(m.context, m.request))
          .join('_');
      }
    ),

    // Separate out common chunks from the JS Bundles
    // See: https://webpack.js.org/plugins/commons-chunk-plugin/
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),

    // Gives each module a name for good caching
    new NameAllModulesPlugin()

  ],
  'development': [

    // Create a JSON manifest of all assets managed by webpack
    // See: https://github.com/danethurber/webpack-manifest-plugin
    new ManifestPlugin(
      {
        fileName: 'webpack-manifest.json'
      }
    ),

    // Reload only the modules that have changed
    new webpack.HotModuleReplacementPlugin()

  ]
};

let PLUGINS = [];
PLUGINS.push.apply(PLUGINS, sharedPlugins);
PLUGINS.push.apply(PLUGINS, ENVIRONMENT_PLUGINS[ENVIRONMENT]);

module.exports = PLUGINS;
