// Dependencies
const getPath              = require('path');
const webpack              = require('webpack');

// Shared plugins
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');

// Development plugins
const ManifestPlugin       = require('webpack-manifest-plugin');

// Production plugins
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const UglifyJSPlugin       = require('uglifyjs-webpack-plugin');

// Set constants
const ENVIRONMENT = require('./environments');
const PATH        = require('./paths');

const sharedPlugins = [

  // Copies files during builds
  // See: https://github.com/kevlened/copy-webpack-plugin
  new CopyWebpackPlugin([
    {
      from: PATH.STATIC_DIR + '/robots.txt',
      to: PATH.OUTPUT_DIR
    },
    {
      from: PATH.STATIC_DIR + '/favicon.ico',
      to: PATH.OUTPUT_DIR
    }
  ]),

  // Creates and manipulates HTML
  // See: https://github.com/jantimon/html-webpack-plugin
  new HtmlWebpackPlugin({
    template: PATH.STATIC_DIR + '/index.html'
  })

];

const ENVIRONMENT_PLUGINS = {
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

  ],
  'production': [

    // Cleans out the build directories
    // See: https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(
      [
        PATH.OUTPUT_DIR
      ],
      {
        root: PATH.ROOT_DIR
      }
    ),

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
    new NameAllModulesPlugin(),

    // Compress output
    new UglifyJSPlugin(),

    // Extracts files from bundles
    new ExtractTextPlugin({
      filename: 'styles-[chunkhash].css'
    })

  ]
};

let PLUGINS = [];
PLUGINS.push.apply(PLUGINS, sharedPlugins);
PLUGINS.push.apply(PLUGINS, ENVIRONMENT_PLUGINS[ENVIRONMENT]);

module.exports = PLUGINS;
