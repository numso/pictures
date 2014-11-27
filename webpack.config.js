var path = require('path');

module.exports = {
  entry: {
    bundle: './client/app/index.jsx',
    test: './client/test/index.js'
  },

  output: {
    path: './client/build',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.es6.js', '.es6.nostrict.js', '.json', '.jsx', 'index.jsx', 'index.js', '.css'] //, '.scss']
  },

  module: {
    loaders: [
      { test: /\.es6\.js$/,           loader: '6to5'                       },
      { test: /\.es6\.nostrict\.js$/, loader: '6to5?blacklist[]=useStrict' },
      { test: /\.jsx$/,               loader: '6to5'                       },
      // Can't use this loader untill libsass supports Sass 3.4
      // { test: /\.scss$/,              loader: 'style!css!sass?outputStyle=expand&includePaths[]=' + path.resolve(__dirname, './node_modules') },
      { test: /\.css$/,              loader: 'style!css'                  },
      { test: /\.(png|jpg|gif)$/,     loader: 'url?limit=8192'             }
    ]
  }
};
