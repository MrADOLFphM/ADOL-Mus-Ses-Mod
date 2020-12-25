const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "meme",
    description: "get a funny meme",
    category: "fun",
    usage: "meme",
    run: async (client, message, args) => {
        const data = await fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setTitle(data.title)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.url})`)
            .setImage(`${data.url}`)
            .setTimestamp();

        message.channel.send(embed);
    }
}