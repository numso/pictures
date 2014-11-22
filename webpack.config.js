var path = require('path');

module.exports = {
  entry: './client/app/index.jsx',

  output: {
    path: './client/build',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.es6.js', '.json', '.jsx', 'index.jsx', 'index.js', '.scss']
  },

  module: {
    loaders: [
      { test: /\.es6\.js$/,       loader: '6to5'           },
      { test: /\.jsx$/,           loader: '6to5'           },
      { test: /\.scss$/,          loader: 'style!css!sass?outputStyle=expand&includePaths[]=' + path.resolve(__dirname, './node_modules') },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192' }
    ]
  }
};
