const path = require("path");

module.exports = {
  entry: "./src/js/main.js",

  output: {
    path: path.resolve(__dirname, "public_html"),
    filename: "bundle.js",
  },

  resolve: {
    // verhindert unnötige "browser"-Alias-Warnungen
    mainFields: ["module", "main"],
    symlinks: true,
  },

  module: {
    rules: [
      // JavaScript / Babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      // CSS (wichtig für @font-face von Fontsource)
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      // Fonts (Webpack 5 Asset Modules)
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
};


