const logBed = require("../../utils/logBed");
module.exports = {
  name: "voiceStateUpdate",
  async execute(client, oldState, newState) {
    if (!oldState.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await oldState.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    if (!oldState.channel && newState.channel) {
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has joined ${newState.channel.name}`
      );
      webhook.send(e);
    }
    if (oldState.channel && !newState.channel) {
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has left ${oldState.channel.name}`
      );
      webhook.send(e);
    }
    if (
      oldState.channel &&
      newState.channel &&
      oldState.channel.id !== newState.channel.id
    ) {
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has switched from ${oldState.channel.name} to ${newState.channel.name}`
      );
      webhook.send(e);
    }
    if (!oldState.mute && newState.mute) {
      const muteType = newState.selfMute ? "self-muted" : "server-muted";
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has been muted. Type: (${muteType})`
      );
      webhook.send(e);
    }
    if (oldState.mute && !newState.mute) {
      const muteType = oldState.selfMute ? "self-muted" : "server-muted";
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has been unmuted. Type: (${muteType})`
      );
      webhook.send(e);
    }
    if (!oldState.deaf && newState.deaf) {
      const deafType = newState.selfDeaf ? "self-deafed" : "server-v";
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has been deafened. Type: (${deafType})`
      );
      webhook.send(e);
    }
    if (oldState.deaf && !newState.deaf) {
      const deafType = oldState.selfDeaf ? "self-deafed" : "server-v";
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has been undeafened. Type: (${deafType})`
      );
      webhook.send(e);
    }
    if (!oldState.streaming && newState.streaming) {
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has started streaming.`
      );
      webhook.send(e);
    }
    if (oldState.streaming && !newState.streaming) {
      const e = logBed(client).setDescription(
        `${oldState.member.user.tag} has stopped streaming.`
      );
      webhook.send(e);
    }
  },
};
