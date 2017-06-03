const path = require('path');

module.exports = {
    rules : [ {
        test : /\.ts$/,
        use : [ 'awesome-typescript-loader', 'angular2-template-loader' ]
    }, {
        test : /\.html$/,
        use : 'html-loader'
    }, {
        test : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use : 'null-loader'
    }, {
        test : /\.(css|sass|scss)$/,
        exclude : path.resolve(process.cwd(), 'src', 'main', 'ts'),
        use : 'null-loader'
    }, {
        test : /\.css$/,
        include : path.resolve(process.cwd(), 'src', 'main', 'ts'),
        use : 'raw-loader'
    } ]
};