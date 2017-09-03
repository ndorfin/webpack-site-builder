const getPath = require('path');

let PATH = {
  CONFIG_DIR : getPath.resolve(__dirname, '.'),
  ROOT_DIR   : getPath.resolve(__dirname, './..'),
  INPUT_DIR  : getPath.resolve(__dirname, './../src'),
  OUTPUT_DIR : getPath.resolve(__dirname, './../dist')
};

// If we want to process files during bundling
PATH.DATA_DIR = PATH.INPUT_DIR + '/data';
PATH.SCSS_DIR = PATH.INPUT_DIR + '/scss';

// Any static files should go into one of these folders
PATH.STATIC_DIR = PATH.INPUT_DIR  + '/static';
PATH.CSS_DIR    = PATH.STATIC_DIR + '/css';
PATH.FONTS_DIR  = PATH.STATIC_DIR + '/fonts';
PATH.IMG_DIR    = PATH.STATIC_DIR + '/img';
PATH.JSON_DIR   = PATH.STATIC_DIR + '/json';

module.exports = PATH;
