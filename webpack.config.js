var path = require('path');

module.exports = {
  entry: './client/app/index.jsx',

  output: {
    path: './client/build',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.es6.js', '.es6.nostrict.js', '.json', '.jsx', 'index.jsx', 'index.js'] //, '.scss']
  },

  module: {
    loaders: [
      { test: /\.es6\.js$/,           loader: '6to5'                       },
      { test: /\.es6\.nostrict\.js$/, loader: '6to5?blacklist[]=useStrict' },
      { test: /\.jsx$/,               loader: '6to5'                       },
      // Can't use this loader untill libsass supports Sass 3.4
      // { test: /\.scss$/,              loader: 'style!css!sass?outputStyle=expand&includePaths[]=' + path.resolve(__dirname, './node_modules') },
      { test: /\.(png|jpg|gif)$/,     loader: 'url?limit=8192'             }
    ]
  }
};
