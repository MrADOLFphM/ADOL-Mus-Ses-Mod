/*const db = require("quick.db")
const { member, MessageEmbed } = require('discord.js')
const random = require("random");
class Util {
  static addexp(message){
   let xp = db.get(`xp_${message.author.id}_${message.guild.id}`);
   xp += random.int(15, 30)
   console.log(xp);
  }
  static getLevel(xp, extra = false) {
  let level = 0;
    
    //WHILE LOOP
    while(xp >= Util.getLevelxp(level)) {
      xp -= Util.getLevelxp(level);
      level++
    }
    if(extra) return [level, xp];
    else return level;
    }

  
  static getLevelxp(level) {
    return 5 * Math.pow(level, 2) + 50 * level + 100;
  }
  
  static getInfo(exp) {
    let [level, remxp] = Util.getLevel(exp, true);
    let levelxp = Util.getLevelxp(level);
    
    return { level, remxp, levelxp}
  }
  
  static addexp(message) {
    let toadd = Math.floor(Math.random() * 3 + 3);
    let oldxp = db.get(`xp_${message.author.id}_${message.guild.id}`)
    let oldlvl = Util.getLevel(oldxp)
    let newxp = oldxp = toadd;
    let newlvl = Util.getLevel(newxp);
    
    const lvlchannel = db.get(`lvlchannel_${message.member.guild.id}`);
    const lvlbed = new MessageEmbed()
    .setTitle(`congrats`)
    .setDescription(`you have leveled up to ${newlvl}`);
    //why were you adding a comma?
    // i dont know honestly i dont use embeds much
    
    if(newlvl > oldlvl) 
    client.channels.cache.get(lvlhannel).send(lvlbed)
    db.add(`xp_${message.author.id}_${message.guild.id}`, toadd);
  }


}

module.exports = Util;*/