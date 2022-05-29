const Events = require('../events');
const Config = require('../config');
const api = require('xfarr-api');
let WType = Config.WORKTYPE == 'public' ? false : true

    var result = Config.HANDLERS;
    var hdlr = result.replace('^[','').replace(']','');
    var HANDLER = hdlr[hdlr.length = 0];

let fbdl_desc = Config.LANG == "SI" ? "Facebook හි වීඩියෝ බාගත කර ගැනීමට." : "Download videos from Facebook"

Events.alphaXCMD({
    pattern: 'fb ?(.*)', fromMe: WType, desc: fbdl_desc, deleteCommand: false }, (async(message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    let link;
    if (!match[1] && !message.reply_message.text) {
    link = null
    } else if (!match[1] && message.reply_message.text) {
    link = message.reply_message.text
    } else {
    link = match[1]
    };

    if (!link) return await message.client.sendMessage(message.jid, { text: "*〘🔎〙ɴᴇᴇᴅ ғʙ ᴠɪᴅᴇᴏ ʟɪɴᴋ!*" }, { quoted: message.data });

    const _fbdl = await api.Facebook(link);

    if (!_fbdl.status == 200) return await message.client.sendMessage(message.jid, { text: "*:( ᴄᴀɴᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇᴅᴇᴀ ɴᴏᴡ, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.*" }, { quoted: message.data });
    if (_fbdl.error) return await message.client.sendMessage(message.jid, { text: `*『❌』Eʀʀᴏʀ:* _${_fbdl.error}_` }, { quoted: message.data });

    const reactionMessage = {
        react: {
            text: "🔎",
            key: message.key
        }
    }

    await message.client.sendMessage(message.jid, reactionMessage);

    try {
    var thumb = _fbdl.thumbnail
    var title = _fbdl.title
    var url   = _fbdl.url

    let msg = `*⌯ ᴛɪᴛʟᴇ:* _${title}_
*⌯ ᴜʀʟ:* _${url}_`

        const buttons = [{
            buttonId: HANDLER + "axd-fbDl --url=" + url + " --q=HD",
            buttonText: {
                displayText: "﹝ʜᴅ ǫᴜᴀʟɪᴛʏ﹞"
            },
            type: 1
        }, {
            buttonId: HANDLER + "axd-fbDl --url=" + url + " --q=SD",
            buttonText: {
                displayText: "﹝sᴅ ǫᴜᴀʟɪᴛʏ﹞"
            },
            type: 1
        }];

        const buttonMessage = {
            image: { url: thumb, jpegThumbnail: { url: thumb } },
            caption: msg,
            footer: 'sᴇʟᴇᴄᴛ ᴠɪᴅᴇᴏ ǫᴜᴀʟɪᴛʏ:',
            buttons: buttons,
            headerType: 4,
            mentions: [sender, message.client.user.id]
        };

        await message.client.sendMessage(message.jid, buttonMessage, { 
            quoted: message.data 
        });
        } catch {
            await message.client.sendMessage(message.jid, { text: "*〈✖️〉ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ*" }, { quoted: message.data });
        }

}));

