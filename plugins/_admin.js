const Events = require('../events');
const Config = require('../config');
const axios = require('axios');
const fs = require('fs');
const Language = require('../language');
const Lang = Language.getString('admin');
const mut = Language.getString('mute');
let WType = Config.WORKTYPE == 'public' ? false : true

// ===================== functions ==================

async function checkImAdmin(jid, message, user) {

    var grup = await message.client.groupMetadata(jid);
    var sonuc = grup['participants'].map((member) => {

        if (member.id.split("@")[0] == user.split("@")[0] && member.id == 'admin' || 'superadmin') return true; else; return false;

    });

    return sonuc.includes(true)

}

// ======================== end functions ===================

Events.alphaXCMD({
    pattern: 'admin$', fromMe: WType, desc: "Admin Menu." }, (async(message, match) => {

    const reactionMessage = {
        react: {
            text: Config.REACT_EMOJI || "✅" ,
            key: message.key
        }
    }
    
    await message.client.sendMessage(message.jid, reactionMessage);

    var result = Config.HANDLERS;
    var hdlr = result.replace('^[', '').replace(']', '');
    var HANDLER = hdlr[hdlr.length = 0];

    let row1 = [{
        title: Config.C_EMOJI + ' ᴄᴏᴍᴍᴀɴᴅ: ' + HANDLER + 'ban',
        description: "🛡️ ʀᴇᴍᴏᴠᴇ ᴘᴇʀsᴏɴ ғʀᴏᴍ ɢʀᴏᴜᴘ.\n",
        rowId: HANDLER + "alpha-x-bot-admin-menu"
    }, {
        title: Config.C_EMOJI + ' ᴄᴏᴍᴍᴀɴᴅ: ' + HANDLER + 'add',
        description: "🔎 ᴀᴅᴅ ᴜsᴇʀ ᴛᴏ ɢʀᴏᴜᴘ.\n",
        rowId: HANDLER + "alpha-x-bot-admin-menu"
    }, {
        title: Config.C_EMOJI + ' ᴄᴏᴍᴍᴀɴᴅ: ' + HANDLER + 'gname',
        description: "🎲 ᴄʜᴀɴɢᴇ ɢʀᴏᴜᴘ ɴᴀᴍᴇ.\n",
        rowId: HANDLER + "alpha-x-bot-admin-menu"
    }, {
        title: Config.C_EMOJI + ' ᴄᴏᴍᴍᴀɴᴅ: ' + HANDLER + 'gdesc',
        description: "📣 ᴄʜᴀɴɢᴇ ɢʀᴏᴜᴘ ᴅɪsᴄʀɪᴘᴛɪᴏɴ.\n",
        rowId: HANDLER + "alpha-x-bot-admin-menu"
    }, {
        title: Config.C_EMOJI + ' ᴄᴏᴍᴍᴀɴᴅ: ' + HANDLER + 'gpp',
        description: "🌉 ᴄʜᴀɴɢᴇ ɢʀᴏᴜᴘ ᴘᴘ.\n",
        rowId: HANDLER + "alpha-x-bot-admin-menu"
    }, {
        title: Config.C_EMOJI + ' ᴄᴏᴍᴍᴀɴᴅ: ' + HANDLER + 'promote',
        description: "🔥 ᴍᴀᴋᴇ sᴏᴍᴇᴏɴᴇ ᴀᴅᴍɪɴ.\n",
        rowId: HANDLER + "alpha-x-bot-admin-menu"
    }, {
        title: Config.C_EMOJI + ' ᴄᴏᴍᴍᴀɴᴅ: ' + HANDLER + 'demote',
        description: "🛑 ᴅᴇᴍᴏᴛᴇ ᴜsᴇʀ.\n",
        rowId: HANDLER + "alpha-x-bot-admin-menu"
    }];

    let row2 = [{
        title: "✅ ᴛᴜʀɴ ᴏɴ ᴅɪsᴀᴘᴘᴇᴀʀɪɴɢ ᴍᴇssᴀɢᴇ.",
        description: "",
        rowId: HANDLER + "dis on"
    }, {
        title: "✔️ ᴛᴜʀɴ ᴏғғ ᴅɪsᴀᴘᴘᴇᴀʀɪɴɢ ᴍᴇssᴀɢᴇ.",
        description: "",
        rowId: HANDLER + "dis off"
    }, {
        title: "🔕 ᴍᴜᴛᴇ ᴛʜᴇ ɢʀᴏᴜᴘ.",
        description: "",
        rowId: HANDLER + "mute"
    }, {
        title: "🔊 ᴜɴᴍᴜᴛᴇ ɢʀᴏᴜᴘ.",
        description: "",
        rowId: HANDLER + "unmute"
    }, {
        title: "🌏 ɢᴇᴛ ɢʀᴏᴜᴘ ᴀʟʟ ɪɴғᴏ.",
        description: "",
        rowId: HANDLER + "details"
    }, {
        title: "🧩 ʀᴇsᴇᴛ ɢʀᴏᴜᴘ ɪɴᴠɪᴛᴇ ᴄᴏᴅᴇ.",
        description: "",
        rowId: HANDLER + "reset"
    }, {
        title: "👨‍💻 ɢᴇᴛ ɢʀᴏᴜᴘ ɪɴᴠɪᴛᴇ.",
        description: "",
        rowId: HANDLER + "invite"
    }, {
        title: "⚠️ sᴇɴᴅ ᴀɴᴛɪsᴘᴀᴍ.",
        description: "",
        rowId: HANDLER + "aspm"
    }];

    const sections = [{
        title: "</>=== ๛ Admin Commands [manual] 🤹️ ===</>",
        rows: row1
    }, {
        title: "</>==== ๛ Admin Commands [auto] 👥 ====</>",
        rows: row2
    }];

    let user = message.key.participant ? message.key.participant : message.jid;

    const listMessage = {
        text: "*ᴀᴅᴍɪɴ ᴍᴇɴᴜ 🤹️*",
        footer: "ᴄʟɪᴄᴋ ᴛʜᴇ ʙᴜᴛᴛᴏɴ ʙᴇʟᴏᴡ:",
        title:`*Hᴇʟʟᴏ @${user.split("@")[0]} 👋*`,
        buttonText: "❝ ᴏᴘᴛɪᴏɴs ❞",
        sections: sections,
        mentions: [user]
    }

    await message.client.sendMessage(message.jid, listMessage, {
        quoted: message.data
    });

}));

