// Dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ENVIRONMENT       = require('./environments');

const sharedLoaders = [
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

const loadersByEnvironment = {
  'development': [
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
    }
  ],
  'production': [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: [
          ['es2015', { 'modules': false }]
        ]
      }
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        // Creates style nodes from JS strings
        // See: https://webpack.js.org/loaders/style-loader/
        fallback: 'style-loader',
        use: [
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
      })
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        // Creates style nodes from JS strings
        // See: https://webpack.js.org/loaders/style-loader/
        fallback: 'style-loader',
        use: [
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
      })
    }
  ]
};

const LOADERS = [];
LOADERS.push.apply(LOADERS, sharedLoaders);
LOADERS.push.apply(LOADERS, loadersByEnvironment[ENVIRONMENT]);

module.exports = LOADERS;
