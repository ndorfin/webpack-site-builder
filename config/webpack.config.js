// Dependencies
const PATH = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');

// Root folders
const CONFIG_DIR = PATH.resolve(__dirname, '.'),
      ROOT_DIR   = PATH.resolve(__dirname, './..'),
      INPUT_DIR  = PATH.resolve(__dirname, './../src'),
      OUTPUT_DIR = PATH.resolve(__dirname, './../dist');

// If we want to process files during bundling
const DATA_DIR   = INPUT_DIR + '/data',
      SCSS_DIR   = INPUT_DIR + '/scss';

// Any static files should go into one of these folders
const STATIC_DIR = INPUT_DIR + '/static';
const CSS_DIR    = STATIC_DIR + '/css',
      FONTS_DIR  = STATIC_DIR + '/fonts',
      IMG_DIR    = STATIC_DIR + '/img',
      JSON_DIR   = STATIC_DIR + '/json';

// Start config
module.exports = {
  entry: {
    app: INPUT_DIR + '/index.js',
    print: INPUT_DIR + '/print.js',
    vendor: [
      'lodash'
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: OUTPUT_DIR
  },
  plugins: [

    // Copies files during builds
    // See: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin(
      [
        {
          from: STATIC_DIR + '/robots.txt',
          to: OUTPUT_DIR
        },
        {
          from: STATIC_DIR + '/favicon.ico',
          to: OUTPUT_DIR
        },
        {
          from: STATIC_DIR + '/index.html',
          to: OUTPUT_DIR
        }
        // // {output}/file.txt
        // { from: 'from/file.txt' },
        // // {output}/to/file.txt
        // { from: 'from/file.txt', to: 'to/file.txt' },
        // // {output}/to/directory/file.txt
        // { from: 'from/file.txt', to: 'to/directory' },
        // // Copy directory contents to {output}/
        // { from: 'from/directory' },
        // // Copy directory contents to {output}/to/directory/
        // { from: 'from/directory', to: 'to/directory' },
        // // Copy glob results to /absolute/path/
        // { from: 'from/directory/**/*', to: '/absolute/path' },
        // // Copy glob results (with dot files) to /absolute/path/
        // {
        //   from: {
        //     glob:'from/directory/**/*',
        //     dot: true
        //   },
        //   to: '/absolute/path'
        // },
        // // Copy glob results, relative to context
        // {
        //   context: 'from/directory',
        //   from: '**/*',
        //   to: '/absolute/path'
        // },
        // // {output}/file/without/extension
        // {
        //   from: 'path/to/file.txt',
        //   to: 'file/without/extension',
        //   toType: 'file'
        // },
        // // {output}/directory/with/extension.ext/file.txt
        // {
        //   from: 'path/to/file.txt',
        //   to: 'directory/with/extension.ext',
        //   toType: 'dir'
        // }
      ],
      {
        // ignore: [
        //   // Doesn't copy any files with a txt extension
        //   '*.txt',
        //   // Doesn't copy any file, even if they start with a dot
        //   '**/*',
        //   // Doesn't copy any file, except if they start with a dot
        //   { glob: '**/*', dot: false }
        // ],
        // // By default, we only copy modified files during
        // // a watch or webpack-dev-server build. Setting this
        // // to `true` copies all files.
        // copyUnmodified: true
      }
    ),

    // Creates and manipulates HTML
    // See: https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin(
      {
        template: STATIC_DIR + '/index.html'
      }
    ),

    // Cleans out the build directories
    // See: https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(
      [
        OUTPUT_DIR
      ],
      {
        root: ROOT_DIR
      }
    ),

    // Create a JSON manifest of all assets managed by webpack
    // See: https://github.com/danethurber/webpack-manifest-plugin
    new ManifestPlugin(
      {
        fileName: 'webpack-manifest.json'
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
        return chunk.modules
          .map(m => PATH.relative(m.context, m.request))
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { // Creates style nodes from JS strings
            // See: https://webpack.js.org/loaders/style-loader/
            loader: 'style-loader'
          },
          { // translates CSS into CommonJS
            // See: https://webpack.js.org/loaders/css-loader/
            loader: 'css-loader'
          },
          {
            // Resolves url() paths in SCSS files
            // See: https://github.com/bholloway/resolve-url-loader
            loader: 'resolve-url-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { // Creates style nodes from JS strings
            // See: https://webpack.js.org/loaders/style-loader/
            loader: 'style-loader'
          },
          { // translates CSS into CommonJS
            // See: https://webpack.js.org/loaders/css-loader/
            loader: 'css-loader'
          },
          {
            // Resolves url() paths in SCSS files
            // See: https://github.com/bholloway/resolve-url-loader
            loader: 'resolve-url-loader'
          },
          { // compiles Sass to CSS
            // See: https://webpack.js.org/loaders/sass-loader/
            loader: 'sass-loader',
            options: { // See: https://github.com/sass/node-sass
              includePaths: [],
              data: "$env: " + process.env.NODE_ENV + ";"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|txt|ico|woff|woff2)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      DATA: DATA_DIR,
      SCSS: SCSS_DIR,
      CSS: CSS_DIR,
      FONTS: FONTS_DIR,
      IMG: IMG_DIR,
      JSON: JSON_DIR,
      ROOT: STATIC_DIR
    }
  }
};
