const express = require("express");
const router = express.Router();
const moment = require("moment");
const canvas = require("canvas");
const jimp = require("jimp");
const { client } = global;
router.get("/guilds", (req, res) => {
  const guilds = client.guilds.cache.array().map((g) => `${g.name} => ${g.id}`);
  return res.json({
    guilds: guilds,
  });
});
router.get("/guilds/:id/stats", (req, res) => {
  const growth = [];
  const join = [];

  const guild = client.guilds.cache.get(req.params.id);
  const activeNow = guild.members.cache.filter(
    (m) => m.presence.status === "online" || m.presence.status === "dnd"
  ).size;
  for (let i = 0; i < 7; i++) {
    const date = moment().subtract(i, "days");
    growth.push(
      guild.members.cache.filter((m) =>
        moment(m.joinedAt).isSameOrBefore(date, "day")
      ).size
    );
  }
  for (let i = 0; i < 7; i++) {
    const date = moment().subtract(i, "days");
    join.push(
      guild.members.cache.filter((m) => moment(m.joinedAt).isSame(date, "day"))
        .size
    );
  }
  return res.json({
    stats: {
      activeNow,
      growthRate: growth,
      joinRate: join,
      note: "Note that the join and growthRate are from past 7 days!",
    },
  });
});
router.get("/ad", async (req, res) => {
  if (!req.urlParams.image)
    return res.json({ error: true, message: "No image was provided" });
  const Canvas = canvas.createCanvas(550, 474);
  const ctx = Canvas.getContext("2d");
  let im = await canvas.loadImage(req.urlParams.image);
  const back = await canvas.loadImage(`${__dirname}/../../assets/img/ad.png`);
  ctx.drawImage(im, 150, 75, 230, 230);
  ctx.drawImage(back, 0, 0, 550, 474);
  res.set("Content-Type", "image/png");
  return res.send(Canvas.toBuffer());
});
router.get("/", (req, res) => {
  res.json({
    note: "[] is required to let the endpoint function",
    endpoints:
      "/affect?image=[image-url], /guilds/[GUILD-ID]/stats, /guilds, /ad?image=[image-url]",
  });
});
router.get("/affect", async (req, res) => {
  if (!req.urlParams.image)
    return res.json({ error: true, message: "No image was provided" });
  const base = await jimp.read(`${__dirname}/../../assets/img/affect.png`);
  const img = await jimp.read(req.urlParams.image);
  img.resize(200, 157);
  base.composite(img, 180, 383);
  let raw;
  base.getBuffer("image/png", (err, buffer) => {
    raw = buffer;
  });
  res.set("Content-Type", "image/png");
  return res.send(raw);
});
module.exports = router;
