var merge = require('webpack-merge');

module.exports = function(env) {
    return {
        entry: require('./webpack/entry'),

        output: require('./webpack/output'),

        module: merge(
            require('./webpack/module.core'),
            require('./webpack/module.jit')
        ),

        plugins: require('./webpack/plugins.core')(env),

        resolve: require('./webpack/resolve'),

        stats: 'errors-only',

        devtool: 'source-map'
    };
}