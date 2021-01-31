const { URLSearchParams } = require("url");
const Top = require("@top-gg/sdk");
const { dblkey } = require("../../../config.json");

module.exports = class VoteManager {
  constructor(client) {
    /**
     * The client that instantiated this Manager
     * @name VoteManager#client
     * @type {MaiClient}
     * @readonly
     */
    this.client = client;
    this.top_gg = null;

    if (dblkey) {
      const app = require("express")();

      this.top_gg = {
        api: new Top.Api(dblkey),
        webhook: new Top.Webhook("AndoiBot"),
      };

      app.post("/dblwebhook", this.top_gg.webhook.middleware(), (req, res) => {
        this.client.emit("vote", req.vote.user, req.vote.isWeekend, req.vote);
      });

      app.listen(25635);
    } else {
      // Do nothing..
    }
  }

  _post() {
    const serverCount = this.client.guilds.cache.size;
    this.top_gg?.api.postStats({ serverCount });
    this.client.emit("statsPosted");
  }

  init(loop) {
    if (loop) {
      this._post();
      setInterval(() => this._post(), 1800000);
    } else {
      this._post();
    }
    return;
  }
};
