const { Collection, MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo");
module.exports = (client) => {
  const db = new Database(client.config.Mongo);

  const Invites = new Collection();
  client.on("ready", () => {
    client.guilds.cache.forEach((guild) => {
      if (!guild.me.hasPermission("MANAGE_GUILD")) return;
      guild
        .fetchInvites()
        .then((_invites) => {
          Invites.set(guild.id, _invites);
        })
        .catch((err) => {});
    });
  });
  client.on("inviteCreate", (invite) => {
    var gi = Invites.get(invite.guild.id) || new Collection();
    gi.set(invite.code, invite);
    Invites.set(invite.guild.id, gi);
  });
  client.on("inviteDelete", (invite) => {
    var gi = Invites.get(invite.guild.id) || new Collection();
    gi.delete(invite.code);
    Invites.set(invite.guild.id, gi);
  });
  //#endregion

  client.on("guildMemberAdd", async (member) => {
    const guild = member.guild,
      fake =
        (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3
          ? true
          : false;
    const conf = await member.guild.getConfig();
    let channel = conf?.welcomeChannel;

    guild
      .fetchInvites()
      .then((invites) => {
        const invite =
          invites.find(
            (_i) => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses
          ) ||
          gi.find((_i) => !invites.has(_i.code)) ||
          guild.vanityURLCode;
        Invites.set(member.guild.id, invites);
        var content = `${member} has joined the server.`,
          total = 0,
          regular = 0,
          _fake = 0,
          bonus = 0;
        if (invite == guild.vanityURLCode)
          content = `-member- has joined the server! But don't know that invitation he came up with. :tada:`;
        else
          content = `The -member-, joined the server using the invitation of the -target-. He now has -total- invites`;

        if (invite.inviter) {
          db.set(`invites.${member.id}.inviter`, invite.inviter.id);
          if (fake) {
            total = db.add(`invites.${invite.inviter.id}.total`, 1);
            _fake = db.add(`invites.${invite.inviter.id}.fake`, 1);
          } else {
            total = db.add(`invites.${invite.inviter.id}.total`, 1);
            regular = db.add(`invites.${invite.inviter.id}.regular`, 1);
          }
          var im = guild.member(invite.inviter.id);
          bonus = db.get(`invites.${invite.inviter.id}.bonus`) || 0;
          if (im)
            global.onUpdateInvite(im, guild.id, Number(total + Number(bonus)));
        }

        db.set(`invites.${member.id}.isfake`, fake);

        if (channel) {
          content = content
            .replace("-member-", `${member}`)
            .replace("-target-", `${invite.inviter}`)
            .replace("-total-", `${total + bonus}`)
            .replace("-regular-", `${regular}`)
            .replace("-fakecount-", `${_fake}`)
            .replace(
              "-invite-",
              `${
                invite && invite.code != undefined
                  ? invite.code
                  : "what is that?"
              }`
            )
            .replace("-fake-", `${fake}`);
          channel.send(content);
        }
      })
      .catch();
  });
  client.on("guildMemberRemove", async (member) => {
    var settings = await member.guild.getConfig();
    var channel = settings?.leaveChannel;
    var total = 0,
      bonus = 0,
      regular = 0,
      fakecount = 0;
    var data = db.get(`invites.${member.id}`);
    if (!data) {
      if (channel) {
        content = content.replace("-member-", `${member}`);
        channel.send(content);
      }
      return;
    }

    if (data.isfake && data.inviter) {
      fakecount = db.substract(`invites.${data.inviter}.fake`, 1);
      total = db.substract(`invites.${data.inviter}.total`, 1);
    } else if (data.inviter) {
      regular = db.substract(`invites.${data.inviter}.regular`, 1);
      total = db.substract(`invites.${data.inviter}.total`, 1);
    }
    if (data.inviter) bonus = db.get(`invites.${data.inviter}.bonus`) || 0;

    var im = member.guild.member(data.inviter);

    db.add(`invites.${data.inviter}.leave`, 1);
    if (channel) {
      content = content
        .replace("-member-", `${member}`)
        .replace("-target-", `${im ? im : data.inviter}`)
        .replace("-total-", `${Number(total) + Number(bonus)}`)
        .replace("-regular-", `${regular}`)
        .replace("-fakecount-", `${fakecount}`)
        .replace("-fake-", `${data.isfake}`);
      channel.send(content);
    }
  });
  client.on("message", async (message) => {
    var config = await message.guild.getConfig();
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    if (args[0] === "invites") {
      const command = {
        name: "invites",
        category: "invites",
      };
      client.commands.set(command.name, command);
      var victim =
        message.mentions.users.first() ||
        client.users.cache.get(args[0]) ||
        message.author;
      var data = db.get(`invites.${victim.id}`) || {
        total: 0,
        fake: 0,
        inviter: null,
        regular: 0,
        bonus: 0,
        leave: 0,
      };
      var embed = new MessageEmbed()
        .setDescription(
          `You have **${(data.total || 0) + (data.bonus || 0)}** invites! (**${
            data.regular || 0
          }** regular, **${data.bonus || 0}** bonus, **${
            data.leave || 0
          }** leaves, **${data.fake || 0}** fake)`
        )
        .setColor("RANDOM");
      message.channel.send(embed);
    } else if (args[0] === "invites-leaderboard") {
      const command = {
        name: "invites-leaderboard",
        category: "invites",
      };
      client.commands.set(command.name, command);
      var data = db.get(`invites`) || {};

      var list = Object.keys(data)
        .map((_data) => {
          return {
            Id: _data,
            Value: (data[_data].total || 0) + (data[_data].bonus || 0),
          };
        })
        .sort((x, y) => y.Value - x.Value);

      var embed = new MessageEmbed().addField(
        "Invites",
        `
        ** **${list
          .splice(0, 10)
          .map(
            (item, index) =>
              `\`${index + 1}.\` <@${item.Id}>: \`${item.Value} invite\``
          )
          .join("\n")}
        `
      );

      message.channel.send(embed);
    }
  });
};
