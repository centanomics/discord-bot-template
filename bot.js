// setups .env files with tokens
require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;

// Sets up express server for hosting reasons
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => {
  console.log(`Bot Template listening at http://localhost:${port}`);
});

// Start Bot Code

const Discord = require('discord.js');
const connectDB = require('./config/db');

const intents = [
  'GUILDS',
  'GUILD_MEMBERS',
  'GUILD_BANS',
  'GUILD_INVITES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS',
];
const client = new Discord.Client({
  intents: intents,
  ws: { intents: intents },
});

// connects to database
connectDB();

const glob = require('glob');
const path = require('path');

// creates a collection of commands and events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

(async function registerEvents(dir = 'commands') {
  await glob(path.join(__dirname, dir, '**/*.js'), (err, cmdFiles) => {
    for (let file of cmdFiles) {
      let cmdName = file.substring(
        file.lastIndexOf('/') + 1,
        file.indexOf('.js')
      );
      let cmdModule = require(path.join(file));
      client.commands.set(cmdName, cmdModule);
    }
  });
})();

(async function registerEvents(dir = 'events') {
  await glob(path.join(__dirname, dir, '**/*.js'), (err, eventFiles) => {
    for (let file of eventFiles) {
      let evtName = file.substring(
        file.lastIndexOf('/') + 1,
        file.indexOf('.js')
      );
      let evtModule = require(path.join(file));
      client.events.set(evtName, evtModule);

      // creates event listener for each of the event files
      client.on(evtName, evtModule.bind(null, client));
    }
  });
})();

//login
client.login(process.env.DISCORD_BOT_TOKEN);
