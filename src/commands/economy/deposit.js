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
      if (data.money > data.bankSpace) {
        const max_deposit = data.money + data.coinsInBank - data.money;

        if (data.bank - data.bankSpace === 0) {
          let bankerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(
              `${emo.cross} **${member.user.username}** : Your bank is full.`
            );

          return message.channel.send(bankerrorembed).catch();
        }
        data.money = max_deposit;
        let dep111embed = new MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            `${emo.check} **${member.user.username}** : Deposited **${(
              data.bankSpace - data.bank
            ).toLocaleString()}** coins.`
          );

        await message.channel.send(dep111embed).catch();

        data.bank = data.money + data.bankSpace - max_deposit;

        await data.save();
      } else {
        if (data.money + data.bank > data.bankSpace) {
          const left = data.money + data.bank - data.bankSpace;

          let begembed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              `${emo.check} **${member.user.username}** : Deposited **${(
                data.money - left
              ).toLocaleString()}** coins`
            );

          await message.channel.send(begembed).catch();

          data.bank += data.money - left;
          data.money = left;

          await data.save();
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

      if (parseInt(args[0]) > data.bankSpace) {
        let bankfullerrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `${emo.cross} **${member.user.username}** : Your bank is not big enough.`
          );

        return message.channel.send(bankfullerrorembed).catch();
      }
      if (parseInt(args[0]) > data.money) {
        let moneyerrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `${client.cross} **${member.user.username}** : You don't have that much money.`
          );
        message.channel.send(moneyerrorembed);
      }

      data.bank += parseInt(args[0]);
      let depamountembed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(
          `${emo.check} **${
            member.user.username
          }** : Deposited **${args[0].toLocaleString()}** coins.`
        );

      await message.channel.send(depamountembed).catch();
      //await message.channel.send(`Deposited **${args[0]}** coins.`);

      data.money -= parseInt(args[0]);

      await data.save();
    }
  },
};
