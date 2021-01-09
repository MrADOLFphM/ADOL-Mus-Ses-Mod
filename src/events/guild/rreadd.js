const Discord = require('discord.js')

module.exports = {
    name: "messageReactionAdd",
    async execute(client, reaction, user) {
        if (user.partial) await user.fetch();
        if (reaction.partial) await reaction.fetch();
        if (reaction.message.partial) await reaction.message.fetch();
         const conf = await client.getConfig(reaction.message.guild)
        if(user.bot) return;
        if(conf.starboardchan === null) return;
            if (reaction.emoji.name === "⭐"){
                if (reaction.count >= conf.starboardnum){ // here, you can put how many reactions you need to post something into starboard
                    const channelStarboard = client.channels.cache.find(channel => channel.id === conf.starboardchan)
                    const starboardMessage = reaction.message.content
                    const starboardEmbed = new Discord.MessageEmbed()
                    .setTitle(`⭐ From: ${reaction.message.author.username}`)
                    .setDescription(`**${starboardMessage}**`)
                    .setThumbnail(`${reaction.message.author.displayAvatarURL({dynamic:true})}`)
                    .setColor("#00FFFF")
                    .setFooter("Andoi starboard")
                    channelStarboard.send(starboardEmbed)
                }
            }
        
    }
}