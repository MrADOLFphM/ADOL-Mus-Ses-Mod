module.exports = async (message) => {
  if (!message) throw new TypeError("Weky Error: Missing argument message");
  const MessageButton = require("../extenders/MessageButton");
  function i(length) {
    var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
  let str = " ";
  let stringify = "```\n" + str + "\n```";
  let calculator_ac = i(20);
  let calculator_e1 = i(20);
  let calculator_e2 = i(20);
  let calculator_uppercase = i(20);
  let calculator_7 = i(20);
  let calculator_8 = i(20);
  let calculator_9 = i(20);
  let calculator_plus = i(20);
  let calculator_minus = i(20);
  let calculator_star = i(20);
  let calculator_devide = i(20);
  let calculator_1 = i(20);
  let calculator_2 = i(20);
  let calculator_3 = i(20);
  let calculator_4 = i(20);
  let calculator_5 = i(20);
  let calculator_0 = i(20);
  let calculator_6 = i(20);
  let calculator_dot = i(20);
  let calculator_equal = i(20);
  let ac = new MessageButton()
    .setLabel("AC")
    .setCustomID(calculator_ac)
    .setStyle("red");
  let e1 = new MessageButton()
    .setLabel("(")
    .setCustomID(calculator_e1)
    .setStyle("blurple");
  let e2 = new MessageButton()
    .setLabel(")")
    .setCustomID(calculator_e2)
    .setStyle("blurple");
  let uppercase = new MessageButton()
    .setLabel("^")
    .setCustomID(calculator_uppercase)
    .setStyle("blurple");
  let seven = new MessageButton()
    .setLabel("7️")
    .setCustomID(calculator_7)
    .setStyle("gray");
  let eight = new MessageButton()
    .setLabel("8️")
    .setCustomID(calculator_8)
    .setStyle("gray");
  let nine = new MessageButton()
    .setLabel("9️")
    .setCustomID(calculator_9)
    .setStyle("gray");
  let slash = new MessageButton()
    .setLabel("/")
    .setCustomID(calculator_devide)
    .setStyle("blurple");
  let four = new MessageButton()
    .setLabel("4️")
    .setCustomID(calculator_4)
    .setStyle("gray");
  let five = new MessageButton()
    .setLabel("5️")
    .setCustomID(calculator_5)
    .setStyle("gray");
  let six = new MessageButton()
    .setLabel("6️")
    .setCustomID(calculator_6)
    .setStyle("gray");
  let star = new MessageButton()
    .setLabel("*")
    .setCustomID(calculator_star)
    .setStyle("blurple");
  let one = new MessageButton()
    .setLabel("1️")
    .setCustomID(calculator_1)
    .setStyle("gray");
  let two = new MessageButton()
    .setLabel("2️")
    .setCustomID(calculator_2)
    .setStyle("gray");
  let three = new MessageButton()
    .setLabel("3️")
    .setCustomID(calculator_3)
    .setStyle("gray");
  let minus = new MessageButton()
    .setLabel("-")
    .setCustomID(calculator_minus)
    .setStyle("blurple");
  let zero = new MessageButton()
    .setLabel("0️")
    .setCustomID(calculator_0)
    .setStyle("gray");
  let dot = new MessageButton()
    .setLabel(".")
    .setCustomID(calculator_dot)
    .setStyle("blurple");
  let equal = new MessageButton()
    .setLabel("=")
    .setCustomID(calculator_equal)
    .setStyle("green");
  let plus = new MessageButton()
    .setLabel("+")
    .setCustomID(calculator_plus)
    .setStyle("blurple");
  //Lock
  let qac = new MessageButton()
    .setLabel("AC")
    .setCustomID(calculator_ac)
    .setStyle("red")
    .setDisabled();
  let qe1 = new MessageButton()
    .setLabel("(")
    .setCustomID(calculator_e1)
    .setStyle("blurple")
    .setDisabled();
  let qe2 = new MessageButton()
    .setLabel(")")
    .setCustomID(calculator_e2)
    .setStyle("blurple")
    .setDisabled();
  let quppercase = new MessageButton()
    .setLabel("^")
    .setCustomID(calculator_uppercase)
    .setStyle("blurple")
    .setDisabled();
  let qseven = new MessageButton()
    .setLabel("7️")
    .setCustomID(calculator_7)
    .setStyle("gray")
    .setDisabled();
  let qeight = new MessageButton()
    .setLabel("8️")
    .setCustomID(calculator_8)
    .setStyle("gray")
    .setDisabled();
  let qnine = new MessageButton()
    .setLabel("9️")
    .setCustomID(calculator_9)
    .setStyle("gray")
    .setDisabled();
  let qslash = new MessageButton()
    .setLabel("/")
    .setCustomID(calculator_devide)
    .setStyle("blurple")
    .setDisabled();
  let qfour = new MessageButton()
    .setLabel("4️")
    .setCustomID(calculator_4)
    .setStyle("gray")
    .setDisabled();
  let qfive = new MessageButton()
    .setLabel("5️")
    .setCustomID(calculator_5)
    .setStyle("gray")
    .setDisabled();
  let qsix = new MessageButton()
    .setLabel("6️")
    .setCustomID(calculator_6)
    .setStyle("gray")
    .setDisabled();
  let qstar = new MessageButton()
    .setLabel("*")
    .setCustomID(calculator_star)
    .setStyle("blurple")
    .setDisabled();
  let qone = new MessageButton()
    .setLabel("1️")
    .setCustomID(calculator_1)
    .setStyle("gray")
    .setDisabled();
  let qtwo = new MessageButton()
    .setLabel("2️")
    .setCustomID(calculator_2)
    .setStyle("gray")
    .setDisabled();
  let qthree = new MessageButton()
    .setLabel("3️")
    .setCustomID(calculator_3)
    .setStyle("gray")
    .setDisabled();
  let qminus = new MessageButton()
    .setLabel("-")
    .setCustomID(calculator_minus)
    .setStyle("blurple")
    .setDisabled();
  let qzero = new MessageButton()
    .setLabel("0️")
    .setCustomID(calculator_0)
    .setStyle("gray")
    .setDisabled();
  let qdot = new MessageButton()
    .setLabel(".")
    .setCustomID(calculator_dot)
    .setStyle("blurple")
    .setDisabled();
  let qequal = new MessageButton()
    .setLabel("=")
    .setCustomID(calculator_equal)
    .setStyle("green")
    .setDisabled();
  let qplus = new MessageButton()
    .setLabel("+")
    .setCustomID(calculator_plus)
    .setStyle("blurple")
    .setDisabled();
  //-----------------------
  const filter = (m) => m.user.id == message.author.id;
  message.channel
    .send(stringify, {
      components: [
        { type: 1, components: [ac, e1, e2, uppercase] },
        { type: 1, components: [seven, eight, nine, slash] },
        { type: 1, components: [four, five, six, star] },
        { type: 1, components: [one, two, three, minus] },
        { type: 1, components: [dot, zero, equal, plus] },
      ],
    })
    .then(async (msg) => {
      async function edit() {
        msg.edit(stringify, {
          components: [
            { type: 1, components: [ac, e1, e2, uppercase] },
            { type: 1, components: [seven, eight, nine, slash] },
            { type: 1, components: [four, five, six, star] },
            { type: 1, components: [one, two, three, minus] },
            { type: 1, components: [dot, zero, equal, plus] },
          ],
        });
      }
      const calc = msg.createMessageComponentInteractionCollector(filter, {
        time: 60000,
      });

      calc.on("collect", async (btn) => {
        btn.defer(true);
        btn.deleteReply();
        if (btn.customID === calculator_1) {
          str += "1";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_2) {
          str += "2";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_3) {
          str += "3";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_4) {
          str += "4";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_5) {
          str += "5";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_6) {
          str += "6";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_7) {
          str += "7";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_8) {
          str += "8";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_9) {
          str += "9";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_0) {
          str += "0";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_plus) {
          str += "+";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_minus) {
          str += "-";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_devide) {
          str += "/";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_uppercase) {
          str += "^";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_star) {
          str += "*";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_dot) {
          str += ".";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_ac) {
          str = " ";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_e1) {
          str += "(";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_e2) {
          str += ")";
          stringify = "```\n" + str + "\n```";
          edit();
        } else if (btn.customID === calculator_equal) {
          try {
            str += " = " + require("mathjs").evaluate(str) + "";
            stringify = "```\n" + str + "\n```";
            edit();
            str = "";
            stringify = "```\n" + str + "\n```";
          } catch (e) {
            message.channel
              .send(" An invalid equation was entered!")
              .then((m) => m.delete({ timeout: 2000 }));

            stringify = "```\n" + str + "\n```";
          }
        }
      });
    });
};
