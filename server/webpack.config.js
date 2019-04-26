const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    target: "node",
    entry:  "./src/app.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    devtool: "inline-source-map",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", "json" ]
    },
    mode: "production",
    stats: "errors-only"
};