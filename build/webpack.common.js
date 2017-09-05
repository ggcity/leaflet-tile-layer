const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: '../leaflet-tile-layer.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      '../../@polymer': '/var/www/html/@ggcity/leaflet-tile-layer/node_modules/@polymer',
      '../../leaflet': '/var/www/html/@ggcity/leaflet-tile-layer/node_modules/leaflet'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
};
