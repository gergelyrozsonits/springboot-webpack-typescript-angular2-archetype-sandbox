const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    rules : [ {
        test : /\.(sass|scss)$/,
        use : ExtractTextPlugin.extract({
            use : [ 'css-loader', 'sass-loader' ],
            fallback : 'style-loader'
        })
    }, {
        test : /\.html$/,
        loader : 'html-loader'
    }, {
        test : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [{
            loader : 'file-loader',
            options: {
                context: path.join(process.cwd(), 'src', 'main', 'resources', 'static')
            }
        }]
    }, {
        test : /\.css$/,
        include : path.resolve(process.cwd(), 'src', 'main', 'ts'),
        loaders : [ 'to-string-loader', 'css-loader' ]
    }, {
        test : /\.css$/,
        exclude : path.resolve(process.cwd(), 'src', 'main', 'ts'),
        use : ExtractTextPlugin.extract({
            fallback : 'style-loader',
            use : 'css-loader'
        })
    } ]
}