const Config = require("../models/member.js");

module.exports = (client) => {
  client.getMember = async (guild, member) => {
    let data = await Config.findOne({
      guild: guild.id,
      member: member.id,
    }).catch((err) => console.log(err));
    return data;
  };
  client.updateMember = async (guild, member, settings) => {
    let data = await client.getConfig(guild, member);
    if (typeof data != "object") data = {};
    for (const key in settings) {
      if (settings.hasOwnProperty(key)) {
        if (data[key] != settings[key]) data[key] = settings[key];
        else return;
      }
    }
    return await data.updateOne(settings).catch((err) => console.log(err));
  };
  client.createMember = async (settings) => {
    const newConfig = new Config(settings);
    return newConfig.save().catch((err) => console.log(err));
  };
  client.deleteMember = async (guild, member) => {
    await Config.deleteOne({
      guild: guild.id,
      member: member.id,
    }).catch((err) => console.log(err));
  };
};
