const { Client, Message, MessageEmbed } = require('discord.js');
const GameDig = require('gamedig');

/**
 * @param {Client} client
 * @param {Message} message
 * @param {Object} statusInfo
 */
 function updateStatus(client, message, statusInfo) { 
    if (message === undefined | null) return console.log("Message Not Found");
    if (message.author !== client.user) return console.log("Ensure the message was sent by this bot");
    if (message.embeds[0] === undefined | null) return console.log("Ensure the Message has an embed");
    if (statusInfo.UseCustomPort) {
        GameDig.query({
            "host": statusInfo.ServerHost,
            "port": statusInfo.ServerPort,
            "type": statusInfo.ServerType
        }).then(async (query) => {
            await message.edit(new MessageEmbed()
                .setTitle(`${statusInfo.ServerName}`)
                .setThumbnail(statusInfo.ServerImage)
                .setColor('GREEN')
                .addFields([
                    {
                        "name": "Players:",
                        "value": `${query.players.length}/${query.maxplayers}`,
                        "inline": true
                    },
                    {
                        "name": "Ping:",
                        "value": `${query.ping}`,
                        "inline": true
                    },
                    {
                        "name": "Map:",
                        "value": `${query.map}`,
                        "inline": true
                    }
                ])
            )
        }).catch(async (error) => {
            await message.edit(new MessageEmbed()
                .setTitle(`${statusInfo.ServerName}`)
                .setThumbnail(statusInfo.ServerImage)
                .setColor('RED')
                .addFields([
                    {
                        "name": "Uh Oh",
                        "value": "The server is currently down :(",
                        "inline": false
                    }
                ])
            )
            console.log(`Query Error: ${error}`);
        });
    } else {
        GameDig.query({
            "host": statusInfo.ServerHost,
            "type": statusInfo.ServerType
        }).then(async (query) => {
            await message.edit(new MessageEmbed()
                .setTitle(`${statusInfo.ServerName}`)
                .setThumbnail(statusInfo.ServerImage)
                .setColor('GREEN')
                .addFields([
                    {
                        "name": "Players:",
                        "value": `${query.players.length}/${query.maxplayers}`,
                        "inline": true
                    },
                    {
                        "name": "Ping:",
                        "value": `${query.ping}`,
                        "inline": true
                    },
                    {
                        "name": "Map:",
                        "value": `${query.map}`,
                        "inline": false
                    }
                ])
            )
        }).catch(async (error) => {
            await message.edit(new MessageEmbed()
                .setTitle(`${statusInfo.ServerName}`)
                .setThumbnail(statusInfo.ServerImage)
                .setColor('RED')
                .addFields([
                    {
                        "name": "Uh Oh",
                        "value": "The server is currently down :(",
                        "inline": false
                    }
                ])
            )
            console.log(`Query Error: ${error}`);
        });
    }
    
}

/**
 * 
 * @param {Client} client 
 */
async function RegisterEmbeds(client) {
    const statuses = require('../Statuses.json')
    if (statuses[0] === undefined | null) return console.log("Ensure to fill out the Statuses.json");
    statuses.forEach(async (statusInfo) => {
        await RegisterEmbed(client, statusInfo);
    });
}
/**
 * 
 * @param {Client} client 
 * @param {Object} statusInfo 
 */
async function RegisterEmbed(client, statusInfo) {
    let guild = await client.guilds.fetch(statusInfo.GuildID);
    if (!guild.available) {
        console.log(`Guild: ${statusInfo.GuildID} is not available yet retrying in 5 seconds`);
        setTimeout(RegisterEmbed(client, statusInfo), 5000);
    } else {
        let channel = await guild.channels.resolve(statusInfo.ChannelID).fetch();
        if (!channel.isText()) return console.log("Ensure to only provide ID's of text channels");
        let message = await channel.messages.fetch(statusInfo.MessageID);
        updateStatus(client, message, statusInfo);
        setInterval(() => {
            updateStatus(client, message, statusInfo)
        }, 15000);
    }   
}



module.exports = {RegisterEmbeds};
