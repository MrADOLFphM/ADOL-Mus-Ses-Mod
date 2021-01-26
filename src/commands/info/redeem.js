module.exports = {
  name: "redeem",
  category: "info",
  description: "Redeem an premium key",
  run: (client, message, args) => {
    const id = args[0];
    if (!id) return message.send("You did not provide the premium key");
    find(client, id);
    if (!find) return message.send("This is an invalid premium key");
    if (find) {
      message.guild.updateConfig({ premium: true });
      const arr = client.premium.filter((ide) => ide !== id);
      client.premium.set(arr);
      return message.send("You have redeemed premium succesfully");
    }
  },
};
function find(client, search) {
  if (client.premium.includes(search)) return true;
  if (!client.premium.includes(search)) return false;
}
