// Dependencies
const ALIASES  = require('./constants/aliases');
const LOADERS  = require('./constants/loaders');
const PATH     = require('./constants/paths');
const PLUGINS  = require('./constants/plugins');
const SETTINGS = require('./constants/settings');

// Start config
let generalConfig = {
  entry: {
    app: PATH.INPUT_DIR + '/index.js'
  },
  output: {
    filename: SETTINGS.webpack.outputPattern,
    path: PATH.OUTPUT_DIR
  },
  plugins: PLUGINS,
  module: {
    rules: LOADERS
  },
  resolve: {
    alias: ALIASES,
    modules: [
      PATH.INPUT_DIR,
      'node_modules'
    ]
  }
};

module.exports = Object.assign(
  generalConfig,
  SETTINGS.webpack.exports
);
