const { MessageEmbed } = require("discord.js");
const Blacklisted = require("../../models/blacklistmodel");

module.exports = {
  name: "premium",
  description: "Make a premium code",
  category: "owner",
  usage: "premium <option>",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const type = args[0];
    if (!type) {
      return message.channel.send("Please provide a type");
    }

    switch (type) {
      case "view": {
        let codes = client.premium.join(" ");
        if (codes.length === 0) codes = "None";
        const em = new MessageEmbed()
          .setTitle("Premium codes")
          .setDescription(codes);
        return message.send(em);
        break;
      }
      case "add": {
        const code = client.utils.makeid(10);
        message.send(`generated code: ${code}`);
        client.premium.push(code);
        break;
      }
      case "remove": {
        const codes = client.premium;
        const id = args[1];
        if (!id) return message.send("Please provide an id to remove!");
        const arr = codes.filter((c) => c !== id);
        client.premium.set(arr);
        break;
      }
      default: {
        return message.channel.send("This is not an option!");
      }
    }
  },
};