Events.alphaXCMD({
    pattern: 'ban ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.BAN_DESC}, (async(message, match) => {

    var im = await checkImAdmin(message.jid, message, message.client.user.id);
    if (!im) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN }, {
        quoted: message.data
    });

    var _gpData = await message.client.groupMetadata(message.jid)

    if (Config.BANMSG == 'default') {
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, { text: '@' + message.reply_message.data.participant.split('@')[0] + '```, ' + Lang.BANNED + '```', contextInfo: { mentionedJid: [message.reply_message.data.participant], "participant": message.reply_message.data.participant || message.jid ,"quotedMessage": { "conversation": "removed you" } }});
            await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], "remove");
        } else if (message.reply_message === false && message.mention !== false) {
            var etiketler = '';
            message.mention.map(async(user) => {
                etiketler += '@' + user.split('@')[0];
            });

            await message.client.sendMessage(message.jid, { text: etiketler + '```, ' + Lang.BANNED + '```', contextInfo: { mentionedJid: [message.mention], "participant": message.mention || message.jid ,"quotedMessage": { "conversation": "removed you" } }});
            await message.client.groupParticipantsUpdate(message.jid, message.mention, "remove");
        } else {
            return await message.client.sendMessage(message.jid, { text: Lang.GIVE_ME_USER }, {
                quoted: message.data
            });
        }
    } else {
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, { text: '@' + message.reply_message.data.participant.split('@')[0] + Config.BANMSG , contextInfo: { mentionedJid: [message.reply_message.data.participant], "participant": message.reply_message.data.participant || message.jid ,"quotedMessage": { "conversation": "removed you" } }});
            await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], "remove");
        } else if (message.reply_message === false && message.mention !== false) {
            var etiketler = '';
            message.mention.map(async(user) => {
                etiketler += '@' + user.split('@')[0];
            });

            await message.client.sendMessage(message.jid, { text: etiketler + Config.BANMSG, contextInfo: { mentionedJid: [message.mention], "participant": message.mention || message.jid ,"quotedMessage": { "conversation": "removed you" } }});
            await message.client.groupParticipantsUpdate(message.jid, message.mention, "remove");
        } else {
            return await message.client.sendMessage(message.jid, { text: Lang.GIVE_ME_USER }, {
                quoted: message.data
            });
        }
    }
}));

Events.alphaXCMD({
    pattern: 'add(?: |$)(.*)', fromMe: true, onlyGroup: true, desc: Lang.ADD_DESC }, (async(message, match) => {

    var im = await checkImAdmin(message.jid, message, message.client.user.id);
    if (!im) return await message.client.sendMessage(message.jid, { text: Lang.IM_NOT_ADMIN }, {
        quoted: message.data
    });

    var _gpData = await message.client.groupMetadata(message.jid)

    if (Config.ADDMSG == 'default') {
        if (match[1] !== '') {
            match[1].split(' ')
                .map(async(user) => {
                await message.client.groupParticipantsUpdate(message.jid, [user + "@s.whatsapp.net"], "add");
                await message.client.sendMessage(message.jid, { text: '```@' + user  + ' ' + Lang.ADDED + '```', contextInfo: { mentionedJid: [user + "@s.whatsapp.net"], "participant": `${user}@s.whatsapp.net`,"quotedMessage": { "conversation": `© ${_gpData.subject}` } }});
            });
        } else if (match[1].includes('+')) {
            return await message.client.sendMessage(message.jid, { text: Lang.WRONG }, {
                quoted: message.data
            });
        } else {
            return await message.client.sendMessage(message.jid, { text: Lang.GIVE_ME_USER }, {
                quoted: message.data
            });
        }
    } else {
        if (match[1] !== '') {
            match[1].split(' ')
                .map(async(user) => {
                await message.client.groupParticipantsUpdate(message.jid, [user + "@s.whatsapp.net"], "add");
                await message.client.sendMessage(message.jid, { text: '```@' + user + '``` ' + Config.ADDMSG, contextInfo: { mentionedJid: [user + "@s.whatsapp.net"], "participant": `${user}@s.whatsapp.net`,"quotedMessage": { "conversation": `© ${_gpData.subject}` } }});
            });
        } else if (match[1].includes('+')) {
            return await message.client.sendMessage(message.jid, { text: Lang.WRONG }, {
                quoted: message.data
            });
        } else {
            return await message.client.sendMessage(message.jid, { text: Lang.GIVE_ME_USER }, {
                quoted: message.data
            });
        }
    }
}));