const BaseEvent = require('../../utils/structures/BaseEvent');
const { RegisterEmbeds } = require('../../utils/utils');
module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
    console.log("Registering Embeds");
    await RegisterEmbeds(client);
  }
}