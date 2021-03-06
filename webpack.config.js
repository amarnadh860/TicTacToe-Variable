const path = require("path")
 
module.exports = {
    entry: ["@babel/polyfill","./src/index.js"],
    output: {
        path: path.resolve(__dirname, "public/scripts"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }]
    },
    devServer: {
        static: path.resolve(__dirname, "public"),
        //publicPath: "http://localhost:8080/scripts/"
    },
    
    devtool: "source-map"
}