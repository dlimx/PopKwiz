const common = require('./webpack.common.cjs');

module.exports = {
  ...common,
  output: {
    ...common.output,
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'inline-source-map',
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
  devServer: {
    inline: true,
    port: 3000,
    historyApiFallback: true,
    // contentBase: path.join(__dirname, '..', 'public'),
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
};
