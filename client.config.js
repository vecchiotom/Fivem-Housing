const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  target: 'node',
  mode: 'production',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    __dirname: true,
  },
  context: path.resolve(__dirname, 'src'),
  optimization: {
    minimize: false,
  },
};