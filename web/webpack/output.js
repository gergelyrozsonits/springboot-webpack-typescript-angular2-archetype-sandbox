const path = require('path');

module.exports = {
    path : path.join(process.cwd(), 'target', 'classes', 'static'),
    filename : '[name].[hash].bundle.js',
    chunkFilename : '[chunkhash].[id].chunk.js',
    devtoolModuleFilenameTemplate : function(info) {
        return info.resource.replace('./src', '');
    }
};