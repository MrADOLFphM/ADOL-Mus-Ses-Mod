const chatcord = require("chatcord");
const chat = new chatcord.Client();
module.exports = {
    name: "message",
    async execute(client, message) {
        if (message.author.bot) return;
        const ste = await client.getConfig(message.guild);
        if (message.channel.id !== ste.andoichat) return;
        chat.chat(message.content).then((reply) => message.channel.send(reply));
    },
};