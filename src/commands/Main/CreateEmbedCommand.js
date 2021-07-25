const BaseCommand = require('../../utils/structures/BaseCommand');
const discordjs = require('discord.js')
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('createembed', 'Main', ['ce']);
  }

  /**
   * 
   * @param {discordjs.Client} client 
   * @param {discordjs.Message} message 
   * @param {*} args 
   */
  async run(client, message, args) {
    const channel = message.channel;
    const author = message.author;
    
    if (author.id === "182147481252003840" | "495326400149061670") {
      await channel.send(new discordjs.MessageEmbed().setTitle("TEMP")).then(message => {
        message.edit(message.embeds[0].addField("Message ID:", message.id))
      })
    }
  }
}