Events.alphaXCMD({
    pattern: 'axd-fbDl --url= ?(.*)', fromMe: WType, dontAddCommandList: true, deleteCommand: false }, (async(message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    const reactionMessage = {
        react: {
            text: "🔄",
            key: message.key
        }
    }

    let url
    let quality
    try {
        url     = match[1].split(' --q=')[0];
        quality = match[1].split(' --q=')[1];
    } catch {
        var err = true 
    };

    if (err) return await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴄᴀɴ'ᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇᴅɪᴀ ᴡɪᴛʜᴏᴜᴛ ᴄᴏʀʀᴇᴄᴛ ɪɴғᴏ.*" }, { quoted: message.data })

    await message.client.sendMessage(message.jid, reactionMessage);

    var fbdl  = await api.Facebook(url);

    if ( quality == "HD" && !fbdl.medias[1] || quality == "SD" && !fbdl.medias[0] ) return await message.client.sendMessage(message.jid, { text: "*👀 sᴏʀʀʏ ᴛʜɪs ǫᴜᴀʟɪᴛɪ ɪs ɴᴏᴛ ᴀᴠᴀʟᴀʙʟᴇ ɪɴ ᴛʜɪs ᴠɪᴅᴇᴏ.*" }, { quoted: message.data });

    try {
    let title = fbdl.title
    let d_url = quality == "HD" && fbdl.medias[1] ? fbdl.medias[1].url : fbdl.medias[0].url
    let size  = quality == "HD" && fbdl.medias[1] ? fbdl.medias[1].formattedSize : fbdl.medias[0].formattedSize
    let thumb = fbdl.thumbnail

    let msg = `*⌬ ᴛɪᴛʟᴇ:* _${title}_
*⌬ ǫᴜᴀʟɪᴛʏ:* _${quality}_
*⌬ sɪᴢᴇ:* _${size}_
*⌬ ᴜʀʟ:* _${url}_`

    const templateButtons = [
        { index: 1, urlButton: { displayText: 'ᴡᴀᴛᴄʜ ɪᴛ ᴏɴ ғᴀᴄᴇʙᴏᴏᴋ', url: url }},
        { index: 2, urlButton: { displayText: 'ᴅᴏᴡɴʟᴏᴀᴅ ᴅɪʀᴇᴄᴛʟʏ', url: d_url }},
        { index: 3, quickReplyButton: { displayText: '﹝🎥﹞ᴠɪᴅᴇᴏ', id: HANDLER + 'axd-fbDl --type=vid' + ' --url=' + url + ' --q=' + quality }},
        { index: 4, quickReplyButton: { displayText: '﹝💾﹞ᴅᴏᴄᴜᴍᴇɴᴛ', id: HANDLER + 'axd-fbDl --type=doc' + ' --url=' + url + ' --q=' + quality }}
    ];

    const buttonMessage = {
        text: msg,
        footer: 'sᴇʟᴇᴄᴛ ғɪʟᴇ ᴛʏᴘᴇ:',
        templateButtons: templateButtons,
        image: { url: thumb, jpegThumbnail: { url : thumb } },
        mentions: [sender]
    }

    await message.client.sendMessage(message.jid, buttonMessage, { quoted: message.data} );
    } catch {
            await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴄᴀɴ'ᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇᴅɪᴀ ᴡɪᴛʜᴏᴜᴛ ᴄᴏʀʀᴇᴄᴛ ɪɴғᴏ.*" }, { quoted: message.data })
    }

}));

Events.alphaXCMD({
    pattern: 'axd-fbDl --type= ?(.*)', fromMe: WType, dontAddCommandList: true, deleteCommand: false }, (async(message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    const reactionMessage = {
        react: {
            text: "⬇️",
            key: message.key
        }
    }

    let url
    let quality
    let type
    try {
        url     = match[1].split(' --url=')[1].split(' --q=')[0];
        quality = match[1].split(' --q=')[1];
        type    = match[1].split(' --url=')[0];
    } catch {
        var err = true 
    };

    if (err) return await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴄᴀɴ'ᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇᴅɪᴀ ᴡɪᴛʜᴏᴜᴛ ᴄᴏʀʀᴇᴄᴛ ɪɴғᴏ.*" }, { quoted: message.data })

    await message.client.sendMessage(message.jid, reactionMessage);

    var fbdl    = await api.Facebook(url);
    let dl_link = quality == "HD" && fbdl.medias[1] ? fbdl.medias[1].url : fbdl.medias[0].url;

    if ( type == 'vid' ) {
        try {
            await message.client.sendMessage(message.jid, { video: { url: dl_link }, mimetype: 'video/mp4', fileName: `${fbdl.title}.mp4`, jpegThumbnail: { url: fbdl.thumbnail }, caption: `*⌬ ᴛɪᴛʟᴇ:* _${fbdl.title}_` }, { quoted: message.data });
        } catch {
            await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.*" }, { quoted: message.data });
        }
    } else if ( type == 'doc' ) {
        try {
            await message.client.sendMessage(message.jid, { document: { url: dl_link }, mimetype: 'video/mp4', fileName: `${fbdl.title}.mp4`, jpegThumbnail: { url: fbdl.thumbnail }, caption: `*⌬ ᴛɪᴛʟᴇ:* _${fbdl.title}_` }, { quoted: message.data });
        } catch {
            await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.*" }, { quoted: message.data });
        }
    }

}));