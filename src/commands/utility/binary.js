module.exports = {
  name: "binary",
  category: "utility",
  run: async (client, message, args) => {
    const option = args[0];
    if (!option)
      return message.channel.send(
        "Invalid option available options: `decode, encode`"
      );
    const text = args.slice(1).join(" ");
    if (!text) return message.channel.send("No text provided");
    switch (option) {
      case "decode":
        const data1 = await client.utils.binary(text, "decode");
        const embed1 = message
          .embed()
          .setTitle("Binary decode")
          .setDescription(`Results: ${data1}`);
        message.send(embed1);
        break;
      case "encode":
        const data = await client.utils.binary(text, "encode");
        const embed = message
          .embed()
          .setTitle("Binary encode")
          .setDescription(`Results: ${data}`);
        message.send(embed);
        break;
    }
  },
};
