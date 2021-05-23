const mongoose = require("mongoose");
const { Mongo } = require("../../config.json");

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    mongoose.connect(Mongo, dbOptions).catch((err) => console.log(err));

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB!");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB!");
    });
  },
};
