const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/main.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'), // Dart Sass
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                generator: {
                    filename: `./assets/images/[name][ext]`,
                },
                type: 'asset/resource',
            },
            {
                test: /\.(mp4|mp3)$/i,
                generator: {
                    filename: `./assets/video/[name][ext]`,
                },
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './assets/css/style.css',
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                ImageminMozjpeg({
                    quality: 85,
                    progressive: true,
                }),
            ],
            pngquant: {
                quality: '70-85',
            },
            gifsicle: {
                interlaced: false,
                optimizationLevel: 10,
                colors: 256,
            },
            svgo: {}
        }),
    ],
    resolve: {
        alias: {
            "@image": path.resolve(__dirname, "./src/images/"),
        },
    },
}
