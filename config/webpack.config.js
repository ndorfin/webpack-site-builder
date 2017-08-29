// Dependencies
let CopyWebpackPlugin = require('copy-webpack-plugin');
const PATH = require('path');

// Root folders
const CONFIG_DIR = PATH.resolve(__dirname, '.'),
      INPUT_DIR  = PATH.resolve(__dirname, '../src'),
      OUTPUT_DIR = PATH.resolve(__dirname, '../dist');

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
  entry: INPUT_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
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
    )

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
