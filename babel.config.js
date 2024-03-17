module.exports = {
  presets: [
    "next/babel",
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  env: {
    test: {
      plugins: [
        "@babel/plugin-transform-modules-commonjs",
        "@babel/plugin-transform-runtime",
      ],
    },
  },
};
