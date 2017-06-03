var merge = require('webpack-merge');

module.exports = (env) => {
    return {
        entry: require('./webpack/entry'),

        output: require('./webpack/output'),

        module: merge(
            require('./webpack/module.core'),
            require('./webpack/module.aot')
        ),

        module: require('./webpack/module.core'),

        plugins: [].concat(
            require('./webpack/plugins.core')(env),
            require('./webpack/plugins.aot')),

        resolve: require('./webpack/resolve'),

        stats: 'errors-only',

        devtool: 'source-map'
    };
}