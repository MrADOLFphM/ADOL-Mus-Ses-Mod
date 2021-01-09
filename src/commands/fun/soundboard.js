const path = require("path");
const sounds = require("../../assets/json/soundboard");
const soundsChoice = sounds.map((sound) =>
  sound[sound.length - 1].replace(/\.mp3$/, "")
);

module.exports = {
  name: "soundboard",
  category: "fun",
  run: async (client, message, args) => {
    if (client.player.isPlaying)
      return message.channel.send("Im playing music at the moment!");
    const choice = args.join(" ");
    if (!soundsChoice.includes(args[0]))
      return message.channel.send(
        `You provided an invalid sound. Please choose either ${client.utils.list(
          soundsChoice,
          "or"
        )}.`
      );
    const sound = sounds.find((snd) => snd.includes(`${choice}.mp3`));
    const connection = await message.member.voice.channel.join();
    if (!connection) {
      return message.reply(`I couldnt not join the voice channel`);
    }
    connection.play(
      path.join(__dirname, "..", "..", "assets", "soundboard", ...sound)
    );
    await message.succes();
  },
};
