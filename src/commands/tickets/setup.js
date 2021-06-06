const ticketModel = require("../../models/ticketcf");
const { Channel } = require("discord.js");
module.exports = {
  name: "ticketsetup",
  description: "Set's up the ticket system.",
  category: "tickets",
  memberPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    const filter = (res) => res.author.id === message.author.id;
    await message.channel.send("Interactive Ticket setup...");

    const response1 = await message.awaitReply(
      `Enter ticket logs Channel name:\nEg: \`#channel\`\n\nType \`cancel\` to exit this setup.`,
      filter
    );
    if (!response1)
      return message.channel.send(`No response... Exiting setup...`);
    if (response1 === "cancel") return message.channel.send(`Exiting setup...`);
    let channel = client.resolveChannel(response1, message.guild);

    if (!channel)
      return message.channel.send(
        `Invalid channel... Exiting setup...Try again...`
      );
    if (channel.type !== "text")
      return message.send("That is not a valid channel!");
    if (
      !channel
        .permissionsFor(message.guild.me)
        .has([
          "SEND_MESSAGES",
          "ADD_REACTIONS",
          "MANAGE_MESSAGES",
          "MANAGE_ROLES",
        ])
    )
      return message.channel.send(
        "Andoi doesn't have permissions to that channel, please give Andoi access to that channel for this to work and try again...Exiting Setup"
      );

    const response2 = await message.awaitReply(
      `Enter Support Role:\nEg: \`[RoleMention|RoleID|RoleName]\``,
      filter
    );
    if (!response2)
      return message.channel.send(`No response... Exiting setup...`);
    if (response2 === "cancel") return message.channel.send(`Exiting setup...`);
    const role = client.resolveRole(response2, message.guild);
    if (!role)
      return message.channel.send(
        `Invalid Role... Exiting setup...Try again...`
      );

    const response3 = await message.awaitReply(
      `Enter ticket category:\nEg: \`851132855694000158\`\n\nType \`cancel\` to exit this setup.`,
      filter
    );
    if (!response3)
      return message.channel.send(`No response... Exiting setup...`);
    if (response3 === "cancel") return message.channel.send(`Exiting setup...`);
    let cat = client.resolveChannel(response3, message.guild);
    if (!cat)
      return message.channel.send(
        `Invalid category... Exiting setup...Try again...`
      );
    if (cat.type !== "category") return message.send("That is not a category");
    if (
      !cat
        .permissionsFor(message.guild.me)
        .has([
          "SEND_MESSAGES",
          "ADD_REACTIONS",
          "MANAGE_CHANNELS",
          "MANAGE_PERMISSIONS",
        ])
    )
      return message.channel.send(
        "Andoi doesn't have the right permissions for that category, please give Andoi more permissions for this to work and try again...Exiting Setup"
      );
    const model = await ticketModel.findOne({
      guild: message.guild.id,
    });
    if (!model) {
      new ticketModel({
        guild: message.guild.id,
        cat: cat.id,
        ticketlogs: channel.id,
        support: role.id,
      }).save();

      message.channel.send("Setup complete!");
    } else {
      model.cat = cat.id;
      model.ticketlogs = channel.id;
      model.support = role.id;
      await model.save();
      message.channel.send("Setup complete!");
    }
  },
};
