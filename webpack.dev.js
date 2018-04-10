const
    webpack = require("webpack"),
    path = require("path"),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    BUILD_DIR = path.resolve(__dirname, "dist/debug/"),
    SRC_DIR = path.resolve(__dirname, "src/");

/*
    const extractHTML = new HtmlWebpackPlugin({
  title: 'History Search',
  filename: 'index.html',
  inject: true,
  template: setPath('/src/tpl/tpl.ejs'),
  environment: process.env.NODE_ENV,
  isLocalBuild: buildingForLocal(),
  imgPath: (!buildingForLocal()) ? 'assets' : 'src/assets'
})
// Inside config object
const config = { 
. 
.
  plugins: [extractHTML],
}*/

// config to build sudoku generator
module.exports = {
    mode: "development",
    entry: path.join(SRC_DIR, "main.js"),
    output: {
        path: BUILD_DIR,
        filename: "sudoku-game.js",
    },
    devtool: 'inline-source-map',
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
    plugins: [new CleanWebpackPlugin([BUILD_DIR], {
            verbose: false
        }),
        new CopyWebpackPlugin([{
            from: 'public'
        }])
    ]
};