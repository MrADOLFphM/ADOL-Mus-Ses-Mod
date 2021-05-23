const model = require("../models/userEco");
module.exports = async (client) => {
  const economys = await model.find();
  for (const model of economys) {
    await model.deleteOne();
  }

  for (const user of client.users.cache) {
    new model({
      userID: user.id,
    }).save();
  }
};
