const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      app: path.resolve(__dirname, './src/app/'),
      core: path.resolve(__dirname, './src/core/'),
      data: path.resolve(__dirname, './src/data/'),
      shared: path.resolve(__dirname, './src/shared/'),
      database: path.resolve(__dirname, './src/database/'),
      assets: path.resolve(__dirname, './src/assets/'),
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js',
  },
  devServer: {
    stats: 'minimal',
    watchOptions: {
      poll: undefined,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ExtractTextPlugin('style.css'),
  ],
  performance: {
    maxEntrypointSize: 750000,
    maxAssetSize: 750000,
  },
};
