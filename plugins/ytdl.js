const Events = require('../events');
const Config = require('../config');
const axios = require('axios');
const { ytv, yta } = require('../alphaX/y2mate');
const yt_search = require('yt-search');

const Language = require('../language');
const Lang = Language.getString('scrapers');
let WType = Config.WORKTYPE == 'public' ? false : true

async function _getVidInfo(name) {
    let get = await yt_search(name);
    let output = get.all[0] ? get.all[0] : null

    return output;
}

    var result = Config.HANDLERS;
    var hdlr = result.replace('^[','').replace(']','');
    var HANDLER = hdlr[hdlr.length = 0];

/* Select Video Quality >> */
Events.alphaXCMD({
    pattern: 'video ?(.*)', fromMe: WType, desc: Lang.VIDEO_DESC, deleteCommand: false }, (async (message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    let link;
    if (!match[1] && !message.reply_message.text) {
    link = null
    } else if (!match[1] && message.reply_message.text) {
    link = message.reply_message.text
    } else {
    link = match[1]
    };

    if (!link) return await message.client.sendMessage(message.jid, { text: Lang.NEED_VIDEO.split('!')[0] + ' or name!*' }, { quoted: message.data })

    const _vidData = await _getVidInfo(link);

    if (!_vidData.url) return await message.client.sendMessage(message.jid, { text: Lang.NO_RESULT }, { quoted: message.data })
    if (!_vidData.type == 'video') return await message.client.sendMessage(message.jid, { text: Lang.NO_RESULT }, { quoted: message.data })

    const reactionMessage = {
        react: {
            text: "🔎" ,
            key: message.key
        }
    }
    
    await message.client.sendMessage(message.jid, reactionMessage);

    try {
    var url     = _vidData.url
    var title   = _vidData.title
    var desc    = _vidData.description
    var time    = _vidData.timestamp
    var author  = _vidData.author.name
    var views   = _vidData.views
    var ago     = _vidData.ago
    var thumb   = _vidData.thumbnail
    
    let msg = `*🎥 ᴛɪᴛʟᴇ:* _${title}_
*⌬ ᴀᴜᴛʜᴏʀ:* _${author}_
*⌬ ᴅᴜʀᴀᴛɪᴏɴ:* _${time}_
*⌬ ᴠɪᴇᴡs:* _${views}_
*⌬ ᴀɢᴏ:* _${ago}_
*⌬ ᴅᴇsᴄ:* _${desc}_`

        const buttons = [{
            buttonId: HANDLER + "axd-videoDl --url=" + url + " --q=720p",
            buttonText: {
                displayText: "﹝720ᴘ﹞"
            },
            type: 1
        }, {
            buttonId: HANDLER + "axd-videoDl --url=" + url + " --q=360p",
            buttonText: {
                displayText: "﹝360ᴘ﹞"
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
            await message.client.sendMessage(message.jid, { text: Lang.NO_RESULT }, { quoted: message.data });
        }

}));

/* Select File Type */
Events.alphaXCMD({
    pattern: 'axd-videoDl --url= ?(.*)', fromMe: WType, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

    const reactionMessage = {
        react: {
            text: "🔄" ,
            key: message.key
        }
    }

    let sender = !message.key.participant ? message.jid : message.key.participant;

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

    const dl_data = await ytv(url, quality);

let msg = `*⌬ ᴛɪᴛʟᴇ:* _${dl_data.title}_
*⌬ ǫᴜᴀʟɪᴛʏ:* _${quality}_
*⌬ sɪᴢᴇ:* _${dl_data.filesizeF}_`

    const templateButtons = [
        { index: 1, urlButton: { displayText: 'ᴡᴀᴛᴄʜ ɪᴛ ᴏɴ ʏᴏᴜᴛᴜʙᴇ', url: url }},
        { index: 2, urlButton: { displayText: 'ᴅᴏᴡɴʟᴏᴀᴅ ᴅɪʀᴇᴄᴛʟʏ', url: dl_data.dl_link }},
        { index: 3, quickReplyButton: { displayText: '﹝🎥﹞ᴠɪᴅᴇᴏ', id: HANDLER + 'axd-videoDl --type=vid' + ' --url=' + url + ' --q=' + quality }},
        { index: 4, quickReplyButton: { displayText: '﹝💾﹞ᴅᴏᴄᴜᴍᴇɴᴛ', id: HANDLER + 'axd-videoDl --type=doc' + ' --url=' + url + ' --q=' + quality }}
    ];

    const buttonMessage = {
        text: msg,
        footer: 'sᴇʟᴇᴄᴛ ғɪʟᴇ ᴛʏᴘᴇ:',
        templateButtons: templateButtons,
        image: { url: dl_data.thumb, jpegThumbnail: { url : dl_data.thumb } },
        mentions: [sender]
    }

    await message.client.sendMessage(message.jid, buttonMessage, { quoted: message.data} );

}));

/* Upload Video */
Events.alphaXCMD({
    pattern: 'axd-videoDl --type= ?(.*)', fromMe: WType, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

    const reactionMessage = {
        react: {
            text: "⬇️" ,
            key: message.key
        }
    }
    
    await message.client.sendMessage(message.jid, reactionMessage);

    let type
    let url
    let quality
    try {
        type    = match[1].split(' --url=')[0];
        url     = match[1].split(' --url=')[1].split(' --q=')[0];
        quality = match[1].split(' --q=')[1];
    } catch {
        var err = true
    };

    if (err) return await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴄᴀɴ'ᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇᴅɪᴀ ᴡɪᴛʜᴏᴜᴛ ᴄᴏʀʀᴇᴄᴛ ɪɴғᴏ.*" }, { quoted: message.data })

    const media = await ytv(url, quality);
    if (!media.filesizeF) return await message.client.sendMessage(message.jid, { text: "*👀 sᴏʀʀʏ ᴛʜɪs ǫᴜᴀʟɪᴛɪ ɪs ɴᴏᴛ ᴀᴠᴀʟᴀʙʟᴇ ɪɴ ᴛʜɪs ᴠɪᴅᴇᴏ.*" }, { quoted: message.data });
    if (media.filesize >= 100000) return await message.client.sendMessage(message.jid, { text: "*⚠️️ ғɪʟᴇ sɪᴢᴇ ɪs ᴛᴏᴏ ʟᴀʀɢᴇ ᴛᴏ ᴜᴘʟᴏᴀᴅ.*" }, { quoted: message.data });

    if ( type == 'vid' ) {
        try {
            await message.client.sendMessage(message.jid, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, jpegThumbnail: { url: media.thumb }, caption: `*⌬ ᴛɪᴛʟᴇ:* _${media.title}_` }, { quoted: message.data });
        } catch {
            await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.*" }, { quoted: message.data });
        }
    } else if ( type == 'doc' ) {
        try {
            await message.client.sendMessage(message.jid, { document: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, jpegThumbnail: { url: media.thumb }, caption: `*⌬ ᴛɪᴛʟᴇ:* _${media.title}_` }, { quoted: message.data });
        } catch {
            await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.*" }, { quoted: message.data });
        }
    }

}));

