const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
    filename: "./assets/css/bundle.css"
});

module.exports = {
    entry: "./assets/js/main.js",
    output:{
        path: __dirname,
        filename: "./assets/js/bundle.js"
    },
    devtool: 'source-map',
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: ["css-loader"]
                })
            }
        ]
    },
    plugins: [
        extractCSS
    ]
}