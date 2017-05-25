module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": "airbnb-base",
  "rules": {
    "func-names": "off",
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "no-unused-vars": ["error", {
      "args": "none",
      "varsIgnorePattern": "should"
    }],
    "comma-dangle": ["error", "never"],
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    "no-shadow": ["error", { "allow": ["err"] }],
    "consistent-return": "off",
    "padded-blocks": ["error", "always"],
    "no-console": "off"
  }
};
