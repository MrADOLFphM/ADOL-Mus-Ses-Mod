module.exports = {
  name: "redeem",
  category: "info",
  description: "Redeem an premium key",
  run: (client, message, args) => {
    const id = args[0];
    if (!id) return message.send("You did not provide the premium key");
    const findr = find(client, id);
    if (!findr) return message.reply("This is an invalid premium key");
    if (findr) {
      message.guild.updateConfig({ premium: true });
      const arr = client.premium.filter((ide) => ide !== id);
      client.premium = arr;
      return message.send("You have redeemed premium succesfully");
    }
  },
};
function find(client, search) {
  if (client.premium.includes(search)) return true;
  if (!client.premium.includes(search)) return undefined;
}
