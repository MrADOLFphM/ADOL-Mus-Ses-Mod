const {MessageEmbed} = require('discord.js')
module.exports = {
name: 'snipe',
description: 'get deleted messages',
category: 'fun',

 run: async(client, message, args)=>{
 const msg = client.snipes.get(message.channel.id);
 if(!msg) return message.channel.send("There isn't anything to snipe")
   
const embed = new MessageEmbed()
.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
.setDescription(msg.content)
.setColor('RED')
.setImage(msg.image)
message.channel.send(embed)
  }
}