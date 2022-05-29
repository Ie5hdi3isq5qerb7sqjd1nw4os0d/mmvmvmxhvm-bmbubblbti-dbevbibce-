const Events = require('../events');
const fs = require('fs');

Events.alphaXCMD({ pattern: 'fake ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false }, async(message, match) => {

    let sendr = match[1].split(' - ')[0];
    let reply = match[1].split(' - ')[1].split(' | ')[0];
    let msg   = match[1].split(' | ')[1].split(' > ')[0];
    let jid   = match[1].split(' > ')[1];

    await message.client.sendMessage(jid, { text: msg, contextInfo: {"participant":sendr,"quotedMessage":{"conversation":reply}} });

});

Events.alphaXCMD({ pattern: 'test ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false }, async(message, match) => {

    await message.client.sendMessage(message.jid, { text: "Alpha-X-MD-Bot-Test", contextInfo: { participant: "0@s.whatsapp.net" } })

});