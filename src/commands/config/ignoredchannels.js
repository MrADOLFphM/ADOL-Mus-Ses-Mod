module.exports = {
    name: "ignoredchannels",
    description: "Add/remove ignored channels",
    category: "config",
    usage: "set <option> <channel>",
    memberPermissions: ["ADMINISTRATOR"],
    aliases: ["igch", "ic"],
    run: async(client, message, args) => {
        const guildId = message.guild.id;
        const option = args[0];
        const item = message.mentions.channels.first() || message.channel;

        const guild = await client.getConfig(message.guild);
        const ignoredChannels = guild.ignored_channels;

        if (!option) {
            return message.channel.send(
                "Please provide an valid option (`add`, `remove`)"
            );
        }

        if (!item) {
            return message.channel.send("Please provide a channel");
        }

        switch (option.toLowerCase()) {
            case "add":
                if (ignoredChannels.includes(item.id)) {
                    return message.channel.send(
                        "That channel is already ignored by the bot"
                    );
                }

                await client.updateConfig(message.guild, {
                    ignored_channels: [...ignoredChannels, item.id],
                });

                message.channel.send(`Added ${item} to ignored channels`);
                break;
            case "remove":
                if (!ignoredChannels.includes(item.id)) {
                    return message.channel.send("That channel is not ignored by the bot");
                }

                await client.updateConfig(message.guild, {
                    ignored_channels: ignoredChannels.filter((ci) => ci !== item.id),
                });

                return message.channel.send(`Remove ${item} from ignored channels`);
            default:
                return message.channel.send(`\`${option}\` is not a option!`);
        }
    },
};