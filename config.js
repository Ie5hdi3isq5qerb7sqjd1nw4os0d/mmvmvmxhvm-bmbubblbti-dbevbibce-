const fs = require('fs');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const db = new JsonDB(new Config('./DATABASE/ConfigDB', true, false, '/'))
if (fs.existsSync('config.env')) require('dotenv')
    .config({
    path: './config.env'
});

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);

module.exports = {
    VERSION: 'V.2 - Multi-device Beta',
    BRANCH: 'multi-device',
    GROUP: 'https://chat.whatsapp.com/ItIRSBUMN9t2lQzCpfAKWt',
    CHANNEL: 't.me/SL_AlphaX_Team',
    PATH: process.env.FILES_PATH || db.getData('/PATH'),
    WAKE_TIME: db.getData('/WAKE_TIME'),
    SESSION: process.env.SESSION || db.getData('/SESSION'),
    LANG: process.env.LANGUAGE || db.getData('/LANG'),
    WORKTYPE: process.env.WORK_TYPE || db.getData('/WORKTYPE'),
    HANDLERS: process.env.HANDLERS || db.getData('/HANDLERS'),
    DEBUG: process.env.DEBUG || db.getData('/DEBUG'),
    REACT_EMOJI: process.env.REACT_EMOJI || db.getData('/REACT_EMOJI'),
    ANTILINK: process.env.ANTILINK || db.getData('/ANTILINK'),
    AUTOBIO: process.env.AUTOBIO || db.getData('/AUTOBIO'),
    ALIVEMSG: process.env.ALIVE_MSG || db.getData('/ALIVEMSG'),
    KICKMEMSG: process.env.KICKME_MSG || db.getData('/KICKMEMSG'),
    BLOCKCHAT: process.env.BLOCKCHAT || db.getData('/BLOCKCHAT'),
    ADDMSG: process.env.ADD_MSG || db.getData('/ADDMSG'),
    MUTEMSG: process.env.MUTE_MSG || db.getData('/MUTEMSG'),
    NOLOG: process.env.NO_LOG || db.getData('/NOLOG'),
    AI_LILY: process.env.AI_LILY || db.getData('/AI_LILY'),
    BLOCKMSG: process.env.BLOCK_MSG || db.getData('/BLOCKMSG'),
    UNBLOCKMSG: process.env.UNBLOCK_MSG || db.getData('/UNBLOCKMSG'),
    UNMUTEMSG: process.env.UNMUTE_MSG || db.getData('/UNMUTEMSG'),
    PROMOTEMSG: process.env.PROMOTE_MSG || db.getData('/PROMOTEMSG'),
    DEMOTEMSG: process.env.DEMOTE_MSG || db.getData('/DEMOTEMSG'),
    BANMSG: process.env.BAN_MSG || db.getData('/BANMSG'),
    AFKMSG: process.env.AFK_MSG || db.getData('/AFKMSG'),
    SEND_READ: process.env.SEND_READ || db.getData('/SEND_READ'),
    CAPTION: process.env.CAPTION || db.getData('/CAPTION'),
    BOTNAME: process.env.BOT_NAME || db.getData('/BOTNAME'),
    BIONAME: process.env.BIO_NAME || db.getData('/BIONAME'),
    CL_KEY: process.env.COMMAND_LIST_KEY || db.getData('/CL_KEY'),
    AM_KEY: process.env.ALIVE_MSG_KEY || db.getData('/AM_KEY'),
    D_SONG: process.env.DOWNLOAD_SONG_MSG || db.getData('/D_SONG'),
    U_SONG: process.env.UPLOAD_SONG_MSG || db.getData('/U_SONG'),
    D_VIDEO: process.env.DOWNLOAD_VIDEO_MSG || db.getData('/D_VIDEO'),
    U_VIDEO: process.env.UPLOAD_VIDEO_MSG || db.getData('/U_VIDEO'),
    U_NAME: process.env.USER_NAME || db.getData('/U_NAME'),
    C_EMOJI: process.env.COMMAND_EMOJI || db.getData('/C_EMOJI'),
    D_EMOJI: process.env.DESC_EMOJI || db.getData('/D_EMOJI'),
    W_EMOJI: process.env.WARN_EMOJI || db.getData('/W_EMOJI'),
    A_PIC: process.env.ALIVE_PICTURE || db.getData('/A_PIC'),
    CLIST_MSG: process.env.COMMAND_LIST_MESSAGE || db.getData('/CLIST_MSG'),
    WLCM_GIF: process.env.WELCOME_GIF || db.getData('/WLCM_GIF'),
    GBYE_GIF: process.env.GOODBYE_GIF || db.getData('/GBYE_GIF'),
    BLOCKLINK: process.env.BLOCKLINK || db.getData('/BLOCKLINK'),
    BLINKS: process.env.BLOCK_LINKS || db.getData('/BLINKS'),
    ALB_MSG: process.env.ANTILINK_BAN_MESSAGE || db.getData('/ALB_MSG'),
    BGM: process.env.BGM || db.getData('/BGM'),
    CMENU: process.env.EXTRA_COMMAND_MENU || db.getData('/CMENU'),
    CMENU_MSG: process.env.EXTRA_COMMAND_MENU_MSG || db.getData('/CMENU_MSG'),
    XAPI: process.env.XTEAM_API || db.getData('/XAPI'),
    BKICK: process.env.BADWORD_KICK || db.getData('/BKICK'),
    BKICK_MSG: process.env.BADWORD_KICK_MSG || db.getData('/BKICK_MSG'),
    RBG_API_KEY: process.env.REMOVEBG_API || db.getData('/RBG_API_KEY'),
    NO_ONLINE: process.env.NO_ONLINE || db.getData('/NO_ONLINE'),
    SUDO: process.env.SUDO || db.getData('/SUDO'),
    WITAI_API: "TEYMELA6DMC4XB5YM3SPTTQWUUIBKURG",
    BOTHELP: "JID HERE",
    COMMUNITY: "JID HERE"
};