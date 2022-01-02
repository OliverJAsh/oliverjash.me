const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    fallback: {
      querystring: require.resolve("querystring-es3"),
      url: require.resolve("url/"),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/index.html", to: "./index.html" }],
    }),
  ],
};
