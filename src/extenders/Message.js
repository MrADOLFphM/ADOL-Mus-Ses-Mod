const { Structures, APIMessage, MessageEmbed } = require("discord.js");
module.exports = Structures.extend(
  "Message",
  (Message) =>
    class AndoiMessage extends Message {
      constructor(...args) {
        super(...args);

        this.lastResponse = null;
      }
      get language() {
        return this.guild.getLang();
      }
      embed() {
        return new MessageEmbed();
      }

      async send(content, options) {
        const transformedOptions = APIMessage.transformOptions(
          content,
          options
        );

        if ("files" in transformedOptions)
          return this.channel.send(transformedOptions);

        if (!transformedOptions.content) transformedOptions.content = null;
        if (!transformedOptions.embed) transformedOptions.embed = null;

        if (
          this.lastResponse &&
          !this.lastResponse.deleted &&
          !this.lastResponse.attachments.size
        ) {
          return this.lastResponse.edit(transformedOptions);
        }

        const sent = await this.channel.send(transformedOptions);
        this.lastResponse = Array.isArray(sent) ? sent.slice(-1)[0] : sent;

        return sent;
      }
      async awaitReply(question, filter, limit = 60000) {
        let e = new MessageEmbed().setDescription(question).setColor("RANDOM");
        await this.channel.send(e);

        return this.channel
          .awaitMessages(filter, { max: 1, time: limit, errors: ["time"] })
          .then((collected) => collected.first().content)
          .catch(() => false);
      }
      async awaitReact(question, filter, reactions, limit = 60000) {
        const msg = await this.channel.send(question);
        reactions.forEach((r) => {
          msg.react(r);
        });
        const rr = await msg.awaitReactions(filter, {
          max: 1,
          time: limit,
          errors: ["time"],
        });

        const ms = rr.first()._emoji.name;
        return ms;
      }
      succes(content) {
        if (!content) return this.react("786561775705129040");
        if (content) {
          this.channel.send(content);
          this.react("786561775705129040");
        }
      }

      error(content) {
        if (!content) return this.react("786561514122641408");
        if (content) {
          this.channel.send(content);
          this.react("786561514122641408");
        }
      }
    }
);
