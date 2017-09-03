// Dependencies
const PATH = require('./constants_path');
const CONFIG_SETTINGS = require('./constants_settings');
const LOADERS = require('./constants_loaders');
const PLUGINS = require('./constants_plugins');

// Start config
let generalConfig = {
  entry: {
    app: PATH.INPUT_DIR + '/index.js',
    vendor: [
      'lodash'
    ]
  },
  output: {
    filename: CONFIG_SETTINGS.webpack.outputPattern,
    path: PATH.OUTPUT_DIR
  },
  plugins: PLUGINS,
  module: {
    rules: LOADERS
  },
  resolve: {
    alias: {
      DATA: PATH.DATA_DIR,
      SCSS: PATH.SCSS_DIR,
      CSS: PATH.CSS_DIR,
      FONTS: PATH.FONTS_DIR,
      IMG: PATH.IMG_DIR,
      JSON: PATH.JSON_DIR,
      ROOT: PATH.STATIC_DIR
    }
  }
};

module.exports = Object.assign(
  generalConfig,
  CONFIG_SETTINGS.webpack.exports
);
