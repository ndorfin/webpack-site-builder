const ENVIRONMENT = require('./constants_environment');

const LOADERS = [
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
          data: '$env: ' + ENVIRONMENT + ';'
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
];

module.exports = LOADERS;
