var fs = require('fs')
var path = require('path')
var nodeModules = {}
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod
    })

module.exports = {
    entry: './src/server.ts',
    devtool: 'cheap-module-source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'server.js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        alias: {
            src: path.resolve(__dirname, 'src/')
        },
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: 'node',
    externals: nodeModules
}
