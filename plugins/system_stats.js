const Events = require('../events');
const { spawnSync } = require('child_process');
const Config = require('../config');
const axios = require('axios');
const fs = require('fs');
const { _getTime, _getDate } = require('../timezone');
let WType = Config.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('system_stats');


Events.alphaXCMD({
    pattern: `${Config.AM_KEY} ?(.*)`, fromMe : WType, desc: Lang.ALIVE_DESC, deleteCommand: false }, (async(message, match) => {

    var start = new Date()
        .getTime();

    const reactionMessage = {
        react: {
            text: Config.REACT_EMOJI || "✅" ,
            key: message.key
        }
    }

    await message.client.sendMessage(message.jid, reactionMessage);

    var end = new Date()
        .getTime();

    let sender = !message.key.participant ? message.jid : message.key.participant;

    var result = Config.HANDLERS;
    var hdlr = result.replace('^[', '')
        .replace(']', '');
    var HANDLER = hdlr[hdlr.length - 1];

    if (Config.ALIVEMSG == 'default') {

        let status
        try { status = await message.client.fetchStatus(sender) } catch { status = {status: "Cant Get User Status"} }

        const buttons = [
          { index: 1, urlButton: { displayText: 'sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ', url: 'https://chat.whatsapp.com/ItIRSBUMN9t2lQzCpfAKWt'}},
          { index: 2, urlButton: { displayText: 'ᴘʟᴜɢɪɴ ᴄʜᴀɴɴᴇʟ', url: 'https://t.me/AlphaX_plugin'}},
          { index: 3, quickReplyButton: { displayText: '〘 ʙᴏᴛ ɪɴғᴏ 〙', id: HANDLER + "bot-info { ᴀʟᴘʜᴀ }"}},
          { index: 4, quickReplyButton: { displayText: '〘 ʜᴇʟᴘ 〙', id: HANDLER + "help"}},
          { index: 5, quickReplyButton: { displayText: '〘 ᴍᴇɴᴜ 〙', id: HANDLER + Config.CL_KEY}},
        ];

        let wk = Config.WORKTYPE == "private" ? "ᴘʀɪᴠᴀᴛᴇ" : "ᴘᴜʙʟɪᴄ"
        var date = await _getDate(Config.LANG)

        var now_time  = await _getTime(sender.split("@")[0])
        var now_secs  = now_time.split(':')[2]
        var now_mins  = now_time.split(':')[1]
        var now_hours = now_time.split(':')[0]

        var up_time  = Config.WAKE_TIME
        var up_secs  = up_time.split(':')[2]
        var up_mins  = up_time.split(':')[1]
        var up_hours = up_time.split(':')[0]

        var work_hours = now_hours - up_hours
        var work_mins  = now_mins - up_mins
        var work_secs  = now_secs - up_secs

        const work_time = `${work_hours}h ${work_mins}m ${work_secs}s`

    let msg = `╭━━━━━━━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙
│ *「 ${message.pushName} 」*
╰┬────────────┈ ⳹
┌┤
││◦➛ *ᴛɪᴍᴇ:* _${now_time}_
││◦➛ *ᴅᴀᴛᴇ:* _${date}_
││◦➛ *ᴍᴏᴏᴅ:* ${wk}
││◦➛ *ᴘʀᴇғɪx:* _${Config.HANDLERS.split('^[')[1].split(']')[0]}_
││◦➛ *ᴘɪɴɢ:* _${end - start}ms_
││◦➛ *ᴜᴘ-ᴛɪᴍᴇ:* _${work_time.replace(/-/g, '')}_
││
│╰────────────┈ ⳹
│ *© ${message.client.user.name}*
╰━━━━━━━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙
`

        const templatebuttonMessage = {
            text: msg,
            footer: '',
            templateButtons: buttons,
            mentions: [sender]
        };

        await message.client.sendMessage(message.jid, templatebuttonMessage, { quoted: message.data } );

    } else {

        var payload = Config.ALIVEMSG
        let status
        try { status = await message.client.fetchStatus(sender) } catch { status = {status: "Cant Get User Status"} }

        if (payload.includes('{pp}')) {

            let _ppUrl
            try { _ppUrl = await message.client.profilePictureUrl(sender, "image") } catch { _ppUrl = "https://telegra.ph/file/2ed338c25c379fdd3c91b.jpg" }

            const buttons = [{
                buttonId: HANDLER + "bot-info { ᴀʟᴘʜᴀ }",
                buttonText: {
                    displayText: "〘 ʙᴏᴛ ɪɴғᴏ 〙"
                },
                type: 1
            }];

            const buttonMessage = {
                image: {
                    url: _ppUrl
                },
                caption: '‎',
                footer: payload.replace('{version}', Config.VERSION)
                    .replace('{pp}', '')
                    .replace('{name}', message.pushName)
                    .replace('{info}', status.status)
                    .replace('{plugin}', Config.CHANNEL),
                buttons: buttons,
                headerType: 4,
                mentions: [sender, message.client.user.id]
            };

            await message.client.sendMessage(message.jid, buttonMessage, { 
                quoted: message.data 
            });

        } else if (payload.includes('{logo}')) {

            const buttons = [{
                buttonId: HANDLER + "bot-info { ᴀʟᴘʜᴀ }",
                buttonText: {
                    displayText: "〘 ʙᴏᴛ ɪɴғᴏ 〙"
                },
                type: 1
            }];

            const buttonMessage = {
                image: {
                    url: "https://telegra.ph/file/dc8e4edc7230cedbdec2c.jpg"
                },
                caption: '‎',
                footer: payload.replace('{version}', Config.VERSION)
                    .replace('{pp}', '')
                    .replace('{name}', message.pushName)
                    .replace('{info}', status.status)
                    .replace('{plugin}', Config.CHANNEL)
                    .replace('{logo}', ''),
                buttons: buttons,
                headerType: 4,
                mentions: [sender, message.client.user.id]
            };

            await message.client.sendMessage(message.jid, buttonMessage, {
                quoted: message.data
            });

        } else {

            var payload = Config.ALIVEMSG
            const _ppUrl = await message.client.profilePictureUrl(sender, 'image');
            let _alivePic
            try {
                await axios.get(`${Config.A_PIC}`, {
                    responseType: 'arraybuffer'
                });
                _alivePic = Config.A_PIC || "https://telegra.ph/file/dc8e4edc7230cedbdec2c.jpg"
            } catch {
                _alivePic = _ppUrl
            }

            const buttons = [{
                buttonId: HANDLER + "bot-info { ᴀʟᴘʜᴀ }",
                buttonText: {
                    displayText: "〘 ʙᴏᴛ ɪɴғᴏ 〙"
                },
                type: 1
            }];

            const buttonMessage = {
                image: {
                    url: _alivePic
                },
                caption: '‎',
                footer: payload.replace('{version}', Config.VERSION)
                    .replace('{name}', message.pushName)
                    .replace('{info}', status.status)
                    .replace('{plugin}', Config.CHANNEL),
                buttons: buttons,
                headerType: 4,
                mentions: [sender, message.client.user.id]
            };

            await message.client.sendMessage(message.jid, buttonMessage, { 
                quoted: message.data
            });

        }
    }
}));

