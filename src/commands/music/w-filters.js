module.exports = {
  name: "filters",
  category: "music",
  description: "Check current filters!",

  run: async (client, message) => {
    const conf = await client.getConfig(message.guild);
    if (!message.member.voice.channel)
      return message.channel.send(
        `${client.emotes.error} - You're not in a voice channel !`
      );

    if (!client.player.getQueue(message))
      return message.channel.send(
        `${client.emotes.error} - No music currently playing !`
      );

    const disabledEmoji = client.emotes.error;
    const enabledEmoji = client.emotes.success;

    const filtersStatuses = [[], []];

    Object.keys(client.filters).forEach((filterName) => {
      const array =
        filtersStatuses[0].length > filtersStatuses[1].length
          ? filtersStatuses[1]
          : filtersStatuses[0];
      array.push(
        client.filters[filterName] +
          " : " +
          (client.player.getQueue(message).filters[filterName]
            ? enabledEmoji
            : disabledEmoji)
      );
    });

    message.channel.send({
      embed: {
        color: "ORANGE",
        fields: [
          {
            name: "Filters",
            value: filtersStatuses[0].join("\n"),
            inline: true,
          },
          { name: "** **", value: filtersStatuses[1].join("\n"), inline: true },
        ],
        timestamp: new Date(),
        description: `List of all filters enabled or disabled.\nUse \`${conf.prefix}filter\` to add a filter to a song.`,
      },
    });
  },
};
