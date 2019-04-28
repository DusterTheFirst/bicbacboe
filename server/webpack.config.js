const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = (env, argv) => ({
    target: "node",
    entry:  "./src/app.ts",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    devtool: "inline-source-map",
    externals: argv.mode === 'development' ? [nodeExternals({
        modulesDir: "../node_modules"
    })] : [],
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
    stats: argv.mode === 'development' ? "errors-only" : undefined
});