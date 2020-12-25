const fetch = require("node-fetch");

module.exports = {
  name: "catfact",
  description: "Returns a cat fact",
  category: "animal",
  run: async (client, message) => {
    fetch("https://cat-fact.herokuapp.com/facts?animal_type=cat")
      .then((res) => res.json())
      .then(async (data) => {
        const fact = data.all[Math.floor(Math.random() * data.all.length)];
        await message.channel.send(fact.text);
      });
  },
};
