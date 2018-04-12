const
    webpack = require("webpack"),
    path = require("path"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    BUILD_DIR = path.resolve(__dirname, "dist/"),
    SRC_DIR = path.resolve(__dirname, "src/");

// config to build sudoku generator
module.exports = {
    mode: "production",
    entry: path.join(SRC_DIR, "main.js"),
    output: {
        path: BUILD_DIR,
        filename: "sudoku-game.js",
    },
    devtool: 'none',
    target: 'web',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            }
        ]
    },
    plugins: [
        // production
        new CleanWebpackPlugin([BUILD_DIR], {
            verbose: false
        }),
        new UglifyJSPlugin(),
        new CopyWebpackPlugin([{
            from: 'public'
        }]),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};