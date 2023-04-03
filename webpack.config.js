const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/js/index.js"),
    insideGame: path.resolve(__dirname, "src/js/insideGame.js"),
  },
  // mode: "development",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  // To deal with loaders
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
