const Discord = require("discord.js");
module.exports = {
    name: "setglobalchat",
    category: "config",
    usage: "setleave <#channel>",
    description: "Set the leave channel",
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(
                `${message.author.tag} You don't have perms to do that.`
            );
        let channel = client.findChannel(message, args, false); //mentioned channel
        if (!channel) {
            await client.updateConfig(message.guild, { global: null });
            message.channel.send(
                "The global chat channel has been reset since no channel was provided"
            );
        }

        await client.updateConfig(message.guild, { global: channel.id });

        message.channel.send(`Global chat is setted as ${channel}`); //send success message
    },
};