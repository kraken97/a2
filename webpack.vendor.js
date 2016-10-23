var isDevBuild = process.env.ASPNETCORE_ENVIRONMENT ==='Development';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('vendor.css');

module.exports = {
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
            loader: 'url-loader?limit=100000'
        }, {
            test: /\.css(\?|$)/,
            exclude: root('src', 'app'),
            loaders: [ExtractTextPlugin.extract(['style', 'css?minimize']), 'to-string', 'css?minimize', 'postcss']
        }]
    },
    entry: {
        vendor: [
            'core-js/client/shim',
            'reflect-metadata',
            'babel-polyfill',
            'core-js/es6/symbol',
            'core-js/es6/object',
            'core-js/es6/function',
            'core-js/es6/parse-int',
            'core-js/es6/parse-float',
            'core-js/es6/number',
            'core-js/es6/math',
            'core-js/es6/string',
            'core-js/es6/date',
            'core-js/es6/array',
            'core-js/es6/regexp',
            'core-js/es6/map',
            'core-js/es6/set',
            'core-js/es6/reflect',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/core',
            '@angular/common',
            '@angular/http',
            '@angular/router',
            'rxjs',
            'angular2-color-picker/lib',
            'ng2-toasty',
            'ng2-dnd',
            'ng2-pagination',
            'ng2-modal',
            'zone.js/dist/zone',
            'core-js/es7/reflect',
            'ts-helpers',
            './src/style/app.css'
        ]
    },
    output: {
        path: path.join(__dirname, 'wwwroot', 'dist'),
        filename: '[name].js',
        library: '[name]_[hash]',
    },
    plugins: [
        extractCSS,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
            name: '[name]_[hash]'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: {
                warnings: false
            }
        })
    ].concat(isDevBuild ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
};

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}