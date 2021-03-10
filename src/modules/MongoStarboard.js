const StarboardsManager = require("discord-starboards");
const StarboardModel = require("../models/starboard");
class MongStarboardsManager extends StarboardsManager {
  async getAllStarboards() {
    return await StarboardModel.find();
  }

  async saveStarboard(data) {
    const giv = new StarboardModel(data);
    await giv.save();

    return true;
  }

  async deleteStarboard(channelID, emoji) {
    await StarboardModel.findOneAndDelete({
      channelID,
      "options.emoji": emoji,
    });

    return true;
  }
}

module.exports = MongStarboardsManager;
