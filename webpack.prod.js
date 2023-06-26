const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new TerserWebpackPlugin({
            terserOptions: {
                compress: { drop_console: true }
            }
        }),
    ]
})