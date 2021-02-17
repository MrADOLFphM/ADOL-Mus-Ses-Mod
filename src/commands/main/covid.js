const Discord = require("discord.js");
const fetch = require("node-fetch");
const covid = require("covidtracker");
Object.defineProperty(String.prototype, "toProperCase", {
  value: function () {
    return this.replace(
      /([^\W_]+[^\s-]*) */g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },
});

module.exports = {
  name: "corona",
  category: "info",
  description: "Get the stats of corona",
  usage: "corona all or corona <country>",
  aliases: ["covid", "covid19"],
  run: async (client, message, args) => {
    const lang = await message.guild.getLang();
    if (!args[0]) {
      const totalStats = await covid.getAll();

      const updatedTime = new Date(totalStats.updated);

      const embed = new Discord.MessageEmbed()
        .setAuthor(lang.MAIN.COVID_STATS, client.user.displayAvatarURL())
        .addField(
          lang.MAIN.CONFIRMED_COVID_CASES,
          `**${totalStats.cases.toLocaleString()}**`,
          true
        )
        .addField(
          lang.MAIN.TODAY_COVID_CASES,
          `+${totalStats.todayCases.toLocaleString()}`,
          true
        )
        .addField(
          lang.MAIN.TODAY_COVID_DEATHS,
          `+${totalStats.todayDeaths.toLocaleString()}`,
          true
        )
        .addField(
          lang.MAIN.ACTIVE_COVID,
          `${totalStats.active.toLocaleString()} (${(
            (totalStats.active / totalStats.cases) *
            100
          ).toFixed(2)}%)`,
          true
        )
        .addField(
          lang.MAIN.RECOVERED_COVID,
          `${totalStats.recovered.toLocaleString()} (${(
            (totalStats.recovered / totalStats.cases) *
            100
          ).toFixed(2)}%)`,
          true
        )
        .addField(
          lang.MAIN.DEATHS_COVID,
          `${totalStats.deaths.toLocaleString()} (${(
            (totalStats.deaths / totalStats.cases) *
            100
          ).toFixed(2)}%)`,
          true
        )
        .addField(
          lang.MAIN.TESTS_COVID,
          `${totalStats.tests.toLocaleString()}`,
          true
        )
        .addField(
          lang.MAIN.CASES_PER_MIL_COVID,
          `${totalStats.casesPerOneMillion.toLocaleString()}`,
          true
        )
        .addField(
          lang.MAIN.DEATHS_PER_MIL_COVID,
          `${totalStats.deathsPerOneMillion.toLocaleString()}`,
          true
        )
        .setImage(
          `https://xtrading.io/static/layouts/qK98Z47ptC-embed.png?newest=${Date.now()}`
        )
        .setColor("RANDOM")
        .setFooter(
          lang.MAIN.LAST_UPDATED_COVID.replace("{updatedTime}", updatedTime)
        );
      message.channel.send(embed);
    } else {
      let countryInput = args.join(" ").toProperCase();
      if (countryInput.toLowerCase() == "netherlands") countryInput = "nl";
      if (countryInput.toLowerCase() == "laos")
        countryInput = "Lao People's Democratic Republic";
      const country = await covid.getCountry({ country: countryInput });
      if (!country)
        return message.channel.send(lang.MAIN.COUNTRY_NOT_FOUND_COVID);

      let wikiName;
      const wikiAliases = {
        "S. Korea": "South Korea",
        UK: "United Kingdom",
        USA: "United States",
      };

      const thePrefixedContries = ["United States", "Netherlands"];

      if (wikiAliases[country.country]) {
        wikiName = wikiAliases[country.country];
      } else {
        wikiName = country.country;
      }

      let wikiImage = "";
      if (country.country == "USA") {
        wikiImage = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/COVID-19_Outbreak_Cases_in_the_United_States_%28Density%29.svg/640px-COVID-19_Outbreak_Cases_in_the_United_States_%28Density%29.svg.png?1588686006705?newest=${Date.now()}`;
      } else {
        const WikiPage = await fetch(
          `https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_${
            thePrefixedContries.includes(wikiName) ? "the_" : ""
          }${wikiName
            .replace(" ", "_")
            .replace(" ", "_")
            .replace(" ", "_")
            .replace(" ", "_")
            .replace(" ", "_")
            .replace(" ", "_")
            .replace(" ", "_")
            .replace(" ", "_")}`
        ).then((res) => res.text());
        const ImageRegex = /<meta property="og:image" content="([^<]*)"\/>/;
        const ImageLink = ImageRegex.exec(WikiPage);
        let imageLink;
        if (ImageLink) imageLink = ImageLink[1];
        if (imageLink) imageLink += `?newest=${Date.now()}`;
        wikiImage = imageLink;
      }

      const updatedTime = new Date(country.updated);

      const embed = new Discord.MessageEmbed()
        .setAuthor(country.country)
        .addField(
          lang.MAIN.CONFIRMED_COVID_CASES,
          `**${country.cases.toLocaleString()}**`,
          true
        )
        .addField(
          lang.MAIN.TODAY_COVID_CASES,
          `+${country.todayCases.toLocaleString()}`,
          true
        )
        .addField(
          lang.MAIN.TODAY_COVID_DEATHS,
          `+${country.todayDeaths.toLocaleString()}`,
          true
        )
        .addField(
          lang.MAIN.ACTIVE_COVID,
          `${country.active.toLocaleString()} (${(
            (country.active / country.cases) *
            100
          ).toFixed(2)}%)`,
          true
        )
        .addField(
          lang.MAIN.RECOVERED_COVID,
          `${country.recovered.toLocaleString()} (${(
            (country.recovered / country.cases) *
            100
          ).toFixed(2)}%)`,
          true
        )
        .addField(
          lang.MAIN.DEATHS_COVID,
          `${country.deaths.toLocaleString()} (${(
            (country.deaths / country.cases) *
            100
          ).toFixed(2)}%)`,
          true
        )
        .addField(
          lang.MAIN.TESTS_COVID,
          `${country.tests.toLocaleString()}`,
          true
        )
        .addField(
          lang.MAIN.CASES_PER_MIL_COVID,
          `${country.casesPerOneMillion.toLocaleString()}`,
          true
        )
        .addField(
          lang.MAIN.DEATHS_PER_MIL_COVID,
          `${country.deathsPerOneMillion.toLocaleString()}`,
          true
        )
        .setThumbnail(
          `https://www.countryflags.io/${
            require("../../assets/json/countries_abbreviations.json")[
              country.country
            ]
          }/flat/64.png`
        )
        .setColor("RANDOM")
        .setFooter(
          lang.MAIN.LAST_UPDATED_COVID.replace("{updatedTime}", updatedTime)
        );
      if (wikiImage) embed.setImage(wikiImage);
      message.channel.send(embed);
    }
  },
};
