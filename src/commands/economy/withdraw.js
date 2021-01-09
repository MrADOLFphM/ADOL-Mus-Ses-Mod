const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "withdraw",
  description: "Withdraw money to your bank",
  category: "economy",
  usage: "withdraw <all | amount>",
  run: async (client, message, args, ops, emo) => {
    const user = message.author;
    const data = client.getUser(user);
    const member = message.member;
    if (args.join(" ") === "all") {
      if (data.bank === 0) {
        let bankerrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `${emo.cross} **${member.user.username}** : Your bank is empty.`
          );
        return message.channel.send(bankerrorembed).catch();
      }
      data.money += data.bank;
      {
        let with2embed = new MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            `${emo.check} **${member.user.username}** : Withdrawed **${data.bank}** coins.`
          );
        await message.channel.send(with2embed);
      }

      data.bank -= data.bank;

      await data.save();
    } else {
      let withAmount = parseInt(args[0]);
      if (withAmount === 0) {
        let bankerrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `${emo.cross} **${member.user.username}** : Your can't withdraw 0 coins.`
          );
        return message.channel.send(bankerrorembed).catch();
      }
      if (isNaN(withAmount)) {
        let numbererrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `${emo.cross} **${member.user.username}** : That's not a number.`
          );

        return message.channel.send(numbererrorembed).catch();
      }

      if (parseInt(withAmount) > data.coinsInBank) {
        let with3embed = new MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            `${emo.cross} **${member.user.username}** : You do not have that many coins in your bank.`
          );
        return message.channel.send(with3embed);
        //return message.channel.send('You do not have that much coins.');
      }

      data.money += parseInt(withAmount);
      {
        let with4embed = new MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            `${client.check} **${
              member.user.username
            }** : Withdrawed **${withAmount.toLocaleString()}** coins.`
          );
        await message.channel.send(with4embed);
        ///await message.channel.send(`Withdrawed **${args[0]}** coins.`);
      }

      data.bank -= parseInt(withAmount);

      await data.save();
    }
  },
};
