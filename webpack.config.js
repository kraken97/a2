var isDevBuild = process.env.ASPNETCORE_ENVIRONMENT ==='Development';
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');
var allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;

// Configuration in common to both client-side and server-side bundles
var sharedConfig = {
    resolve: { extensions: [ '', '.js', '.ts' ] },
    output: {
        filename: '[name].js',
        publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router', '@angularclass/hmr-loader'],
            
            },
            { test: /\.html$/, loader: 'raw' },
            { test: /\.css$/, loader: 'to-string!css' },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url', query: { limit: 25000 } }
        ]
    }
};

// Configuration for client-side bundle suitable for running in browsers
var clientBundleOutputDir = './wwwroot/dist';
var clientBundleConfig = merge(sharedConfig, {
    entry: { 'main': './src/main.ts' },
    output: { path: path.join(__dirname, clientBundleOutputDir) },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ].concat(isDevBuild ? [
        // Plugins that apply in development builds only

        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map', // Remove this line if you prefer inline source maps
            moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
        })
    ] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // Plugins that apply in production builds only
        new webpack.optimize.OccurenceOrderPlugin(),

    ])
});


// // Configuration for server-side (prerendering) bundle suitable for running in Node
// // HIHERA NE RABOTAET
// var serverBundleConfig = merge(sharedConfig, {
//     entry: { 'main-server': './src/main.server.ts' },
//     output: {
//         libraryTarget: 'commonjs',
//         path: path.join(__dirname, './src/dist')
//     },
//     target: 'node',
//     devtool: 'inline-source-map',
//     externals: [nodeExternals({ whitelist: [allFilenamesExceptJavaScript] })] // Don't bundle .js files from node_modules
// });

module.exports = [clientBundleConfig];
