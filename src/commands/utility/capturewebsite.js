const request = require("node-superfetch");
let pornList;
const url = require("url");
module.exports = {
  name: "capture-website",
  aliases: ["website", "webss", "web", "capture"],
  category: "utility",
  description: "Return a screenshot of the website",
  run: async (client, message, args) => {
    const lang = await message.getLang();

    try {
      let site = args[0];
      try {
        if (!pornList) await fetchPornList();
        const parsed = url.parse(site);
        if (
          this.pornList.some((pornURL) => parsed.host === pornURL) &&
          !message.channel.nsfw
        ) {
          return message.reply(lang.UTILITY.SITE_NSFW);
        }
        const { body } = await request.get(
          `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
        );
        return message.channel.send({
          files: [{ attachment: body, name: "screenshot.png" }],
        });
      } catch (err) {
        if (err.status === 404)
          return message.channel.send(lang.UTILITY.COULD_NOT_FIND_WEB);
        console.log(err);
        return message.reply(lang.ERROR);
      }
    } catch (err) {
      console.log(err);
      return message.reply(lang.ERROR);
    }
  },
  async fetchPornList(force = false) {
    if (!force && this.pornList) return pornList;
    const { text } = await request.get(
      "https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt"
    );
    pornList = text
      .split("\n")
      .filter((site) => site && !site.startsWith("#"))
      .map((site) => site.replace(/^(0.0.0.0	)/, "")); // eslint-disable-line no-control-regex
    return pornList;
  },
};
