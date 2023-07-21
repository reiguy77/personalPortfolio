const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/main.ts',
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.less'],
    },
    optimization: {
        splitChunks: {
        chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: 'src/index.html',
        }),
    ],
    module: {
        rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
        },
        {
            test: /\.html$/,
            loader: 'html-loader',
        },
        ],
    },
};
