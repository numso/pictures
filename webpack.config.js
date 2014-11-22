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
      { test: /\.es6\.js$/,       loader: '6to5-loader'                           },
      { test: /\.jsx$/,           loader: '6to5-loader'                           },
      { test: /\.scss$/,          loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'                 }
    ]
  }
};
