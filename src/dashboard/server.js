module.exports = (client) => {
  const express = require("express");
  const app = express();
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");
  app.use(express.static(`${__dirname}/assets`));
  app.locals.basedir = `${__dirname}/assets`;
  app.get("/commands", (req, res) => {
    return res.render("commands", {
      djsclient: client,
    });
  });
  app.get("/", (req, res) => {
    res.render("index");
  });
  app.get("/invite", (req, res) => {
    res.render("invite");
  });
  app.get("/about", (req, res) => {
    res.render("about");
  });
  app.post(
    "/dblwebhook",
    client.voteManager.top_gg.webhook.middleware(),
    (req, res) => {
      client.emit("vote", req.vote.user, req.vote.isWeekend, req.vote);
    }
  );
  const port = 25755;
  app.listen(port, () =>
    console.log(` Dashboard - Server is live on port ${port}`)
  );
};
