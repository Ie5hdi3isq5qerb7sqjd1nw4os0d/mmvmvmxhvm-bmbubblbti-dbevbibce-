const Events = require('../events');
const Config = require('../config');
const fs = require('fs');
const axios = require('axios');
const Language = require('../language');
const Lang = Language.getString('web');
const SLang = Language.getString('webss');
let WType = Config.WORKTYPE == 'public' ? false : true

Events.alphaXCMD({
    pattern: 'ping$', fromMe: WType, deleteCommand: false, desc: Lang.PING_DESC }, (async(message, match) => {

    var start = new Date()
        .getTime();

    const reactionMessage = {
        react: {
            text: Config.REACT_EMOJI || "✅",
            key: message.key
        }
    }

    await message.client.sendMessage(message.jid, reactionMessage);

    var end = new Date()
        .getTime();

    try { ppUrl = await message.client.profilePictureUrl(msg.key.participant, "image") } catch { ppUrl = await message.client.profilePictureUrl(message.jid, "image") };
    var thumb = await axios.get(ppUrl, { responseType: "arrayuffer"})

    var msg = await message.sendMessage(message.jid, {
        text: Config.C_EMOJI + " *ᴘɪɴɢ ❝ " + (end - start) + "ms ❞*",
        contextInfo: {"participant":message.key.participant || message.jid,"quotedMessage":{"imageMessage":{"url":"https://mmg.whatsapp.net/d/f/AlMLU4VSXTirKgfZCAekFzJWU6rXIcMmkMmkyNvjGdu1.enc","mimetype":"image/jpeg","caption":`@${message.pushName}`,"fileSha256":"aAVuUMPqB2qfI7SR/sImFQfIrvt+kMo7xjAWcPj6o5k=","fileLength":"870332","height":1280,"width":1280,"mediaKey":"VGtldXf0z72d3XNODW+v+5FeHphCqjFopITk46Xruog=","fileEncSha256":"wxkTbGbCHxhhre3zqD2iHdnU6xgpABiailAMMjb62LE=","directPath":"/v/t62.7118-24/31805084_418325323632840_6280442671734299379_n.enc?ccb=11-4&oh=01_AVyE6kq6wFTIO8EMvCXbqSoLLwhhuKik_IrQ5t8Igz7Cjg&oe=62B2F811","mediaKeyTimestamp":"1653381390","jpegThumbnail":Buffer.from(thumb.data)}}}
    });

}));