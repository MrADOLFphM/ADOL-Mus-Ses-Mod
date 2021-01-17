const { Structures } = require("discord.js");
const mainModel = require("../models/member");
Structures.extend("GuildMember", (Member) => {
  return class extends Member {
    constructor(client, data) {
      super(client, data);
    }
    async getMember() {
      let e = await mainModel.findOne({ member: this.id });
      if (e) return e;
    }
    async createMember(settings) {
      let me = new mainModel(settings);
      me.save();
      return me;
    }
  };
});
