const User = require("../models/userEco");

module.exports = (client) => {
  client.getUser = async (user) => {
    let data = await User.findOne({ userID: user.id });
    return data;
  };
  client.updateUser = async (user, stats) => {
    let data = await client.getUser(user);

    return await data.updateOne(stats).catch((err) => console.log(err));
  };
  client.createUser = async (stats) => {
    const newUser = new User(stats);
    return newUser.save().catch((err) => console.log(err));
  };
  client.deleteUser = async (user) => {
    await User.deleteOne({ userID: user.id }).catch((err) => console.log(err));
  };
};
