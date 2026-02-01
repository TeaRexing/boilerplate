module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/public_html',
    filename: 'bundle.js'
  },
  resolve: {
    symlinks: true
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
}
