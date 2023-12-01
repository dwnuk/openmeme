const path = require("path");
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src')
}

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const fileExtension = process.env.NODE_ENV === 'production' ? 'html.twig' : 'html';
const dataCoreFile = process.env.NODE_ENV === 'production' ? 'cleanFile' : 'dataCoreDev';

module.exports = {
    mode: mode,

    devServer: {
        open: true,
        watchFiles: ['./src/**/*']
    },

    entry: {
        index: "./src/js/index.js",
    },

    output: {
        filename: "[name].[chunkhash].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].min.css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html.twig",
            filename: `index.html`,
            chunks: ['index', `${dataCoreFile}`]
        }),

        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: "./src/html/**/*",
        //         to: "[name].[ext]",
        //     }]
        // }),

        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        attrs: [":src"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ],
            },
            {
                test: /\.(pdf|svg|png|jpg|jpeg|gif|mp4|otf|webp)$/,
                use:
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name][contenthash].[ext]",
                            outputPath: "img/",
                            esModule: false
                        }
                    }
            },
            {
                test: /\.twig$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        esModule: false,
                        sources: {
                            list: [
                                {
                                    tag: 'source',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                {
                                    tag: 'source',
                                    attribute: 'srcset',
                                    type: 'srcset',
                                },
                                {
                                    tag: 'video',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                            ]
                        }
                    }
                }
            }
        ]
    }
}
