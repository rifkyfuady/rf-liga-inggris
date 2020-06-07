const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js',
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "production",
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: "/node_modules/",
                loader: 'file-loader',
                options: {
                  outputPath: 'images',
                  name: '[name].[ext]'
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: "/node_modules/",
                loader: 'file-loader',
                options: {
                  outputPath: 'fonts',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            favicon: "./src/images/favicon.ico",
            title: 'Liga Inggris'
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: "./src/sw.js",
            swDest: "sw.js"
        }),
        new WebpackPwaManifest({
            name: 'Liga Inggris RF',
            short_name: 'Liga RF',
            description: 'Aplikasi submission kedua liga Inggris',
            background_color: '#0069c0',
            theme_color: "#0069c0",
            gcm_sender_id: "72344101608",
            icons: [
            {
                src: path.resolve('src/images/icon-128.png'),
                sizes: [96, 128, 192, 256, 384, 512] 
            },
            {
                src: path.resolve('src/images/icon-512.png'),
                size: '1024x1024' 
            },
            {
                src: path.resolve('src/images/icon-512.png'),
                size: '1024x1024',
                purpose: 'maskable'
            }
            ]
        })
    ]
}