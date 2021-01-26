module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    [
      "babel-preset-gatsby",
      {
        targets: {
          browsers: [">0.25%", "not dead"],
        },
      },
    ],
    "@babel/preset-typescript",
  ],
}
