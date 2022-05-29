const Events = require('../events');
const Config = require('../config');
let WType = Config.WORKTYPE == 'public' ? false : true
const Language = require('../language');
const Lang = Language.getString('_alpha');

Events.alphaXCMD({pattern:`${Config.CL_KEY} ?(.*)`, fromMe: WType, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        var result = Config.HANDLERS;        
        var hdlr = result.replace('^[','').replace(']','');   
        var handler = hdlr[hdlr.length = 0];
        
    const reactionMessage = {
        react: {
            text: Config.REACT_EMOJI || "✅" ,
            key: message.key
        }
    }
    
    await message.client.sendMessage(message.jid, reactionMessage);

 if (!match[1]) {

const row_1 = [
        {title: '〘📜〙» Aʟʟ Cᴏᴍᴍᴀɴᴅs', description: "", rowId: handler + "al4x-all-commands"},
        {title: '〘🍃〙» Lᴏɢᴏ Mᴀᴋᴇʀ', description: "", rowId: handler + "logomaker"},
        {title: '〘🔏〙» Aᴅᴍɪɴ', description: "", rowId: handler + "admin"},
        {title: '〘👩‍🔧〙» Pʀᴏғɪʟᴇ', description: "", rowId: handler + "profile"},
        {title: '〘✂️〙» Eᴅɪᴛ Mᴇᴅɪᴀ', description: "", rowId: handler + "emedia"},
        {title: '〘🛋️〙» Dᴇᴇᴘ Aɪ', description: "", rowId: handler + "deepai"}
              ];
const row_2 = [
        {title: '〘🗜️〙» Dᴏᴡɴʟᴏᴀᴅᴇʀs', description: "   </> Downloader commands \n\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "song [ KEEP LIMIT ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "video [ KEEP LIMIT ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "music [ FREE ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "mp4 [ FREE ]\n" +  Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "fb [ API ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "pinimg [ FREE ]️\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "tiktok [ API ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "img [ FREE ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "ig [ API ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "mfire [ FREE ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "down [ FREE ]\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "mega [ FREE ]\n", rowId: handler + "</>_Events_CMD_List_</>"},
        {title: '〘🔍〙» Sᴇᴀʀᴄʜ', description: "   </> Search something \n\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "yt\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "playst\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "hpmod\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "wiki\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "spotify\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "github\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "sweather\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "weather\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "lyric\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "dict\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "covid\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "detectlang\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "currency\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "trt\n", rowId: handler + "</>_Events_CMD_List_</>"},
        {title: '〘⏳〙» Rᴀɴᴅᴏᴍ', description: "   </> Random output commands \n\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "glowtext\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "compliment\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "insult\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "quote\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "wallpaper (Comming soon..🛠️)\n", rowId: handler + "</>_Events_CMD_List_</>"},
        {title: '〘💣〙» Sᴘᴀᴍ', description: "   </> Spam commands \n\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "CrAsH (bug ⚠️️)\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "CrAsH high (bug ⚠️️)️️\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "spam\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "foto spam \n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "vid spam\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "sticker spam\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "alag\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "aspm\n", rowId: handler + "</>_Events_CMD_List_</>"},
        {title: '〘🎭〙» Fᴜɴ', description: "   </> Fun commands \n\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "art pack\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "roll️️\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "meme️️\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "trumpsay\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "animesay\n" + Config.C_EMOJI + " *ᴄᴏᴍᴍᴀɴᴅ*: " + handler + "changesay\n", rowId: handler + "</>_Events_CMD_List_</>"}
              ]
const row_3 = [
        {title: `${Config.CMENU}`, description: `${Config.CMENU_MSG}`, rowId: handler + "</>_Events_CMD_List_</>"}
              ];

        const sections = [
        {title: "•────•─────•────••────•─────•────•" , rows: row_1},
        {title: "•────•─────•────••────•─────•────•" , rows: row_2},
        {title: "•────•─────• ᴇxᴛʀᴀ ᴍᴇɴᴜ •─────•────•" , rows: row_3}
        ];
        
let listDesc;
if (!Config.CLIST_MSG) { 
listDesc = "Set Any Command List Msg! 🔧" 
} else {
listDesc = Config.CLIST_MSG
};

        const button = {
         text: listDesc,
         footer: "© ${😁 Test Only}",
         title: `*🙃 Hᴇʟʟᴏ! ${message.pushName}*` ,
         buttonText: `『 ${Config.C_EMOJI} ᴄʟɪᴄᴋ ʜᴇʀᴇ 』`,
         sections: sections
        }

    await message.client.sendMessage(message.jid, button, { quoted: message.data });

        } else {
            var CMD_HELP = '';
            Events.commands.map(
                async (command) =>  {
                    if (command.dontAddCommandList || command.pattern === undefined) return;
                    try {
                        var cmatch = command.pattern.toString().match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/);
                        var cmmatch = command.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2]
                    } catch {
                        var cmatch = [command.pattern];
                    }
                    if (cmmatch.endsWith(' ')) {
                        var cmmatch = command.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2].replace(' ', '')
                    }
                    if (cmmatch == match[1]) {
                        var HANDLER = '';
    
                        if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                            HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                        } else {
                            HANDLER = '.';
                        }
                        if (command.desc == '' && !command.usage == '' && command.warn == '') {
                            CMD_HELP += '```' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':``` ```' + (cmatch.length >= 3 ? (HANDLER + cmmatch) : command.pattern) + '```\n' + '*💡' + ' '  + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                        }
                        if (!command.desc == '' && command.usage == '' && command.warn == '') {
                            CMD_HELP += '```' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':``` ```' + (cmatch.length >= 3 ? (HANDLER + cmmatch) : command.pattern) + '```\n' + '```' + Config.D_EMOJI + ' '  + Lang.DESC + ':``` ```' + command.desc + '``` \n\n';
                        }
                        if (command.desc == '' && command.usage == '' && !command.warn == '') {
                            CMD_HELP += '```' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':``` ```' + (cmatch.length >= 3 ? (HANDLER + cmmatch) : command.pattern) + '```\n' + '*' + Config.W_EMOJI + ' '  + Lang.WARN + ':* ```' + command.warn + '```\n\n'
                        }
                        if (!command.desc == '' && !command.usage == '' && command.warn == '') {
                            CMD_HELP += '```' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':``` ```' + (cmatch.length >= 3 ? (HANDLER + cmmatch) : command.pattern) + '```\n' + '```' + Config.D_EMOJI + ' '  + Lang.DESC + ':``` ```' + command.desc + '``` \n' + '*💡' + ' '  + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                        }
                        if (!command.desc == '' && command.usage == '' && !command.warn == '') {
                            CMD_HELP += '```' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':``` ```' + (cmatch.length >= 3 ? (HANDLER + cmmatch) : command.pattern) + '```\n' + '```' + Config.D_EMOJI + ' '  + Lang.DESC + ':``` ```' + command.desc + '``` \n' + '*' + Config.W_EMOJI + ' '  + Lang.WARN + ':* ```' + command.warn + '```\n\n'
                        }
                        if (command.desc == '' && !command.usage == '' && !command.warn == '') {
                            CMD_HELP += '```' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':``` ```' + (cmatch.length >= 3 ? (HANDLER + cmmatch) : command.pattern) + '```\n' + '*💡' + ' '  + Lang.EXAMPLE + ':* ```' + command.usage + '```\n' + '*' + Config.W_EMOJI + ' '  + Lang.WARN + ':* ```' + command.warn + '```\n\n'
                        }
                        if  (command.desc == '' && command.usage == '' && command.warn == '') {
                            CMD_HELP += '```' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':``` ```' + (cmatch.length >= 3 ? (HANDLER + cmmatch) : command.pattern) + '```\n\n'
                        }
                        if  (!command.desc == '' && !command.usage == '' && !command.warn == '') {
                            CMD_HELP += '```' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':``` ```' + (cmatch.length >= 3 ? (HANDLER + cmmatch) : command.pattern) + '```\n' + '```' + Config.D_EMOJI + ' '  + Lang.DESC + ':``` ```' + command.desc + '``` \n' + '*💡' + ' '  + Lang.EXAMPLE + ':* ```' + command.usage + '```\n' + '*' + Config.W_EMOJI + ' '  + Lang.WARN + ':* ```' + command.warn + '```\n\n'
                        }
                    }
                }
            );
            if (CMD_HELP === '') CMD_HELP += Lang.NOT_FOUND;
            await message.client.sendMessage(
                message.jid, { text: Config.BOTNAME + '\n\n' + CMD_HELP } ,
                { quoted: message.data }
            );
         }
}));

Events.alphaXCMD({pattern:'al4x-all-commands$', fromMe: WType, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

    const reactionMessage = {
        react: {
            text: Config.REACT_EMOJI || "✅" ,
            key: message.key
        }
    }
    
    await message.client.sendMessage(message.jid, reactionMessage);

        var CMD_HELP = '';
            Events.commands.map(
                async (command) =>  {
                    if (command.dontAddCommandList || command.pattern === undefined) return;
                    try {
                        var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/);
                        var mmatch = command.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2]
                    } catch {
                        var match = [command.pattern];
                    }
    
                    var HANDLER = '';
    
                    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                    } else {
                        HANDLER = '.';
                    }
                    if (command.desc == '' && !command.usage == '' && command.warn == '') {
                        CMD_HELP += ' *' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + mmatch) : command.pattern) + '```\n' + '*💡' + ' '  + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                    }
                    if (!command.desc == '' && command.usage == '' && command.warn == '') {
                        CMD_HELP += '*' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + mmatch) : command.pattern) + '```\n' + '*' + Config.D_EMOJI + ' '  + Lang.DESC + ':* ```' + command.desc + '``` \n\n';
                    }
                    if (command.desc == '' && command.usage == '' && !command.warn == '') {
                        CMD_HELP += '*' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + mmatch) : command.pattern) + '```\n' + '*' + Config.W_EMOJI + ' '  + Lang.WARN + ':* ```' + command.warn + '```\n\n'
                    }
                    if (!command.desc == '' && !command.usage == '' && command.warn == '') {
                        CMD_HELP += '*' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + mmatch) : command.pattern) + '```\n' + '*' + Config.D_EMOJI + ' '  + Lang.DESC + ':* ```' + command.desc + '``` \n' + '*💡' + ' '  + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                    }
                    if (!command.desc == '' && command.usage == '' && !command.warn == '') {
                        CMD_HELP += '*' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + mmatch) : command.pattern) + '```\n' + '*' + Config.D_EMOJI + ' '  + Lang.DESC + ':* ```' + command.desc + '``` \n' + '*' + Config.W_EMOJI + ' '  + Lang.WARN + ':* ```' + command.warn + '```\n\n'
                    }
                    if (command.desc == '' && !command.usage == '' && !command.warn == '') {
                        CMD_HELP += '*' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + mmatch) : command.pattern) + '```\n' + '*💡' + ' '  + Lang.EXAMPLE + ':* ```' + command.usage + '```\n' + '*' + Config.W_EMOJI + ' '  + Lang.WARN + ':* ```' + command.warn + '```\n\n'
                    }
                    if  (command.desc == '' && command.usage == '' && command.warn == '') {
                        CMD_HELP += '*' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + mmatch) : command.pattern) + '```\n\n'
                    }
                    if  (!command.desc == '' && !command.usage == '' && !command.warn == '') {
                        CMD_HELP += '*' + Config.C_EMOJI + ' '  + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + mmatch) : command.pattern) + '```\n' + '*' + Config.D_EMOJI + ' '  + Lang.DESC + ':* ```' + command.desc + '``` \n' + '*💡' + ' '  + Lang.EXAMPLE + ':* ```' + command.usage + '```\n' + '*' + Config.W_EMOJI + ' '  + Lang.WARN + ':* ```' + command.warn + '```\n\n'
                    }
                }
            );

  await message.client.sendMessage(message.jid, { text: Config.BOTNAME + "\n\n" + CMD_HELP }, { quoted: message.data });

}));