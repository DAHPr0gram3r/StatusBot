
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();

async function RegisterEmbeds(client) {
  const embeds = require('./Statuses.json')
  if (embeds[0] === undefined | null) return;
  embeds.forEach(async (embed) => {
    let guild = clien
  });
}

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
  
})();

