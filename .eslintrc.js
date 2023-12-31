module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here
  rules: {
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
  },
};
