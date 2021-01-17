const Discord = require("discord.js");
module.exports = {
  name: "setverify",
  description: "Configure verification settings",
  category: "config",
  run: async (client, message, args) => {
    const filter = (res) => res.author.id === message.author.id;
    if (message.flags[0]) {
      switch (message.flags[0]) {
        case "enable":
        case "disable": {
          const stat = message.flags[0] === "enable";
          const model = await message.guild.getVerify();
          model.enabled = stat;
          await model.save();
          return message.channel.send(
            `Member Verification has been \`${stat ? "enabled" : "disabled"}\`.`
          );
        }
        default: {
          return message.channel.send(
            new Discord.MessageEmbed()
              .setColor("RED")
              .setTimestamp()
              .setFooter(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true }) ||
                  client.user.displayAvatarURL({ dynamic: true })
              )
              .setDescription("Error: Invalid flag provided, Please try again.")
          );
        }
      }
    }
    await message.channel.send("Interactive Member Verification setup...");

    const response1 = await message.awaitReply(
      `Enter Verification Channel name:\nEg: \`#channel\`\n\nType \`cancel\` to exit this setup.`,
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
      `Enter Verified Role:\nEg: \`[RoleMention|RoleID|RoleName]\``,
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
      `Enter Verification Type:\nEg: \`[discrim|captcha|react]\``,
      filter
    );
    if (!response3)
      return message.channel.send(`No response... Exiting setup...`);
    if (response3 === "cancel") return message.channel.send(`Exiting setup...`);
    if (!["discrim", "captcha", "react"].includes(response3))
      return message.channel.send(
        `Invalid Type... Exiting setup...Try again...`
      );

    try {
      if (!channel.permissionOverwrites.get(message.guild.id)) {
        await channel
          .overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true,
          })
          .catch((e) => {
            throw e;
          });
      }
      for (let channels of message.guild.channels.cache.filter(
        (c) => c.type === "text"
      )) {
        channels = channels[1];
        if (!channels.permissionOverwrites.get(message.guild.id)) {
          await channels
            .overwritePermissions(message.guild.id, {
              VIEW_CHANNEL: false,
            })
            .catch((e) => {
              throw e;
            });
        }
      }
      if (!channel.permissionOverwrites.get(role.id)) {
        await channel
          .createOverwrite(role, {
            VIEW_CHANNEL: false,
          })
          .catch((e) => {
            throw e;
          });
      }
    } catch (e) {}
    const model = await message.guild.getVerify();
    if (!model) {
      await message.guild.createVerify({
        guild_id: message.guild.id,
        channel: channel.id,
        type: response3,
        enabled: true,
        role: role.id,
      });
      if (response3 === "react") {
        const m = await channel.send(
          new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setAuthor(
              client.user.tag,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              `This server is protected by Andoi, a powerful bot that prevents servers from being raided, React ${client.emotes.success} to get yourself verified!`
            )
        );
        m.react("786561775705129040");
        message.channel.send("Setup complete!");
      }
    } else {
      model.channel = channel.id;
      model.type = response3;
      model.role = role.id;
      model.enabled = true;
      await model.save();

      if (response3 === "react") {
        const m = await channel.send(
          new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setAuthor(
              client.user.tag,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              `This server is protected by Andoi, a powerful bot that prevents servers from being raided, React ${client.emotes.success} to get yourself verified!`
            )
        );
        m.react("786561775705129040");
      }
      message.channel.send("Setup complete!");
    }
  },
};
