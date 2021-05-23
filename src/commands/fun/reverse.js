module.exports = {
  name: "reverse",
  aliases: ["r"],
  category: "fun",
  description: "Reverses the supplied text",
  run: (client, message, args) =>
    message.channel.send(
      args.join(" ").split("").reverse().join(" ") || "No text to reverse."
    ),
};
