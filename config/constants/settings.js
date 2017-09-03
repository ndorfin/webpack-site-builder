// Dependencies
const ENVIRONMENT = require('./environments');
const PATH = require('./paths');

const CONFIG_SETTINGS = {
  'development': {
    webpack: {
      exports: {
        devtool: 'inline-source-map',
        devServer: {
          contentBase: PATH.OUTPUT_DIR,
          hot: true
        }
      },
      outputPattern: '[name].[hash].js'
    }
  },
  'production': {
    webpack: {
      outputPattern: '[name].[chunkhash].js'
    }
  }
};

module.exports = CONFIG_SETTINGS[ENVIRONMENT];
