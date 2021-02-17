const fetch = require("node-fetch");
module.exports = {
  name: "shorturl",
  category: "utility",
  description: "Shorten an url!",
  run: async (client, message, args) => {
    const url = args.join(" ");
    if (!url)
      return message.reply(
        "You forgot an url! EG a!shorturl https://yourmom.com"
      );
    const data = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
    ).then((res) => res.json());

    return message.send("The shortened url is....  " + data.shorturl);
  },
};
