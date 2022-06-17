const postcssPresetEnv = require(`postcss-preset-env`);

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 4,
      features: {
        "custom-properties": true,
        "custom-media-queries": true,
        "custom-selectors": true,
      },
    }),
  ],
});