// ============================ END YT VIDEO DOWNLOADER ================================= 

/* Select Song Type >> */
Events.alphaXCMD({
    pattern: 'song ?(.*)', fromMe: WType, desc: Lang.SONG_DESC, deleteCommand: false }, (async (message, match) => {

    let sender = !message.key.participant ? message.jid : message.key.participant;

    let link;
    if (!match[1] && !message.reply_message.text) {
    link = null
    } else if (!match[1] && message.reply_message.text) {
    link = message.reply_message.text
    } else {
    link = match[1]
    };

    if (!link) return await message.client.sendMessage(message.jid, { text: "*⚠️️ ɴᴇᴇᴅ sᴏɴɢ ɴᴀᴍᴇ!*\n_ᴇx: " + HANDLER + "song faded_" }, { quoted: message.data })

    const _vidData = await _getVidInfo(link);

    if (!_vidData.url) return await message.client.sendMessage(message.jid, { text: Lang.NO_RESULT }, { quoted: message.data })
    if (!_vidData.type == 'video') return await message.client.sendMessage(message.jid, { text: Lang.NO_RESULT }, { quoted: message.data })

    const reactionMessage = {
        react: {
            text: "🔎" ,
            key: message.key
        }
    }
    
    await message.client.sendMessage(message.jid, reactionMessage);

    try {
    var dlData  = await yta(_vidData.url, "128kbps")
    var size    = dlData.filesizeF
    var url     = _vidData.url
    var title   = _vidData.title
    var desc    = _vidData.description
    var time    = _vidData.timestamp
    var author  = _vidData.author.name
    var views   = _vidData.views
    var ago     = _vidData.ago
    var thumb   = _vidData.thumbnail
    
    let msg = `*🎥 ᴛɪᴛʟᴇ:* _${title}_
*⌬ ᴀᴜᴛʜᴏʀ:* _${author}_
*⌬ ᴅᴜʀᴀᴛɪᴏɴ:* _${time}_
*⌬ sɪᴢᴇ:* _${size}_
*⌬ ǫᴜᴀʟɪᴛʏ:* _128kbps_
*⌬ ᴠɪᴇᴡs:* _${views}_
*⌬ ᴀɢᴏ:* _${ago}_
*⌬ ᴅᴇsᴄ:* _${desc}_`

        const buttons = [{
            buttonId: HANDLER + "axd-songDl --url=" + url + " --type=song",
            buttonText: {
                displayText: "﹝🎧﹞ᴀᴜᴅɪᴏ"
            },
            type: 1
        }, {
            buttonId: HANDLER + "axd-songDl --url=" + url + " --type=doc",
            buttonText: {
                displayText: "﹝💾﹞ᴅᴏᴄᴜᴍᴇɴᴛ"
            },
            type: 1
        }];

        const buttonMessage = {
            image: { url: thumb, jpegThumbnail: { url: thumb } },
            caption: msg,
            footer: 'sᴇʟᴇᴄᴛ sᴏɴɢ ᴛʏᴘᴇ:',
            buttons: buttons,
            headerType: 4,
            mentions: [sender, message.client.user.id]
        };

        await message.client.sendMessage(message.jid, buttonMessage, { 
            quoted: message.data 
        });
        } catch {
            await message.client.sendMessage(message.jid, { text: Lang.NO_RESULT }, { quoted: message.data });
        }

}));

