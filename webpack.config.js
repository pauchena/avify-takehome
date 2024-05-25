const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const host = 'localhost';
const port = 8080;

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    target: 'web',
    entry: {
        app: [
            './index.tsx'
        ]
    },
    output: {
        filename: '[name]-[contenthash:6].bundle.js',
        path: path.join(__dirname, './build/www'),
        publicPath: `http://${host}:${port}/`
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.([jt])s(x?)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader?name=img/[name]-[contenthash:6].[ext]',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: '../public/avify-logo.png'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:6].css',
            chunkFilename: '[id].css'
        })
    ],
    devServer: {
        historyApiFallback: true,
        port,
        host,
        static: path.resolve(__dirname, 'src')
    },
};
