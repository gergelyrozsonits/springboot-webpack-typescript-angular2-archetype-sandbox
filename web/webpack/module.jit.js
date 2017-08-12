module.exports = {
    rules : [ {
        test : /\.ts$/,
        loaders : [ 'awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader' ]
    } ]
}