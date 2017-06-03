const webpack = require('webpack');
const path = require('path');

module.exports = [
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(process.cwd(), 'src', 'main', 'ts'), {})
];