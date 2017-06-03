var merge = require('webpack-merge');

module.exports = {
  module: require('./webpack/module.test'),

  plugins: require('./webpack/plugins.test'),

  resolve: require('./webpack/resolve'),

  devtool: 'inline-source-map'
};