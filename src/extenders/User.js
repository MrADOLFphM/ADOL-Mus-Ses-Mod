const { Structures } = require("discord.js");
const userModel = require("../models/userEco");
module.exports = Structures.extend("User", (User) => {
  class AndoiUser extends User {
    constructor(...args) {
      super(...args);
    }

    async settings() {
      const model = await userModel.findOne({ userID: this.id });
      return model;
    }
    async update(settings) {
      const model = await this.settings();
      const r = model.updateOne(settings);
      return true;
    }
  }

  return AndoiUser;
});
