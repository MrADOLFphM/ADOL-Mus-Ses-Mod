const RPC = require("discord-rpc");
const client = new RPC.Client({ transport: "ipc" });
client.on("ready", () => {
  client.request("SET_ACTIVITY", {
    pid: process.pid,
    activity: {
      details: "Invite andoi now!",
      assets: {
        large_image: "andoi",
      },
      buttons: [
        {
          label: "invite",
          url:
            "https://discord.com/oauth2/authorize?client_id=728694375739162685&permissions=8&scope=bot",
        },
        { label: "support", url: "https://discord.gg/R5dj6havzU" },
      ],
    },
  });
  console.log("Started!");
});
client.login({ clientId: "728694375739162685" });
