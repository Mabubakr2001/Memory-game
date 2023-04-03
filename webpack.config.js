const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/js/index.js"),
    insideGame: path.resolve(__dirname, "src/js/insideGame.js"),
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};