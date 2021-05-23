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
      console.log(await userModel.findOne({ userID: this.id }));

      //return await data.updateOne(settings).catch((err) => console.log(err));
    }
  }

  return AndoiUser;
});
