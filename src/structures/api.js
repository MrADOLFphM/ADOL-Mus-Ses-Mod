const { createOptionHandler } = require("../utils/createOptionHandler");

module.exports = class APIWrapper {
  /**
   * @param {Object} opts
   * @param {string} opts.name
   * @param {string[]} [opts.envVars]
   */
  constructor(opts) {
    const options = createOptionHandler("APIWrapper", opts);

    this.name = options.required("name");
    this.envVars = options.optional("envVars", []);
  }

  /**
   * Check if the API can load
   * @returns {boolean} - Whether the API can load
   */
  canLoad() {
    return true;
  }

  /**
   * Loads the API
   * @returns {APIWrapper} - The loaded API
   */
  load() {
    return this;
  }
};
