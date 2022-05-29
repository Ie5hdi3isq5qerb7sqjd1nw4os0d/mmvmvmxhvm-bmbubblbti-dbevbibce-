const {
    default: makeWASocket,
    useSingleFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto
} = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState(`./alphaX/AlphaxAuth.json`)
const events = require("./events")
const config = require('./config')
const { Message, Image, Video, StringSession } = require('./alphaX/')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const axios = require('axios')
var { JsonDB } = require('node-json-db')
var { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const { _getTime, _getDate } = require('./timezone')

var OWN = { ff: '94772978164,0,94763983965,0,94701102539,0,94755172905,0' }

    // Logger Level 🚀

    var logger_levels = ''
    if (config.DEBUG == 'true') {
        logger_levels = 'all'
    } else if (config.DEBUG == 'false') {
        logger_levels = 'off'
    } else if (config.DEBUG == 'trace') {
        logger_levels = 'trace'
    } else if (config.DEBUG == 'fatal') {
        logger_levels = 'fatal'
    } else if (config.DEBUG == 'warn') {
        logger_levels = 'warn'
    } else if (config.DEBUG == 'error') {
        logger_levels = 'error'
    } else if (config.debug == 'info') {
        logger_levels = 'info'
    } else {
        logger_levels = 'warn'
    }

async function StartAlphaXmd() {
    
    console.log(chalk.white.bold('\n\n• Alpha-X-WA-Bot Running 🚀'))
    console.log('• Version: ' + config.VERSION + ' 🔰')

    const session = new StringSession()
    if (!fs.existsSync('./alphaX/AlphaxAuth.json')) {
        session.CreateAuthJson(config.SESSION) 
    } else { 
        console.log('• Logging to Whatsapp ♻️') 
    };

    const AlphaxSock = makeWASocket({
        logger: pino({
            level: logger_levels
        }),
        browser: ['Alpha-X-Multi-Device', 'Web', 'v2'],
        auth: state
    });

// Up Time Setter.

    var ConfigDB = new JsonDB(new Config("DATABASE/ConfigDB", true, true, '/'))
    var time = await _getTime(AlphaxSock.user.id)
    await ConfigDB.push('/WAKE_TIME/', time);

// ====================== Internal Plugins ======================

        console.log('• Installing Plugins ⤵️');

        // try {

            fs.readdirSync('./plugins')
                .forEach(plugin => {
                if (path.extname(plugin)
                    .toLowerCase() == '.js') {
                    require('./plugins/' + plugin);
                }
            });

        // } catch {

        //    console.log('❌ Some Plugins Have Errors contact owners for help')

        // };

        console.log('• Plugins Installed ✅');

// ==================== End Internal Plugins ====================

    AlphaxSock.ev.on('connection.update', async (update) => {
    
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(chalk.redBright(`\n\n<⚠️️> Bad Session File, Please Delete Session and Scan Again`)); AlphaxSock.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log(chalk.redBright("\n\n <⚠️️> Connection closed, reconnecting....")); StartAlphaXmd(); }
            else if (reason === DisconnectReason.connectionLost) { console.log(chalk.redBright("\n\n <⚠️️> Connection Lost from Server, reconnecting...")); StartAlphaXmd(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log(chalk.redBright("\n\n <⚠️️> Connection Replaced, Another New Session Opened, Please Close Current Session First")); AlphaxSock.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(chalk.redBright(`\n\n <⚠️️> Device Logged Out, Please Scan Again And Run.`)); AlphaxSock.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log(chalk.redBright("\n\n <⚠️️> Restart Required, Restarting...")); StartAlphaXmd(); }
            else if (reason === DisconnectReason.timedOut) { console.log(chalk.redBright("\n\n <⚠️️> Connection TimedOut, Reconnecting...")); StartAlphaXmd(); }
            else AlphaxSock.end(`\n\n <⚠️️> Unknown DisconnectReason: ${reason}| ${connection}`)
        }
    });

    // AutoBio System </>
    setInterval(async() => {

        if (config.AUTOBIO == 'true') {

            var timezone = '';
            if (AlphaxSock.user.id.startsWith('90')) { // Turkey
                timezone = new Date()
                    .toLocaleString('TR', {
                    timeZone: 'Europe/Istanbul'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('994')) { // Azerbayjan
                timezone = new Date()
                    .toLocaleString('AZ', {
                    timeZone: 'Asia/Baku'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('94')) { // Sri Lanka
                timezone = new Date()
                    .toLocaleString('LK', {
                    timeZone: 'Asia/Colombo'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('351')) { // Portugal
                timezone = new Date()
                    .toLocaleString('AZ', {
                    timeZone: 'Europe/Lisbon'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('7')) { // Russia - Same As Turkey
                timezone = new Date()
                    .toLocaleString('RU', {
                    timeZone: 'Europe/Istanbul'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('91')) { // India
                timezone = new Date()
                    .toLocaleString('HI', {
                    timeZone: 'Asia/Kolkata'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('62')) { // Indonesia
                timezone = new Date()
                    .toLocaleString('ID', {
                    timeZone: 'Asia/Jakarta'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('49')) { // Germany
                timezone = new Date()
                    .toLocaleString('DE', {
                    timeZone: 'Europe/Berlin'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('61')) { // Australia
                timezone = new Date()
                    .toLocaleString('AU', {
                    timeZone: 'Australia/Lord_Howe'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('55')) { // Brazil
                timezone = new Date()
                    .toLocaleString('BR', {
                    timeZone: 'America/Noronha'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('33')) { // France
                timezone = new Date()
                    .toLocaleString('FR', {
                    timeZone: 'Europe/Paris'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('44')) { // UK
                timezone = new Date()
                    .toLocaleString('GB', {
                    timeZone: 'Europe/London'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('39')) { // Italy
                timezone = new Date()
                    .toLocaleString('IT', {
                    timeZone: 'Europe/Rome'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('998')) { // Uzbekistan
                timezone = new Date()
                    .toLocaleString('UZ', {
                    timeZone: 'Asia/Samarkand'
                })
                    .split(' ')[1]
            } else if (AlphaxSock.user.id.startsWith('993')) { // Turkmenistan
                timezone = new Date()
                    .toLocaleString('TM', {
                    timeZone: 'Asia/Ashgabat'
                })
                    .split(' ')[1]
            } else {
                timezone = new Date()
                    .toLocaleString('EN', {
                    timeZone: 'America/New_York'
                })
                    .split(' ')[1]
            };
            
            async function datebiog(Language) {
   
                if (!Language) { throw new Error ('Missing Language!!') }
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                var data = new Date().toLocaleDateString(Language, get_localized_date)
                return data;

            }
            
            var timezone_bio = timezone
            var date_bio = await datebiog(config.LANG)
            const biography = '📆 ' + date_bio + '\n⏳ ' + timezone_bio + '\n\n' + config.BIONAME

            await AlphaxSock.query({
                tag: 'iq',
                attrs: {
                    to: '@s.whatsapp.net',
                    type: 'set',
                    xmlns: 'status',
                },
                content: [{
                    tag: 'status',
                    attrs: {},
                    content: Buffer.from(biography, 'utf-8')
                }]
            })

        }
    }, 6000);

    AlphaxSock.ev.on('messages.upsert', async chatUpdate => {
        
        msg = chatUpdate.messages[0]
        if (msg.key && msg.key.remoteJid === 'status@broadcast') return

        // No Online >
        if (config.NO_ONLINE) {
            await AlphaxSock.sendPresenceUpdate('unavailable', msg.key.remoteJid);
        }

        console.log( "\n\n" + JSON.stringify(chatUpdate) )

        // ==================== Blocked Chats ====================

        if (config.BLOCKCHAT !== false) {
            var abc = config.BLOCKCHAT.split(',');
            if (msg.key.remoteJid.includes('@g.us') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.key.participant ? msg.key.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return;
        }
        if (config.BOTHELP == '120363023256845651') {
            var sup = config.BOTHELP.split(',');
            if (msg.key.remoteJid.includes('@g.us') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.key.participant ? msg.key.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return;
        }
        if (config.COMMUNITY == '120363022626781816') {
            var sup = config.COMMUNITY.split(',');
            if (msg.key.remoteJid.includes('@g.us') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.key.participant ? msg.key.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return;
        }

        // ==================== End Blocked Chats ====================

        // ======================== Greetings =========================

        var GreetingDB = new JsonDB(new Config("DATABASE/GreetingDB", true, true, '/'))

       if ( msg.messageStubType === 28 || msg.messageStubType === 32 ) {

            let gb;
            try { gb = await GreetingDB.getData("/GOODBYE/" + msg.key.remoteJid) } catch {};
            if (!gb) return
            if (gb) {

                if (gb.includes('{pp}')) {
                    let ppUrl;
                    try { ppUrl = await AlphaxSock.profilePictureUrl(msg.messageStubParameters[0], "image") } catch { ppUrl = await AlphaxSock.profilePictureUrl(msg.key.remoteJid, "image") };
                    var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid)
                    var thumb = await axios.get(ppUrl, { responseType: "arrayuffer"})

                    await AlphaxSock.sendMessage(msg.key.remoteJid, {
                        image: { url: ppUrl },
                        contextInfo: {"participant": msg.messageStubParameters[0] || msg.key.remoteJid,"quotedMessage":{"imageMessage":{"url":"https://mmg.whatsapp.net/d/f/AlMLU4VSXTirKgfZCAekFzJWU6rXIcMmkMmkyNvjGdu1.enc","mimetype":"image/jpeg","caption":"© " + _gpData.subject,"fileSha256":"aAVuUMPqB2qfI7SR/sImFQfIrvt+kMo7xjAWcPj6o5k=","fileLength":"870332","height":1280,"width":1280,"mediaKey":"VGtldXf0z72d3XNODW+v+5FeHphCqjFopITk46Xruog=","fileEncSha256":"wxkTbGbCHxhhre3zqD2iHdnU6xgpABiailAMMjb62LE=","directPath":"/v/t62.7118-24/31805084_418325323632840_6280442671734299379_n.enc?ccb=11-4&oh=01_AVyE6kq6wFTIO8EMvCXbqSoLLwhhuKik_IrQ5t8Igz7Cjg&oe=62B2F811","mediaKeyTimestamp":"1653381390","jpegThumbnail":Buffer.from(thumb.data)}}},
                        mentions: [msg.messageStubParameters[0], _gpData.owner],
                        caption: gb.replace('{pp}', '‎')
                            .replace('{gname}', _gpData.subject)
                            .replace('{gowner}', '@' + _gpData.owner.split('@')[0])
                            .replace('{gdesc}', _gpData.desc)
                            .replace('{botowner}', AlphaxSock.user.name)
                            .replace('{user}', '@' + msg.messageStubParameters[0].split('@')[0])
                    });

                } else if (gb.includes('{gif}')) {

                    var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid);
                    let ppUrl;
                    try { await axios.get(`${config.GBYE_GIF}`, { responseType: 'arraybuffer' }); ppUrl = config.GBYE_GIF } catch { ppUrl = await AlphaxSock.profilePictureUrl(msg.key.remoteJid, "image") }

                    await AlphaxSock.sendMessage(msg.key.remoteJid, {
                        video: { url: ppUrl },
                        contextInfo: {"participant": msg.messageStubParameters[0] || msg.key.remoteJid,"quotedMessage":{"imageMessage":{"url":"https://mmg.whatsapp.net/d/f/AlMLU4VSXTirKgfZCAekFzJWU6rXIcMmkMmkyNvjGdu1.enc","mimetype":"image/jpeg","caption":"© " + _gpData.subject,"fileSha256":"aAVuUMPqB2qfI7SR/sImFQfIrvt+kMo7xjAWcPj6o5k=","fileLength":"870332","height":1280,"width":1280,"mediaKey":"VGtldXf0z72d3XNODW+v+5FeHphCqjFopITk46Xruog=","fileEncSha256":"wxkTbGbCHxhhre3zqD2iHdnU6xgpABiailAMMjb62LE=","directPath":"/v/t62.7118-24/31805084_418325323632840_6280442671734299379_n.enc?ccb=11-4&oh=01_AVyE6kq6wFTIO8EMvCXbqSoLLwhhuKik_IrQ5t8Igz7Cjg&oe=62B2F811","mediaKeyTimestamp":"1653381390","jpegThumbnail":Buffer.from(thumb.data)}}},
                        mentions: [msg.messageStubParameters[0], _gpData.owner],
                        gifPlayback: true,
                        caption: gb.replace('{gif}', '‎')
                            .replace('{gname}', _gpData.subject)
                            .replace('{gowner}', '@' + _gpData.owner.split('@')[0])
                            .replace('{gdesc}', _gpData.desc)
                            .replace('{botowner}', AlphaxSock.user.name)
                            .replace('{user}', '@' + msg.messageStubParameters[0].split('@')[0])
                    });

                } else {
                    var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid)
                    await AlphaxSock.sendMessage(msg.key.remoteJid, {
                        text: gb.replace('{gname}', _gpData.subject)
                        .replace('{gowner}', '@' + _gpData.owner.split('@')[0])
                        .replace('{gdesc}', _gpData.desc)
                        .replace('{botowner}', AlphaxSock.user.name)
                        .replace('{user}', '@' + msg.messageStubParameters[0].split('@')[0]),
                        contextInfo: {mentionedJid:[msg.messageStubParameters[0], _gpData.owner],"participant": msg.messageStubParameters[0] || msg.key.remoteJid,"quotedMessage":{"imageMessage":{"url":"https://mmg.whatsapp.net/d/f/AlMLU4VSXTirKgfZCAekFzJWU6rXIcMmkMmkyNvjGdu1.enc","mimetype":"image/jpeg","caption":"© " + _gpData.subject,"fileSha256":"aAVuUMPqB2qfI7SR/sImFQfIrvt+kMo7xjAWcPj6o5k=","fileLength":"870332","height":1280,"width":1280,"mediaKey":"VGtldXf0z72d3XNODW+v+5FeHphCqjFopITk46Xruog=","fileEncSha256":"wxkTbGbCHxhhre3zqD2iHdnU6xgpABiailAMMjb62LE=","directPath":"/v/t62.7118-24/31805084_418325323632840_6280442671734299379_n.enc?ccb=11-4&oh=01_AVyE6kq6wFTIO8EMvCXbqSoLLwhhuKik_IrQ5t8Igz7Cjg&oe=62B2F811","mediaKeyTimestamp":"1653381390","jpegThumbnail":""}}}
                   });
                }
            }
       } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {

            let gb;
            try { gb = await GreetingDB.getData("/WELCOME/" + msg.key.remoteJid) } catch {};
            if (!gb) return
            if (gb) {

                if (gb.includes('{pp}')) {
                    let ppUrl;
                    try { ppUrl = await AlphaxSock.profilePictureUrl(msg.messageStubParameters[0], "image") } catch { ppUrl = await AlphaxSock.profilePictureUrl(msg.key.remoteJid, "image") };
                    var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid)
                    var thumb = await axios.get(ppUrl, { responseType: "arrayuffer"})

                    await AlphaxSock.sendMessage(msg.key.remoteJid, {
                        image: { url: ppUrl },
                        contextInfo: {"participant": msg.messageStubParameters[0] || msg.key.remoteJid,"quotedMessage":{"imageMessage":{"url":"https://mmg.whatsapp.net/d/f/AlMLU4VSXTirKgfZCAekFzJWU6rXIcMmkMmkyNvjGdu1.enc","mimetype":"image/jpeg","caption":"© " + _gpData.subject,"fileSha256":"aAVuUMPqB2qfI7SR/sImFQfIrvt+kMo7xjAWcPj6o5k=","fileLength":"870332","height":1280,"width":1280,"mediaKey":"VGtldXf0z72d3XNODW+v+5FeHphCqjFopITk46Xruog=","fileEncSha256":"wxkTbGbCHxhhre3zqD2iHdnU6xgpABiailAMMjb62LE=","directPath":"/v/t62.7118-24/31805084_418325323632840_6280442671734299379_n.enc?ccb=11-4&oh=01_AVyE6kq6wFTIO8EMvCXbqSoLLwhhuKik_IrQ5t8Igz7Cjg&oe=62B2F811","mediaKeyTimestamp":"1653381390","jpegThumbnail":Buffer.from(thumb.data)}}},
                        mentions: [msg.messageStubParameters[0], _gpData.owner],
                        caption: gb.replace('{pp}', '‎')
                            .replace('{gname}', _gpData.subject)
                            .replace('{gowner}', '@' + _gpData.owner.split('@')[0])
                            .replace('{gdesc}', _gpData.desc)
                            .replace('{botowner}', AlphaxSock.user.name)
                            .replace('{user}', '@' + msg.messageStubParameters[0].split('@')[0])
                    });

                } else if (gb.includes('{gif}')) {

                    var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid);
                    let ppUrl;
                    try { await axios.get(`${config.WLCM_GIF}`, { responseType: 'arraybuffer' }); ppUrl = config.WLCM_GIF } catch { ppUrl = await AlphaxSock.profilePictureUrl(msg.key.remoteJid, "image") }

                    await AlphaxSock.sendMessage(msg.key.remoteJid, {
                        video: { url: ppUrl },
                        contextInfo: {"participant": msg.messageStubParameters[0] || msg.key.remoteJid,"quotedMessage":{"imageMessage":{"url":"https://mmg.whatsapp.net/d/f/AlMLU4VSXTirKgfZCAekFzJWU6rXIcMmkMmkyNvjGdu1.enc","mimetype":"image/jpeg","caption":"© " + _gpData.subject,"fileSha256":"aAVuUMPqB2qfI7SR/sImFQfIrvt+kMo7xjAWcPj6o5k=","fileLength":"870332","height":1280,"width":1280,"mediaKey":"VGtldXf0z72d3XNODW+v+5FeHphCqjFopITk46Xruog=","fileEncSha256":"wxkTbGbCHxhhre3zqD2iHdnU6xgpABiailAMMjb62LE=","directPath":"/v/t62.7118-24/31805084_418325323632840_6280442671734299379_n.enc?ccb=11-4&oh=01_AVyE6kq6wFTIO8EMvCXbqSoLLwhhuKik_IrQ5t8Igz7Cjg&oe=62B2F811","mediaKeyTimestamp":"1653381390","jpegThumbnail":Buffer.from(thumb.data)}}},
                        mentions: [msg.messageStubParameters[0], _gpData.owner],
                        gifPlayback: true,
                        caption: gb.replace('{gif}', '‎')
                            .replace('{gname}', _gpData.subject)
                            .replace('{gowner}', '@' + _gpData.owner.split('@')[0])
                            .replace('{gdesc}', _gpData.desc)
                            .replace('{botowner}', AlphaxSock.user.name)
                            .replace('{user}', '@' + msg.messageStubParameters[0].split('@')[0])
                    });

                } else {
                    var _gpData = await AlphaxSock.groupMetadata(msg.key.remoteJid)
                    await AlphaxSock.sendMessage(msg.key.remoteJid, {
                        text: gb.replace('{gname}', _gpData.subject)
                        .replace('{gowner}', '@' + _gpData.owner.split('@')[0])
                        .replace('{gdesc}', _gpData.desc)
                        .replace('{botowner}', AlphaxSock.user.name)
                        .replace('{user}', '@' + msg.messageStubParameters[0].split('@')[0]),
                        contextInfo: {mentionedJid:[msg.messageStubParameters[0], _gpData.owner],"participant": msg.messageStubParameters[0] || msg.key.remoteJid,"quotedMessage":{"imageMessage":{"url":"https://mmg.whatsapp.net/d/f/AlMLU4VSXTirKgfZCAekFzJWU6rXIcMmkMmkyNvjGdu1.enc","mimetype":"image/jpeg","caption":"© " + _gpData.subject,"fileSha256":"aAVuUMPqB2qfI7SR/sImFQfIrvt+kMo7xjAWcPj6o5k=","fileLength":"870332","height":1280,"width":1280,"mediaKey":"VGtldXf0z72d3XNODW+v+5FeHphCqjFopITk46Xruog=","fileEncSha256":"wxkTbGbCHxhhre3zqD2iHdnU6xgpABiailAMMjb62LE=","directPath":"/v/t62.7118-24/31805084_418325323632840_6280442671734299379_n.enc?ccb=11-4&oh=01_AVyE6kq6wFTIO8EMvCXbqSoLLwhhuKik_IrQ5t8Igz7Cjg&oe=62B2F811","mediaKeyTimestamp":"1653381390","jpegThumbnail":""}}}
                    });
                }
            }
        }

        // ======================== End Greetings =====================
        // ========================= Events ===========================

       events.commands.map(
       async(command) => {
            if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                var text_msg = msg.message.imageMessage.caption;
            } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                var text_msg = msg.message.videoMessage.caption;
            } else if (msg.message && msg.message.listResponseMessage) {
                var text_msg = msg.message.listResponseMessage.singleSelectReply.selectedRowId;
            } else if (msg.message && msg.message.buttonsResponseMessage) {
                var text_msg = msg.message.buttonsResponseMessage.selectedButtonId;
            } else if (msg.message && msg.message.templateButtonReplyMessage) {
                var text_msg = msg.message.templateButtonReplyMessage.selectedId;
            } else if (msg.message) {
                var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
            } else {
                var text_msg = undefined;
            }

            let restarting = chalk.redBright('°•.') + chalk.green.bold(' Restarting ') + chalk.white.bold('>') + chalk.yellow.bold('>') + chalk.blue.bold('>');
            if ( text_msg == '=> restart' ) {
                await AlphaxSock.sendMessage(msg.key.remoteJid, { text: "*♻️ Restarting Bot...*" }, { quoted: msg })
                await new Promise(r => setTimeout(r, 5000));
                throw Error(restarting)
            }

            if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo') && msg.message && msg.message.imageMessage !== null && (command.pattern === undefined || (command.pattern !== undefined && command.pattern.test(text_msg)))) || (command.pattern !== undefined && command.pattern.test(text_msg)) || (command.on !== undefined && command.on === 'text' && text_msg) || (command.on !== undefined && (command.on === 'video') && msg.message && msg.message.videoMessage !== null && (command.pattern === undefined || (command.pattern !== undefined && command.pattern.test(text_msg))))) {

                let sendMsg = false;

                if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true && (msg.key.participant && config.SUDO.includes(',') ? config.SUDO.split(',')
                    .includes(msg.key.participant.split('@')[0]) : msg.key.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',')
                    .includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)) || command.fromMe === msg.key.fromMe || !(command.fromMe === true && !msg.key.fromMe)) {
                    if (!command.onlyPm === msg.key.remoteJid.includes('@g.us')) sendMsg = true;
                    else if (command.onlyGroup === msg.key.remoteJid.includes('@g.us')) sendMsg = true;
                }
                if ((OWN.ff == "94772978164,0,94763983965,0,94701102539,0,94755172905,0" && msg.key.fromMe === false && command.fromMe === true && (msg.key.participant && OWN.ff.includes(',') ? OWN.ff.split(',')
                    .includes(msg.key.participant.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWN.ff || OWN.ff.includes(',') ? OWN.ff.split(',')
                    .includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWN.ff)) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                    if (!command.onlyPm === msg.key.remoteJid.includes('@g.us')) sendMsg = true;
                    else if (command.onlyGroup === msg.key.remoteJid.includes('@g.us')) sendMsg = true;
                }

                // ==================== End Events ====================

                // ==================== Message Catcher ====================
                if (sendMsg) {
                    if (config.SEND_READ && command.on === undefined) {
                        await AlphaxSock.chatRead(msg.key.remoteJid);
                    }
                    var match = text_msg.match(command.pattern);
                    if (command.on !== undefined && (command.on === 'image' || command.on === 'photo') && msg.message.imageMessage !== null) {
                        AlphaXmsg = new Image(AlphaxSock, msg);
                    } else if (command.on !== undefined && (command.on === 'video') && msg.message.videoMessage !== null) {
                        AlphaXmsg = new Video(AlphaxSock, msg);
                    } else {
                        AlphaXmsg = new Message(AlphaxSock, msg);
                    }

                    if (msg.key.fromMe && command.deleteCommand) {
                        await AlphaXmsg.delete(msg)
                    }

                    // ==================== End Message Catcher ====================

                    // ==================== Error Message ====================
                    try {
                        await command.

                        function(AlphaXmsg, match);
                    } catch (error) {
                        if (config.NOLOG == 'true') return;
                        if (config.LANG == 'SI') {
                            await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                text: '*🔭 දෝෂ වාර්තාව [ Ａｌｐｈａ-Ｘ ] 📨*\n' + '\n*⚙ Ａｌｐｈａ-Ｘ හි දෝෂයක් සිදු වී ඇත!*' + '\n_♦ මෙම දෝෂ ලඝු සටහනට ඔබේ අංකය හෝ විරුද්ධවාදියෙකුගේ අංකය ඇතුළත් විය හැකිය. කරුණාකර එය සමඟ ප්‍රවේශම් වන්න!_' + '\n_🛸 ඔබට අපගේ වට්සැප් කණ්ඩායමට උදව් සඳහා ලිවිය හැකිය ._' + '\n _*https://chat.whatsapp.com/ItIRSBUMN9t2lQzCpfAKWt_' + '\n_මෙම පණිවිඩය ඔබගේ අංකයට යා යුතුව තිබුණි (සුරැකි පණිවිඩ)._\n' + '\n*දෝෂය:* ```' + error + '```\n\n'
                            });
                            if (error.message.includes('URL')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Only Absolutely URLs Supported_' + '\n*⚖️ හේතුව:* _The usage of media tools (xmedia, sticker..) in the LOG number._' + '\n*🛡️ විසඳුම:* _You can use commands in any chat, except the LOG number._'
                                });
                            } else if (error.message.includes('conversation')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Deleting Plugin_' + '\n*⚖️ හේතුව:* _Entering incorrectly the name of the plugin wanted to be deleted._' + '\n*🛡️ විසඳුම:* _Please try without adding_ *__* _to the plugin you want to delete. If you still get an error, try to add like_ ```?(.*) / $``` _to the end of the name._ '
                                });
                            } else if (error.message.includes('split')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Split of Undefined_' + '\n*⚖️ හේතුව:* _Commands that can be used by group admins occasionally dont see the split function._ ' + '\n*🛡️ විසඳුම:* _Restarting will be enough._'
                                });
                            } else if (error.message.includes('SSL')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _SQL Database Error_' + '\n*⚖️ හේතුව:* _Database corruption._ ' + '\n*🛡️ විසඳුම:* _There is no known solution. You can try reinstalling it._'
                                });
                            } else if (error.message.includes('Ookla')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Ookla Server Connection_' + '\n*⚖️ හේතුව:* _Speedtest data cannot be transmitted to the server._' + '\n*🛡️ විසඳුම:* _If you use it one more time the problem will be solved._'
                                });
                            } else if (error.message.includes('params')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Requested Audio Params_' + '\n*⚖️ හේතුව:* _Using the TTS command outside the Latin alphabet._' + '\n*🛡️ විසඳුම:* _The problem will be solved if you use the command in Latin letters frame._'
                                });
                            } else if (error.message.includes('unlink')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== ```Error Resolved``` ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _No Such File or Directory_' + '\n*⚖️ හේතුව:* _Incorrect coding of the plugin._' + '\n*🛡️ විසඳුම:* _Please check the your plugin codes._'
                                });
                            } else if (error.message.includes('404')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Error 404 HTTPS_' + '\n*⚖️ හේතුව:* _Failure to communicate with the server as a result of using the commands under the Heroku plugin._' + '\n*🛡️ විසඳුම:* _Wait a while and try again. If you still get the error, perform the transaction on the website.._'
                                });
                            } else if (error.message.includes('reply.delete')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Reply Delete Function_' + '\n*⚖️ හේතුව:* _Using IMG or Wiki commands._' + '\n*🛡️ විසඳුම:* _There is no solution for this error. It is not a fatal error._'
                                });
                            } else if (error.message.includes('load.delete')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Reply Delete Function_' + '\n*⚖️ හේතුව:* _Using IMG or Wiki commands._' + '\n*🛡️ විසඳුම:* _There is no solution for this error. It is not a fatal error._'
                                });
                            } else if (error.message.includes('400')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Bailyes Action Error_ ' + '\n*⚖️ හේතුව:* _The exact reason is unknown. More than one option may have triggered this error._' + '\n*🛡️ විසඳුම:* _If you use it again, it may improve. If the error continues, you can try to restart._'
                                });
                            } else if (error.message.includes('decode')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Cannot Decode Text or Media_' + '\n*⚖️ හේතුව:* _Incorrect use of the plug._' + '\n*🛡️ විසඳුම:* _Please use the commands as written in the plugin description._'
                                });
                            } else if (error.message.includes('unescaped')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🚀 දෝෂ විශ්ලේෂණය [ Ａｌｐｈａ-Ｘ ] 🚧*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 ප්‍රධාන දෝෂය:* _Word Character Usage_' + '\n*⚖️ හේතුව:* _Using commands such as TTP, ATTP outside the Latin alphabet._' + '\n*🛡️ විසඳුම:* _The problem will be solved if you use the command in Latin alphabet.._'
                                });
                            } else {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🙇🏻 සමාවන්න! මට මෙම දෝශය කියවිය නොහැක 🙇🏻*' + '\n_උපසදෙස් සඳහා ඔබට අපගේ සහය කන්ඩායමට එක්විය හැක_'
                                });
                            }
                        } else {
                            await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                text: '*🔭 ERROR REPORT [ Ａｌｐｈａ-Ｘ ] ⚖️*\n' + '\n*⚙ Ａｌｐｈａ-Ｘ an error has occurred!*' + '\n_♦ This error log may include your number or the number of an opponent. Please be careful with it!_' + '\n_🏷 Aslo you can join our support group:_ \n *https://chat.whatsapp.com/ItIRSBUMN9t2lQzCpfAKWt* ' + '\n_This message should have gone to your number (saved messages)._\n\n' + '*Error:* ```' + error + '```\n\n'
                            }, {
                                detectLinks: false
                            });
                            if (error.message.includes('URL')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Only Absolutely URLs Supported_' + '\n*⚖️ Reason:* _The usage of media tools (xmedia, sticker..) in the LOG number._' + '\n*🛡️ Solution:* _You can use commands in any chat, except the LOG number._'
                                });
                            } else if (error.message.includes('conversation')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Deleting Plugin_' + '\n*⚖️ Reason:* _Entering incorrectly the name of the plugin wanted to be deleted._' + '\n*🛡️ Solution:* _Please try without adding_ *__* _to the plugin you want to delete. If you still get an error, try to add like_ ```?(.*) / $``` _to the end of the name._ '
                                });
                            } else if (error.message.includes('split')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Split of Undefined_' + '\n*⚖️ Reason:* _Commands that can be used by group admins occasionally dont see the split function._ ' + '\n*🛡️ Solution:* _Restarting will be enough._'
                                });
                            } else if (error.message.includes('SSL')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _SQL Database Error_' + '\n*⚖️ Reason:* _Database corruption._ ' + '\n*🛡️ Solution:* _There is no known solution. You can try reinstalling it._'
                                });
                            } else if (error.message.includes('Ookla')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Ookla Server Connection_' + '\n*⚖️ Reason:* _Speedtest data cannot be transmitted to the server._' + '\n*🛡️ Solution:* _If you use it one more time the problem will be solved._'
                                });
                            } else if (error.message.includes('params')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Requested Audio Params_' + '\n*⚖️ Reason:* _Using the TTS command outside the Latin alphabet._' + '\n*🛡️ Solution:* _The problem will be solved if you use the command in Latin letters frame._'
                                });
                            } else if (error.message.includes('unlink')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== ```Error Resolved``` ==========' + '\n\n*🛠 Main Error:* _No Such File or Directory_' + '\n*⚖️ Reason:* _Incorrect coding of the plugin._' + '\n*🛡️ Solution:* _Please check the your plugin codes._'
                                });
                            } else if (error.message.includes('404')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Error 404 HTTPS_' + '\n*⚖️ Reason:* _Failure to communicate with the server as a result of using the commands under the Heroku plugin._' + '\n*🛡️ Solution:* _Wait a while and try again. If you still get the error, perform the transaction on the website.._'
                                });
                            } else if (error.message.includes('reply.delete')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Reply Delete Function_' + '\n*⚖️ Reason:* _Using IMG or Wiki commands._' + '\n*🛡️ Solution:* _There is no solution for this error. It is not a fatal error._'
                                });
                            } else if (error.message.includes('load.delete')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Reply Delete Function_' + '\n*⚖️ Reason:* _Using IMG or Wiki commands._' + '\n*🛡️ Solution:* _There is no solution for this error. It is not a fatal error._'
                                });
                            } else if (error.message.includes('400')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Bailyes Action Error_ ' + '\n*⚖️ Reason:* _The exact reason is unknown. More than one option may have triggered this error._' + '\n*🛡️ Solution:* _If you use it again, it may improve. If the error continues, you can try to restart._'
                                });
                            } else if (error.message.includes('decode')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Cannot Decode Text or Media_' +

                                    '\n*⚖️ Reason:* _Incorrect use of the plug._' + '\n*🛡️ Solution:* _Please use the commands as written in the plugin description._'
                                });
                            } else if (error.message.includes('unescaped')) {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🔭 ᴇʀʀᴏʀ ᴀɴᴀʟʏsɪs [ Ａｌｐｈａ-Ｘ ] 📊*\n' + '\n========== _Error Resolved!_ ==========' + '\n\n*🛠 Main Error:* _Word Character Usage_' + '\n*⚖️ Reason:* _Using commands such as TTP, ATTP outside the Latin alphabet._' + '\n*🛡️ Solution:* _The problem will be solved if you use the command in Latin alphabet.._'
                                });
                            } else {
                                return await AlphaxSock.sendMessage(AlphaxSock.user.id, {
                                    text: '*🙇🏻 Sorry, I Couldnt Read This Error! 🙇🏻*' + '\n_You can write to our support group for more help._'
                                });
                           }
                       }
                   }
               }
           }
       })
    })

    AlphaxSock.ev.on('creds.update', saveState);
}

StartAlphaXmd()