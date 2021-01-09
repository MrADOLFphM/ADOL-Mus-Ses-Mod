const { Structures } = require("discord.js");

module.exports = Structures.extend(
  "TextChannel",
  (TextChannel) =>
    class AndoiTextChannel extends TextChannel {
      readable() {
        return this.permissionsFor(this.guild.me).has("VIEW_CHANNEL");
      }

      postable() {
        return (
          this.readable &&
          this.permissionsFor(this.guild.me).has("SEND_MESSAGES")
        );
      }
    }
);
