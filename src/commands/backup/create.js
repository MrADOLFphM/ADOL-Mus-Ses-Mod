const backup = require("discord-backup");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "backup-create",
  category: "backup",
  memberPermissions: ["MANAGE_GUILD"],
  botPermissions: ["ADMINISTRATOR"],
  requiredArgs: ["name"],
  run: async (client, message, args) => {
    const lang = await message.guild.getConfig();
    const msg = await message.send(lang.BACKUP.CREATING);
    const name = args.join(" ");
    backup
      .create(message.guild, {
        doNotBackup: ["bans"],
        saveImages: false,
        jsonSave: false,
        maxMessagesPerChannel: 0,
      })
      .then(async (backupData) => {
        let guildicon = message.guild.iconURL();
        let datacreated = new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setDescription(
            `${client.emotes.check}${lang.BACKUP.CREATED}\n **${lang.BACKUP.ID}**: ${backupData.id}\n  **${lang.GUILD_NAME}**: ${message.guild.name} `
          )
          .setFooter(message.guild.name, guildicon);

        message.author.send(datacreated);
        msg.edit(`${client.emotes.check} ${lang.BACKUP.CREATED}`);
        const usero = await client.getUser(message.author);
        const backups = usero?.backups;
        if (!backups) {
          await client.updateUser(message.author, {
            backups: [{ name: name, ID: backupData.id }],
          });
        }
      });
  },
};
