# Getting Started

**Only required if self-hosted/wanting to contribute**

[Invite Andoi here](https://discord.com/oauth2/authorize?client_id=728694375739162685&permissions=0&scope=bot%20applications.commands)

How to install Andoi on your machine

## Requirements

- [Discord bot token](https://discord.com/developers/applications)
- [Node v14+](https://nodejs.org/)
- [FFmpeg](https://ffmpeg.org/download.html)
- [Mongo URI](https://www.mongodb.com/)

## Api Keys

These api keys are not required for the bot to function. Only required for their desired command.

- [openWeatherMapKey](https://openweathermap.org/)
- [imdbKey](https://www.omdbapi.com/apikey.aspx)
- [mongodbUri](https://www.mongodb.com/cloud/atlas)
- [ListCord](https://listcord.gg)
- [giphyApiKey](https://developers.giphy.com/)

## config

### config.json

`Clone the config.json file for all the config`
**NOTE:** Not all config is provided

## Installation

1. Clone the repo: `git clone https://github.com/tovade/Andoi`
2. Install all dependencies: `npm install`
3. Rename `config.example.json` to `config.json`: `cp config.example.json config.json`
4. Create a bot at [Discord Developers](https://discord.com/developers/applications) and grab the tokens
5. Copy your tokens and paste into `.env` [more info about the .env](#env)
6. Modify `config.json` where needed [more info about config.json](#configjson)
7. Run the bot: `npm start`
   - Using pm2: `pm2 start src/index.js --name ghostybot`

##

[Return to index](README.md)
