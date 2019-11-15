const withImages = require("next-images");
module.exports = withImages({
  ignoreTypes: ["svg"],
  webpack(config) {
    return config;
  }
});
