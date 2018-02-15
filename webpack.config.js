const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'output'),
    filename: 'index.js', // this should match the first part of function handler in serverless.yml
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: ['babel-loader'],
      },
    ],
  }
};
