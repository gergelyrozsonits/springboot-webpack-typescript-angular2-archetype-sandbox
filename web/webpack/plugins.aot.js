const ngtools = require('@ngtools/webpack');
const webpack = require('webpack');
const path = require('path');

module.exports = [
    new ngtools.AotPlugin({
        tsConfigPath: path.resolve(process.cwd(), 'tsconfig.json'),
        entryModule: 'app/app.module#AppModule'
    })
]