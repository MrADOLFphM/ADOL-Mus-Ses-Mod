module.exports = {
  name: "interaction",
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;
    const command = client.slash.get(interaction.command.name);

    await command.execute(
      client,
      interaction,
      interaction.options.map((item) => item.value)
    );
  },
};
