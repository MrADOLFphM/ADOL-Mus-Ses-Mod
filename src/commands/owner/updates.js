const model = require("../../models/updates");

module.exports = {
  name: "cupdates",
  category: "owner",
  description: "Change the latest updates",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const filter = (res) => res.author.id === message.author.id;

    const version = await message.awaitReply(
      "What is the version of the update?",
      filter
    );

    const newUp = await message.awaitReply(
      "What is new in this update?",
      filter
    );
    const fixed = await message.awaitReply(
      "What is fixed in this update?",
      filter
    );
    const removed = await message.awaitReply(
      "What is removed in this update?",
      filter
    );
    const mo = await model.findOne({ name: "Andoi" });
    if (!mo) {
      new model({
        name: "Andoi",
        version: version,
        updates: { new: newUp, fixed: fixed, removed: removed },
      }).save();
      message.send("Update the model for the updates command!");
    } else {
      await model.findOneAndUpdate(
        {
          name: "Andoi",
        },
        {
          version: version,
          updates: { new: newUp, fixed: fixed, removed: removed },
        }
      );
      message.send("Update the model for the updates command!");
    }
  },
};