Events.alphaXCMD({
    pattern: 'bot-info { ᴀʟᴘʜᴀ }$', fromMe: WType, dontAddCommandList: true, deleteCommand: false }, (async(message, match) => {

    const reactionMessage = {
        react: {
            text: Config.REACT_EMOJI || "✅" ,
            key: message.key
        }
    }
    
    await message.client.sendMessage(message.jid, reactionMessage);

let sender = !message.key.participant ? message.jid : message.key.participant;

var time = await _getTime(sender.split("@")[0])

let sysdmsg = `
╭━━━━━━━━━━━━━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙
│  *☇ Hᴇʟʟᴏ @${sender.split('@')[0]} ,*
╰┬───────────────────┈ ⳹
   │ *© ${message.client.user.name}*
┌────────────────────┈ ⳹
│
│ ⌬ *ɢᴇᴛ-ᴍᴇɴᴜ* ⊳ _${Config.CL_KEY}_
│ ⌬ *ʙʀᴀɴᴄʜ* ⊳ _${Config.BRANCH}_
│ ⌬ *ᴠᴇʀꜱɪᴏɴ* ⊳ _${Config.VERSION}_
│ ⌬ *ᴀɪ-ʟɪʟʏ* ⊳ _${Config.AI_LILY}_
│ ⌬ *ᴀɴᴛɪʟɪɴᴋ* ⊳ _${Config.ANTILINK}_
│ ⌬ *ᴀɴᴛɪ-ʙᴀᴅᴡᴏʀᴅ* ⊳ _${Config.BKICK}_
│ ⌬ *ʙʟᴏᴄᴋ-ʟɪɴᴋ* ⊳ _${Config.BLOCKLINK}_
│ ⌬ *ᴀᴜᴛᴏ-ʙɪᴏ* ⊳ _${Config.AUTOBIO}_
│ ⌬ *ᴍᴏᴅᴇ* ⊳ _${Config.WORKTYPE}_
│ ⌬ *ᴘʀᴇғɪx* ⊳ _${Config.HANDLERS}_
│ ⌬ *ʙɢᴍ* ⊳ _${Config.BGM}_
│ ⌬ *sᴇɴᴅ-ʀᴇᴀᴅ* ⊳ _${Config.SEND_READ}_
│
╰─────────────────────┈ ⳹
││ *ᴛɪᴍᴇ: ${time}*
│╰────────────────────┈ ⳹
│ *Ξ ᴅᴇᴘʟᴏʏᴇᴅ ʙʏ ${Config.U_NAME}*
╰━━━━━━━━━━━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙
`
    await message.client.sendMessage(message.jid, {
        text: sysdmsg,
        mentions: [sender, message.client.user.id]
    }, {
        quoted: message.data
    });

}));