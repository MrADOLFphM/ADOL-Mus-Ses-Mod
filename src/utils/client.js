module.exports = (client) => {
  client.findMember = (message, args, allowAuthor) => {
    let member;

    member = message.guild.member(
      message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((m) => m.user.id === args[0]) ||
        message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
        message.guild.members.cache.find((m) => m.user.username === args[0])
    );

    if (!member && allowAuthor) {
      member = message.member;
    }

    return member;
  };
  client.findChannel = (message, args) => {
    return (
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.guild.channels.cache.find((r) => r.name === args[0]) ||
      message.guild.channels.cache.find((r) => r.name.startsWith(args[0]))
    );
  };
  client.findRole = (message, args, allowChannel) => {
    return (
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[0]) ||
      message.guild.roles.cache.find((r) => r.name === args[0]) ||
      message.guild.roles.cache.find((r) => r.name.startsWith(args[0]))
    );
  };
  client.GetImage = (message, args) => {
    const fileTypes = ["png", "jpeg", "tiff", "jpg", "webp"];
    // Get user
    const user = message.mentions.users.first()
      ? message.mentions.users.first()
      : message.author;
    // get image if there is one
    const file = [];
    // Check attachments
    if (message.attachments.size > 0) {
      const url = message.attachments.first().url;
      for (let i = 0; i < fileTypes.length; i++) {
        if (url.indexOf(fileTypes[i]) !== -1) {
          file.push(url);
        }
      }
      // no file with the correct format was found
      if (file.length == 0)
        return message.channel
          .send("Invalid image/file")
          .then((m) => m.delete({ timeout: 10000 }));
    } else {
      // check user
      if (user != message.author) {
        file.push(
          user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
        );
      }
      // Checks if a link to image was entered
      if (args[1] && !(args[1].startsWith("<") && args[1].endsWith(">"))) {
        file.push(args[1]);
      }
      // add user
      file.push(
        message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        })
      );
      // send file;
    }
    return file;
  };
};
