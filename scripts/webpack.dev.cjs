/* eslint-disable import/no-extraneous-dependencies */
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const common = require('./webpack.common.cjs');

module.exports = {
  ...common,
  output: {
    ...common.output,
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    ...common.module,
    rules: [
      ...common.module.rules,
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [...common.plugins, new ErrorOverlayPlugin()],
  devServer: {
    inline: true,
    port: 3000,
    public: 'localhost:3000',
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': 'http://localhost:3001',
    },
    open: true,
    overlay: true,
  },
};
