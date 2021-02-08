/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '..', 'client', 'index.jsx'),
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: '[name].bundle.js',
    publicPath: '/public/',
  },
  node: {
    global: true,
    // TODO - remove as part of Webpack 5 update
    process: true,
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
    child_process: 'empty',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        resolve: {
          // TODO - uncomment as part of Webpack 5 update
          // fullySpecified: false,
        },
      },
      {
        test: /\.(jpg|jpeg|png|svg)?$/,
        use: ['file-loader'],
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'public', 'index.html'),
      // favicon: path.join(__dirname, '..', 'public', 'favicon.ico'),
    }),
  ],
};
