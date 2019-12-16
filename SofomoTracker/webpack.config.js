const webpack = require("webpack");

module.exports = {
    entry: {
        geolocationComponent: "./src/Geolocation/GeolocationComponent.tsx"
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "[name]Bundle.js",
        libraryTarget: "var",
        library: "SofomoTracker"
    },
    devServer: {
        inline: false,
        contentBase: "./dist"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ],
    },
    externals: {
        "jquery": "jQuery",
        "$": "jQuery"
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "vendor"
        }
    },
    plugins: [
        // avoid publishing when compilation failed.
        new webpack.NoEmitOnErrorsPlugin()
    ]
};