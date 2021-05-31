const game = require("../../structures/games/fasttype");
const sentences = require("../../JSON/sentences.json");
module.exports = {
  name: "fasttype",
  description: "How fast can you type?",
  category: "games",
  run: async (client, message, args) => {
    const sentenceChoice =
      sentences[Math.floor(Math.random() * sentences.length)];
    let mode = args[0];
    if (!mode) mode = "easy";
    const modes = ["easy", "medium", "hard", "extreme"];
    if (args[0] && !["easy", "medium", "hard", "extreme"].includes(args[0]))
      return message.send("Invalid mode! Valid modes: " + modes.join(", "));
    const time = {
      easy: 60000,
      medium: 30000,
      hard: 20000,
      extreme: 10000,
    };
    let tip;
    if (!args[0]) {
      tip = await message.send(
        "Small tip: You can set a gamemode for example `a!fasttype medium` this will give you a certain amount of time to type stuff. Gamemodes: " +
          modes.join(", ")
      );
    }
    const gme = new game({
      message: message,
      winMessage: "GG you won!",
      sentence: sentenceChoice,
      loseMessage: "You lost gg",
      time: time[mode],
      startMessage: "Starting the time now! Good Luck!",
    });
    setTimeout(async () => {
      if (tip) tip.delete();
      await gme.start();
    }, 2000);
  },
};
