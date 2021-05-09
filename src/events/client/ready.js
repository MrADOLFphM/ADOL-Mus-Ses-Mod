const botModel = require("../../models/bot");
module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`
    ░█████╗░███╗░░██╗██████╗░░█████╗░██╗
    ██╔══██╗████╗░██║██╔══██╗██╔══██╗██║
    ███████║██╔██╗██║██║░░██║██║░░██║██║
    ██╔══██║██║╚████║██║░░██║██║░░██║██║
    ██║░░██║██║░╚███║██████╔╝╚█████╔╝██║
    ╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░░╚════╝░╚═╝`);
    client.voteManager.init(true);
    const vot = await botModel.findOne({ name: "Andoi" });
    if (!vot) {
      new botModel({
        name: "Andoi",
        commandssincerestart: 0,
      }).save();

      return console.log("Created botmodel as there was no bot model found");
    }
    await botModel.findOneAndUpdate({ name: "Andoi", commandssincerestart: 0 });
    require("../../helpers/client/status")(client);
    require("../../helpers/client/pingChecker")(client);
    require("../../helpers/client/pollChecker")(client);
    require("../../helpers/client/unmuteUsers")(client);
    require("../../helpers/client/startMessage")(client);
    require("../../helpers/autoCovid")(client);
    require("../../helpers/reminder")(client);
    require("../../handlers/slash")(client);
    if (client.config.dev) {
      require("../../scripts/updateDocs")(client);
    }
    const chan = vot?.channel;
    const ms = vot?.lastMsg;
    if (!ms) return;
    if (!chan) return;
    try {
      const msg = await client.channels.cache.get(chan).messages.fetch(ms);
      msg.edit("restarted succesfully");
    } catch (err) {
      return;
    }
  },
};
