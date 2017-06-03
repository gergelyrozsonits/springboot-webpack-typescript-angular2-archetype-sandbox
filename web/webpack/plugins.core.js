const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    env = env || {};
    return [
        new webpack.ProgressPlugin(),
        // Workaround for https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(process.cwd(), 'src', 'main', 'ts'), {}),
        // The NoEmitOnErrorsPlugin is responsible for skipping emitting phase in case of compilation error
        new webpack.NoEmitOnErrorsPlugin(),
        // CommonsChunkPlugin is elimination the redundant dependencies from the chunks and in this way it can be avoided to have a common dependency both in vendor and app sepcific chunks
        new webpack.optimize.CommonsChunkPlugin({
            name : [ 'main', 'vendor', 'polyfills' ]
        }),
        // By default the css styles are also inlined in the .js files, with having ExtractTextPlugin the style definitions can be extracted from the scripts into a dedicated .css file
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            allChunks: true
        }),
        // HtmlWebpackPlugin is adding the entry point result references (script/link tags) the the 'index.html' 
        new HtmlWebpackPlugin({
            template : path.join(process.cwd(), 'src', 'main', 'resources', 'static', 'index.html')
        }),
        // DefinePlugin is replacing the properties in the source files in the following way: 'if(process.env.ENV === 'production') { /* do something */ }' -> if(true|false) { /* do something */ }
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(env.ENV || 'development')
            }
        }),
        // Uglifying '.js' files
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                // https://github.com/angular/angular/issues/10618
                keep_fnames: true
            }
        })
    ];
}