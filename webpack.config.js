/*
    ./webpack.config.js
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve('./public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]

    },
    // add this line
    plugins: [HtmlWebpackPluginConfig]
}
