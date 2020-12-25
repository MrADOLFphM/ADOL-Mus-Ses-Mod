const Discord = require("discord.js");
module.exports = {
    name: "setandoichat",
    category: "config",
    usage: "setandoichat <#channel>",
    description: "Set the andoi chat channel",
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(
                `${message.author.tag} You don't have perms to do that.`
            );
        let channel = client.findChannel(message, args, false); //mentioned channel
        if (!channel) {
            await client.updateConfig(message.guild, { andoichat: null });
            message.channel.send(
                "The andoi chat channel has been reset since no channel was provided"
            );
        }

        await client.updateConfig(message.guild, { andoichat: channel.id });

        message.channel.send(`Andoi chat is setted as ${channel}`); //send success message
    },
};