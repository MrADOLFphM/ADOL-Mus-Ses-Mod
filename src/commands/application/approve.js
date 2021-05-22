const discord = require("discord.js");
const App = require("../../models/application/applied");
const Paste = require("../../models/application/applied");
module.exports = {
  name: "approve",
  description: "Approve an application",
  category: "application",
  memberPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let app = await App.findOne({
      guildID: message.guild.id,
    });

    if (!app) {
      app = new App({
        guildID: message.guild.id,
      });

      await app.save();
      app = await App.findOne({
        guildID: message.guild.id,
      });
    }

    const id = args[0];
    if (!id)
      return message.reply(
        "No application id was provided. How to get one? Use the command `a!review` to find the application ID."
      );
    const paste = await Paste.findOne({
      guildID: message.guild.id,
      appID: id,
    });

    if (!paste)
      return message.channel.send(
        `${client.emotes.error} Could not find this application.`
      );
    const member = message.guild.members.cache.get(paste.userID);
    let reason = args.slice(1).join(" ");
    if (!reason) reason = `No reason.`;
    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    if (paste.status === "approved")
      return message.channel.send(
        `${client.emotes.error} | This application was already approved`
      );
    if (paste.status === "declined")
      return message.channel.send(
        `${client.emotes.error} | This application was already declined`
      );

    (paste.status = "approved"), await paste.save().catch(() => {});
    await paste.deleteOne();

    const add_role = message.guild.roles.cache.get(app.add_role);
    if (add_role) {
      await member.roles.add(add_role).catch(() => {});
    }
    message.channel.send(
      new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`Application Approved!`)
        .setDescription(
          `${client.emotes.success} I have sucessfully approved this Application.\n\n**Application ID:** ${id}\n**Approved by:** ${message.author.tag}\n**Reason:** ${reason}`
        )
    );
    member
      .send(
        new discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Form Approved!`)
          .setDescription(
            `${client.emotes.success} Hey ${member.user.tag}, your form was Approved!\n\n**Application ID:** ${id}\n**Approved by:** ${message.author.tag}\n**Reason:** ${reason}`
          )
      )
      .catch(() => {
        message.channel.send(
          `Never Mind... I was able to approve the Application but couldn't dm ${member.user.tag} since their DMs are closed.'`
        );
      });
  },
};
