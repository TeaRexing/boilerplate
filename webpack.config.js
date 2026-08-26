let webpack = require('webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/public_html',
    filename: 'bundle.js',
    library: 'pzLib',
  },
  resolve: {
    symlinks: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}
