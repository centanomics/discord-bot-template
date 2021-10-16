// setups .env files with tokens
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

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

// creates a collection of commands and events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
