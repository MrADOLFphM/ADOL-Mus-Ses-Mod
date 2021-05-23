const { Structures } = require("discord.js");

module.exports = Structures.extend(
  "DMChannel",
  (DMChannel) =>
    class AndoiDMChannel extends DMChannel {
      async open(user) {
        let e;
        let te = await user.createDM();
        if (te) e = false;
        if (te) e = true;
        return e;
      }
    }
);
