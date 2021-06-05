class fight {
  constructor(options) {
    function getRandomString(length) {
      var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var result = "";
      for (var i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      return result;
    }
    let id1 =
      getRandomString(4) +
      "-" +
      getRandomString(4) +
      "-" +
      getRandomString(4) +
      "-" +
      getRandomString(4);
    let id2 =
      getRandomString(4) +
      "-" +
      getRandomString(4) +
      "-" +
      getRandomString(4) +
      "-" +
      getRandomString(4);
    let id3 =
      getRandomString(4) +
      "-" +
      getRandomString(4) +
      "-" +
      getRandomString(4) +
      "-" +
      getRandomString(4);

    this.message = options.message;
    this.acceptMessage = options.acceptMessage;
    this.client = options.client;
    this.challenger = options.challenger;
    this.opponent = options.opponent;
    this.heal = id1;
    this.cancel = id2;
    this.hit = id3;
    this.hitButtonText = options.hitButtonText;
    this.hitButtonColor = options.hitButtonColor;
    this.healButtonText = options.healButtonText;
    this.healButtonColor = options.healButtonColor;
    this.cancelButtonText = options.cancelButtonText;
    this.cancelButtonColor = options.cancelButtonColor;
  }

  async start() {
    const challenger = this.challenger;
    const oppenent = this.opponent;
    const question = await this.message.channel.send(this.acceptMessage);

    ["✅", "❌"].forEach(async (el) => await question.react(el));

    const filter = (reaction, user) =>
      ["✅", "❌"].includes(reaction.emoji.name) &&
      user.id === this.opponent.id;

    const response = await question.awaitReactions(filter, {
      max: 1,
      time: 60000,
    });
    const reaction = response.first();
    if (oppenent.bot) return this.message.channel.send("You can't fight bots.");
    if (oppenent.id === challenger.id)
      return this.message.channel.send("You can't fight yourself.");
    if (!reaction) return question.edit("Cancelled did not respond in time.");
    if (reaction.emoji.name === "❌") {
      return question.edit("Cancelled this fight.");
    } else {
      question.delete();
      const challengerHealth = 100;
      const oppenentHealth = 100;

      const challengerLastAttack = "heal";
      const oppenentLastAttack = "heal";

      const gameData = [
        {
          member: challenger,
          health: challengerHealth,
          lastAttack: challengerLastAttack,
        },
        {
          member: oppenent,
          health: oppenentHealth,
          lastAttack: oppenentLastAttack,
        },
      ];

      let player = 0;

      const checkHealth = (member) => {
        if (gameData[member].health <= 0) return true;
        else return false;
      };
      const MessageButton = require("../../extenders/MessageButton");
      let btn1 = new MessageButton()
        .setLabel(this.hitButtonText)
        .setCustomID(this.hit)
        .setStyle(this.hitButtonColor);
      let btn2 = new MessageButton()
        .setLabel(this.healButtonText)
        .setCustomID(this.heal)
        .setStyle(this.healButtonColor);
      let btn3 = new MessageButton()
        .setLabel(this.cancelButtonText)
        .setCustomID(this.cancel)
        .setStyle(this.cancelButtonColor);

      let DaBaby = await this.message.channel.send(
        `${challenger}, you go first`,
        { components: [{ type: 1, components: [btn1, btn2, btn3] }] }
      );
      const gameFilter = (m) =>
        m.user.id === challenger.id || m.user.id === oppenent.id;
      const gameCollector = DaBaby.createMessageComponentInteractionCollector(
        gameFilter,
        { time: 30000 }
      );
      try {
        gameCollector.on("collect", (msg) => {
          if (msg.member.id === gameData[player].member.id) {
            if (!checkHealth(player)) {
              const btn = msg.member;

              if (msg.customID === this.hit) {
                msg.defer();
                if (btn.id !== gameData[player].member.id)
                  return msg.reply(
                    gameData[player].member + "please wait for enemy's move...",
                    true
                  );
                msg.deleteReply();
                let randNumb = Math.floor(Math.random() * (60 - 12) + 12);
                const tempPlayer = (player + 1) % 2;
                if (gameData[tempPlayer].lastAttack === "heal")
                  randNumb = Math.floor(randNumb / 2);
                gameData[tempPlayer].health -= randNumb;
                gameData[player].lastAttack = "attack";
                if (gameData[player].member.id == this.message.author.id) {
                  DaBaby.edit(
                    `(hitted) ${gameData[player].member.username} — ${gameData[player].health} HP                     VS                     **${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health}`,
                    {
                      components: [{ type: 1, components: [btn1, btn2, btn3] }],
                    }
                  );
                } else if (gameData[player].member.id == this.opponent.id) {
                  DaBaby.edit(
                    `**${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP                              VS                              **${gameData[player].member.username}** — ${gameData[player].health} (hitted)`,
                    {
                      components: [{ type: 1, components: [btn1, btn2, btn3] }],
                    }
                  );
                }
                if (player === 1) {
                  player = 0;
                } else {
                  player = +1;
                }
              } else if (msg.customID === this.heal) {
                msg.defer();
                if (btn.id !== gameData[player].member.id)
                  return msg.reply(
                    gameData[player].member + "please wait for enemy's move...",
                    true
                  );
                msg.deleteReply();

                let randrNumb = Math.floor(Math.random() * (20 - 12) + 12);
                const tempPlayer = (player + 1) % 2;
                if (gameData[tempPlayer].lastAttack === "heal")
                  randrNumb = Math.floor(randrNumb / 2);
                gameData[player].health += randrNumb;
                gameData[player].lastAttack = "attack";
                if (gameData[player].member.id == this.message.author.id) {
                  DaBaby.edit(
                    `(healed) ${gameData[player].member.username} — ${gameData[player].health} HP                     VS                     **${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health}`,
                    {
                      components: [{ type: 1, components: [btn1, btn2, btn3] }],
                    }
                  );
                } else if (gameData[player].member.id == this.opponent.id) {
                  DaBaby.edit(
                    `**${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP                              VS                              **${gameData[player].member.username}** — ${gameData[player].health} (healed)`,
                    {
                      components: [{ type: 1, components: [btn1, btn2, btn3] }],
                    }
                  );
                }
                if (player === 1) {
                  player = 0;
                } else {
                  player = +1;
                }
              } else if (msg.customID === this.cancel) {
                msg.defer();
                if (btn.id !== gameData[player].member.id)
                  return msg.reply(
                    gameData[player].member + "please wait for enemy's move...",
                    true
                  );
                msg.deleteReply();
                btn1 = new MessageButton()
                  .setLabel(this.hitButtonText)
                  .setCustomID(this.hit)
                  .setStyle(this.hitButtonColor)
                  .setDisabled();
                btn2 = new MessageButton()
                  .setLabel(this.healButtonText)
                  .setCustomID(this.heal)
                  .setStyle(this.healButtonColor)
                  .setDisabled();
                btn3 = new MessageButton()
                  .setLabel(this.cancelButtonText)
                  .setCustomID(this.cancel)
                  .setStyle(this.cancelButtonColor)
                  .setDisabled();
                gameCollector.stop();
                DaBaby.edit(`Game stopped.`, {
                  components: [{ type: 1, components: [btn1, btn2, btn3] }],
                });
              }

              if (checkHealth(player)) {
                msg.defer();
                btn1 = new MessageButton()
                  .setLabel(this.hitButtonText)
                  .setCustomID(this.hit)
                  .setStyle(this.hitButtonColor)
                  .setDisabled();
                btn2 = new MessageButton()
                  .setLabel(this.healButtonText)
                  .setCustomID(this.heal)
                  .setStyle(this.healButtonColor)
                  .setDisabled();
                btn3 = new MessageButton()
                  .setLabel(this.cancelButtonText)
                  .setCustomID(this.cancel)
                  .setStyle(this.cancelButtonColor)
                  .setDisabled();
                gameCollector.stop();
                const tempPlayer = (player + 1) % 2;
                DaBaby.edit(
                  `🏆 ${gameData[tempPlayer].member} has won the game!`,
                  {
                    components: [{ type: 1, components: [btn1, btn2, btn3] }],
                  }
                );
              }
            } else {
              msg.defer();
              btn1 = new MessageButton()
                .setLabel(this.hitButtonText)
                .setCustomID(this.hit)
                .setStyle(this.hitButtonColor)
                .setDisabled();
              btn2 = new MessageButton()
                .setLabel(this.healButtonText)
                .setCustomID(this.heal)
                .setStyle(this.healButtonColor)
                .setDisabled();
              btn3 = new MessageButton()
                .setLabel(this.cancelButtonText)
                .setCustomID(this.cancel)
                .setStyle(this.cancelButtonColor)
                .setDisabled();
              gameCollector.stop();
              const tempPlayer = (player + 1) % 2;
              DaBaby.edit(
                `🏆 ${gameData[tempPlayer].member} has won the game!`,
                {
                  components: [{ type: 1, components: [btn1, btn2, btn3] }],
                }
              );
            }
          }
        });
      } catch (err) {}
    }
  }
}

module.exports = fight;
