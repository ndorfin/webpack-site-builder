const ENVIRONMENT = require('./constants_environment');
const PATH = require('./constants_path');

const CONFIG_SETTINGS = {
  'development': {
    webpack: {
      exports: {
        devtool: 'inline-source-map',
        devServer: {
          contentBase: PATH.OUTPUT_DIR,
          hot: true
        },
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
