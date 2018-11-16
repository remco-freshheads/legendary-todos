const path = require('path'),
      webpack = require('webpack'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = ['./src/scss/app.scss', './src/js/app.js'];

module.exports = {
    entry: entry,
    mode: 'development',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }, {
            test: /\.scss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            },{
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.jpe?g$|\.png$|\.gif$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './src/index.ejs'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css'
        })
    ],
    watchOptions: {
        poll: true
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
