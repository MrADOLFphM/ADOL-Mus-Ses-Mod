module.exports = (client) => {
  const express = require("express");
  const api = require("./routes/api/api");
  const url = require("url");
  const app = express();
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");
  app.use(express.static(`${__dirname}/assets`));
  app.locals.basedir = `${__dirname}/assets`;
  app.get("/logo.png", (req, res) => {
    res.set("Content-Type", "image/png");
    return res.send(require("./assets/img/logo.png"));
  });
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
  app.get("/dblwebhook", (req, res) => {
    res.json({ message: "Yeah no" });
  });
  app.post(
    "/dblwebhook",
    client.voteManager.top_gg.webhook.middleware(),
    (req, res) => {
      client.emit("vote", req.vote.user, req.vote.isWeekend, req.vote);
    }
  );
  const port = 27024;
  app.listen(port, () =>
    console.log(` Dashboard - Server is live on port ${port}`)
  );
  const querystring = require("querystring");
  app.use((req, res, next) => {
    req.urlParams = querystring.parse(
      url.parse("https://bot.andoi.tk" + req.originalUrl).query
    );

    next();
  });
  app.use("/api", api);
};
