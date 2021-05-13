const {
  getUserMoney,
  addUserBank,
  removeUserMoney,
} = require("../../utils/economy");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "deposit",
  description: "deposit money to your bank",
  category: "economy",
  aliases: ["dep"],
  usage: "!deposit <all | amount>",
  run: async (client, message, args, ops, emo) => {
    const user = message.author;
    const member = message.member;
    let amount = args[0];
    const data = await client.getUser(user);
    if (!amount)
      return message.reply(
        `${emo.cross} Please give an valid amount to deposit`
      );
    const money = await getUserMoney(user.id);
    if (data.money === 0)
      return message.channel.send(`${emo.cross} you cant deposit 0$`);
    if (args.join(" ") === "all") {
      if (data.money) {
        const max_deposit = data.money + data.bank;
        data.money = parseInt(max_deposit);
        let dep111embed = new MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            `${emo.check} **${
              member.user.username
            }** : Deposited **${data.bank.toLocaleString()}** coins.`
          );

        data.bank = data.money;
        data.money = 0;
        await data.save();
        return message.channel.send(dep111embed).catch();
      } else {
        if (data.money + data.bank) {
          const left = data.money + data.bank;

          let begembed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              `${emo.check} **${member.user.username}** : Deposited **${(
                data.money - left
              ).toLocaleString()}** coins`
            );

          data.bank += data.money - left;
          data.money = left;

          await data.save();
          return message.channel.send(begembed).catch();
        } else {
          let dep111embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              `${emo.check} **${
                member.user.username
              }** : Deposited **${data.money.toLocaleString()}** coins`
            );
          await message.channel.send(dep111embed).catch();

          data.bank += data.money;
          data.money = 0;

          await data.save();
        }
      }
    } else {
      if (isNaN(args[0])) {
        let numbererrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `${emo.cross} **${member.user.username}** : That's not a number.`
          );

        return message.channel.send(numbererrorembed).catch();
      }
      if (parseInt(args[0]) > data.money) {
        let moneyerrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `${emo.cross} **${member.user.username}** : You don't have that much money.`
          );
        return message.channel.send(moneyerrorembed);
      }

      data.bank += parseInt(args[0]);
      let depamountembed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `${emo.check} **${
            member.user.username
          }** : Deposited **${args[0].toLocaleString()}** coins.`
        );

      data.money -= parseInt(args[0]);

      await data.save();
      return message.channel.send(depamountembed).catch();
    }
  },
};
