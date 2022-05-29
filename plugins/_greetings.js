const Events = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const GreetingDB = new JsonDB(new Config('DATABASE/GreetingDB', true, true, '/'));

const Language = require('../language');
const Lang = Language.getString('greetings');

Events.alphaXCMD({
    pattern: 'welcome$', fromMe: true, desc: Lang.WELCOME_DESC }, (async(message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    try {
        var hg = await GreetingDB.getData('/WELCOME/' + message.jid);
    } catch (err) {
        if (err) {
            return await message.client.sendMessage(message.jid, {
                text: Lang.NOT_SET_WELCOME
            }, {
                mentions: [sender]
            });
        };
    };
    await message.client.sendMessage(message.jid, {
        text: Lang.WELCOME_ALREADY_SETTED + hg + '```'
    }, {
        mentions: [sender]
    });

}));

Events.alphaXCMD({
    pattern: 'welcome (.*)', fromMe: true, dontAddCommandList: true }, (async(message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    if (match[1] === '') {
        return await message.client.sendMessage(message.jid, {
            text: Lang.NEED_WELCOME_TEXT
        }, {
            mentions: [sender]
        });
    } else {
        if (match[1] === 'delete') {
            await message.client.sendMessage(message.jid, {
                text: Lang.WELCOME_DELETED
            }, {
                mentions: [sender]
            });
            return await GreetingDB.delete("/WELCOME/" + message.jid);
        }
        await GreetingDB.push("/WELCOME", {
            [message.jid]: match[1].replace(/#/g, '\n')
        }, false);

        return await message.client.sendMessage(message.jid, {
            text: Lang.WELCOME_SETTED
        }, {
            mentions: [sender]
        });
    };
}));

Events.alphaXCMD({
    pattern: 'goodbye$', fromMe: true, desc: Lang.GOODBYE_DESC }, (async(message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    try {
        var hg = await GreetingDB.getData('/GOODBYE/' + message.jid);
    } catch (err) {
        if (err) {
            return await message.client.sendMessage(message.jid, {
                text: Lang.NOT_SET_GOODBYE
            }, {
                mentions: [sender]
            });
        };
    };

    await message.client.sendMessage(message.jid, {
        text: Lang.GOODBYE_ALREADY_SETTED + hg + '```'
    }, {
        mentions: [sender]
    });

}));

Events.alphaXCMD({
    pattern: 'goodbye (.*)', fromMe: true, dontAddCommandList: true }, (async(message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    if (match[1] === '') {
        return await message.client.sendMessage(message.jid, {
            text: Lang.NEED_GOODBYE_TEXT
        }, {
            mentions: [sender]
        });
    } else {
        if (match[1] === 'delete') {
            await message.client.sendMessage(message.jid, {
                text: Lang.GOODBYE_DELETED
            }, {
                mentions: [sender]
            });
            return await GreetingDB.delete("/GOODBYE/" + message.jid);
        }
        await GreetingDB.push("/GOODBYE", {
            [message.jid]: match[1].replace(/#/g, '\n')
        }, false);
        return await message.client.sendMessage(message.jid, {
            text: Lang.GOODBYE_SETTED
        }, {
            mentions: [sender]
        })
    };
}));