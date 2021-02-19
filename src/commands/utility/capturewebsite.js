const request = require("node-superfetch");
const fetch = require("node-fetch");
const url = require("url");
module.exports = {
  name: "capture-website",
  aliases: ["website", "webss", "web", "capture"],
  category: "utility",
  description: "Return a screenshot of the website",
  pornList: [],
  run: async (client, message, args) => {
    const lang = await message.getLang();

    try {
      let site = args[0];
      try {
        const parsed = url.parse(site);

        if (await nsfw(site)) {
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

    async function nsfw(u) {
      const text = await fetch(
        "https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt"
      ).then((res) => res.text());
      const list = [
        ...text
          .split("\n")
          .filter((s) => !s.startsWith("#"))
          .map((s) => s.replace("0.0.0.0", "")),
        "pornhub.com",
      ].join("\n");
      const parsed = url.parse(u);
      const includes = list.includes(parsed.host);
      const includesPorn = await (
        await fetch(u).then((res) => res.text())
      ).includes("porn");

      if (!includes && !includesPorn) return false;
      if (includes && includesPorn) return true;
      if (includes || !includesPorn) return true;
      if (!includes || includes) return true;
    }
  },
};