/* Upload Song */
Events.alphaXCMD({
    pattern: 'axd-songDl --url= ?(.*)', fromMe: WType, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

    const reactionMessage = {
        react: {
            text: "⬇️" ,
            key: message.key
        }
    }
    
    await message.client.sendMessage(message.jid, reactionMessage);

    let url
    let type
    try {
        url  = match[1]
        type = match[1].split(' --type=')[1]
    } catch {
        var err = true
    };

    if (err) return await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴄᴀɴ'ᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇᴅɪᴀ ᴡɪᴛʜᴏᴜᴛ ᴄᴏʀʀᴇᴄᴛ ɪɴғᴏ.*" }, { quoted: message.data })

    const media = await yta(url, "128kbps");
    if (!media.filesizeF) return await message.client.sendMessage(message.jid, { text: "*👀 sᴏʀʀʏ ᴛʜɪs ǫᴜᴀʟɪᴛɪ ɪs ɴᴏᴛ ᴀᴠᴀʟᴀʙʟᴇ ɪɴ ᴛʜɪs ᴠɪᴅᴇᴏ.*" }, { quoted: message.data });
    if (media.filesize >= 100000) return await message.client.sendMessage(message.jid, { text: "*⚠️️ ғɪʟᴇ sɪᴢᴇ ɪs ᴛᴏᴏ ʟᴀʀɢᴇ ᴛᴏ ᴜᴘʟᴏᴀᴅ.*" }, { quoted: message.data });

    if ( type == 'song' ) {
        try {
            await message.client.sendMessage(message.jid, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3`}, { quoted: message.data });
        } catch {
            await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.*" }, { quoted: message.data });
        }
    } else if ( type == 'doc' ) {
        try {
            await message.client.sendMessage(message.jid, { document: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp4`}, { quoted: message.data });
        } catch {
            await message.client.sendMessage(message.jid, { text: "*﹝❌﹞ ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.*" }, { quoted: message.data });
        }
    }

}));