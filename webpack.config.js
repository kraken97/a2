// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';
var isTest = ENV === 'test' || isTestWatch;
var isProd = process.env.DEVMOD === 'prod';

module.exports = function makeWebpackConfig() {
    var config = {};

    if (isProd) {

    } else {
        config.devtool = 'source-map';
    }

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = {
        path: root('wwwroot/dist'),
        publicPath: '/dist/',
        filename: isProd ? 'js/[name].js' : 'js/[name].js',
        chunkFilename: isProd ? '[id].chunk.js' : '[id].chunk.js'
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        extensions: ['.ts', '.js', '.json', '.css', '.html'],
    };

    var atlOptions = '';
    if (isTest && !isTestWatch) {
        // awesome-typescript-loader needs to output inlineSourceMap for code coverage to work with source maps.
        atlOptions = 'inlineSourceMap=true&sourceMap=false';
    }

    config.module = {
        rules: [{
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader?' + atlOptions, 'angular2-template-loader', 'angular2-router', '@angularclass/hmr-loader'],
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=fonts/[name].[hash].[ext]?'
            },

            {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.css$/,
                exclude: root('src', 'app'),
                loaders: [ExtractTextPlugin.extract(['style', 'css?minimize']), 'to-string', 'css?minimize', 'postcss']
            }, {
                test: /\.css$/,
                include: root('src', 'app'),
                loaders: ['raw', 'postcss']
            }, {
                test: /\.html$/,
                loader: 'raw',
                exclude: root('src', 'public')
            }
        ]
    };


    config.plugins = [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: root('src/public')
        }]),

        // Workaround needed for angular 2 angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src') // location of your src
        ),
        new webpack.LoaderOptionsPlugin({
            options: {
                /**
                 * Apply the tslint loader as pre/postLoader
                 * Reference: https://github.com/wbuchwalter/tslint-loader
                 */
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                },
                /**
                 * Sass
                 * Reference: https://github.com/jtangelder/sass-loader
                 * Transforms .scss files to .css
                 */
                sassLoader: {
                    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
                },
                /**
                 * PostCSS
                 * Reference: https://github.com/postcss/autoprefixer-core
                 * Add vendor prefixes to your css
                 */
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        })
    ];

    if (!isProd) {
        config.plugins.push(new DashboardPlugin());
    }


    config.plugins.push(
        new ForkCheckerPlugin(),
        new CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            chunksSortMode: 'dependency'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash].css'
        })
    );



    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                mangle: {
                    keep_fnames: true
                }
            }),
            new CopyWebpackPlugin([{
                from: root('src/public')
            }])
        );
    }

    config.devServer = {
        contentBase: './src/public',
        historyApiFallback: true,
        quiet: true,
        stats: 'minimal'
    };

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}