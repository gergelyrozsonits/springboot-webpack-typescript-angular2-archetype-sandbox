const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    env = env || {};
    return [
        new webpack.ProgressPlugin(),
        // Provider plugin to make jquery available (e.g. for Select2)
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
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
        // Copy assets and .ts files to static resource location
        new CopyWebpackPlugin([
            // WORKAROUND: Added to support dynamic image references
            { from: path.join(process.cwd(), 'src', 'main', 'resources', 'static', 'assets'), to: path.join(process.cwd(), 'target', 'classes', 'static', 'assets') },
            // Added to support sourcemaps
            { from: path.join(process.cwd(), 'src', 'main', 'ts'), to: path.join(process.cwd(), 'target', 'classes', 'static', 'src', 'main', 'ts') },
            { from: path.join(process.cwd(), 'src', 'main', 'scss'), to: path.join(process.cwd(), 'target', 'classes', 'static', 'src', 'main', 'scss') }
            // 
        ], {
            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: false
        }),
        // Uglifying '.js' files
        // Please note: This should not be activated again in this form (further configuration needed) otherwise the sourcemap generation will be prevented
//        new webpack.optimize.UglifyJsPlugin({
//            sourceMap: true,
//            mangle: {
//                // https://github.com/angular/angular/issues/10618
//                keep_fnames: true
//            }
//        }),
    ];
}