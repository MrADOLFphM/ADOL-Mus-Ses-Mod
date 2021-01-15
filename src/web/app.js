const express = require("express");
const app = express();
const port = 3030;
const path = require("path");
module.exports = (client) => {
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
  app.set("trust proxy", true);

  app.get("/commands", (req, res) => {
    return res.render("commands", {
      djsclient: client,
    });
  });
  app.get("/", (req, res) => {
    return res.render("index");
  });
  app.get("/invite", (req, res) => {
    return res.render("invite");
  });
  app.get("/about", (req, res) => {
    return res.render("about");
  });

  const server = app.listen(port, () => {
    console.log("Web server running");
  });
  require("../modules/topgg")(client, server);
};
