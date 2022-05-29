const Events = require('../events');
const ConfigData = require('../config');
const got = require('got');
const fs = require('fs');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const PluginDB = new JsonDB(new Config('DATABASE/PluginDB', true, true, '/'));
const Language = require('../language');
const Lang = Language.getString('_plugin');
const NLang = Language.getString('updater');

var msg = ''
if (ConfigData.LANG == 'SI') msg = '*මෙම ප්ලගිනය නිල වශයෙන් අනුමත කර ඇත!* ✅'
if (ConfigData.LANG == 'EN') msg = '*This Plugin is Officially Approved!* ✅'
if (ConfigData.LANG == 'KN') msg = '*ಈ ಪ್ಲಗಿನ್ ಅನ್ನು ಅಧಿಕೃತವಾಗಿ ಅನುಮೋದಿಸಲಾಗಿದೆ!* ✅'
if (ConfigData.LANG == 'TR') msg = '*Bu Eklenti Resmi Olarak Onaylanmıştır!* ✅'
if (ConfigData.LANG == 'RU') msg = '*Этот плагин официально одобрен!* ✅'
if (ConfigData.LANG == 'AZ') msg = '*Bu Plugin Rəsmi Təsdiqlidir!* ✅'

var unmsg = ''
if (ConfigData.LANG == 'EN') unmsg = '*This Plugin isn\'t Officially Approved!* ❌'
if (ConfigData.LANG == 'SI') unmsg = '*මෙම ප්ලගිනය නිල නොවන ය!* ❌'
if (ConfigData.LANG == 'KN') unmsg = '*ಈ ಪ್ಲಗಿನ್ ಅನ್ನು ಅಧಿಕೃತವಾಗಿ ಅನುಮೋದಿಸಲಾಗಿಲ್ಲ!* ❌'
if (ConfigData.LANG == 'TR') unmsg = '*Bu Eklenti Resmi Olarak Onaylanmamıştır!* ❌'
if (ConfigData.LANG == 'RU') unmsg = '*Этот плагин официально не одобрен!* ❌'
if (ConfigData.LANG == 'AZ') unmsg = '*Bu Plugin Rəsmi Təsdiqlənməyib!* ❌'

var LANG = {
    unaffinfo: ConfigData.LANG == 'SI' ? '*ස්ථාපිත ප්ලගිනයේ අනතුරුදායක මට්ටම:* _%' : '*Danger Level of Installed Plugin:* _%',
    harmful: ConfigData.LANG == 'SI' ? '*හානිකර බැවින් මෙම ප්ලගිනය ස්ථාපනය කළ නොහැක!*' : '*This Plugin Cannot Be Installed As It Is Harmful!*',
    duplicate: ConfigData.LANG == 'SI' ? '*ඔබට එකම ප්ලගින දෙවරක් ස්ථාපනය කළ නොහැක!*' : '*You Cannot Install the Same Plugin 2 Times!*',
    limit: ConfigData.LANG == 'SI' ? '*මෙම ප්ලගිනය ආරක්‍ෂක සීමාව ඉක්මවයි!*\n*Zararlılık Yüzdesi:* _%' : '*This Plugin Exceeds Security Limit!*\n*Percentage of Harm:* _%',
    imside: ConfigData.LANG == 'SI' ? '*ඔබට දැනට පවතින ප්ලගීන නැවත පූරණය කළ නොහැක!*' : '*You Cant Reinstall Existing Plugins!*'
};

Events.alphaXCMD({
    pattern: 'install ?(.*)', fromMe: true, desc: Lang.INSTALL_DESC, warn: Lang.WARN, deleteCommand: false }, (async(message, match) => {

    if (match[1] == '') return await message.client.sendMessage(message.jid, { text: '*' + Lang.NEED_URL + '*' + ' _https://gist.github.com/SL-Alpha-X/38c594933548dac9967d3cba02c11e19_' },
        { quoted: message.data }
    )
    try {
        var url = new URL(match[1]);
    } catch {
        return await message.client.sendMessage(message.jid, { text: Lang.INVALID_URL },
            { quoted: message.data }
        );
    }
    if (url.host === 'gist.github.com') {
        url.host = 'gist.githubusercontent.com';
        url = url.toString() + '/raw'
    } else {
        url = url.toString()
    }
    var response = await got(url);
    if (response.statusCode == 200) {

        // Plugin name

        var plugin_name = '';
        var split = response.body.split('‎‎');
        if (response.body.includes('Plugin name') && split.length >= 3) {
            plugin_name = '__' + split[1];
        } else {
            plugin_name = response.body.match(/alphaXCMD\({.*pattern: ["'](.*)["'].*}/);
            if (ConfigData.PATH + 'plugins/' + plugin_name.length >= 1) {
                plugin_name = "__" + plugin_name[1];
            } else {
                plugin_name = "__" + Math.random()
                    .toString(36)
                    .substring(8);
            };
        };

        fs.writeFileSync(ConfigData.PATH + 'plugins/' + plugin_name + '.js', response.body);
        try {
            require(ConfigData.PATH + 'plugins/' + plugin_name);
        } catch (e) {
            fs.unlinkSync(ConfigData.PATH + 'plugins/' + plugin_name + '.js')
            return await message.client.sendMessage(message.jid, { text: Lang.INVALID_PLUGIN + ' ```' + e + '```' }, 
                { quoted: message.data }
            );
        }
        var DEG = {
            level: 5
        }
        if (response.body.includes('fs.')) DEG.level = DEG.level + 8
        if (response.body.includes('message.client.user.name')) DEG.level = DEG.level + 6
        if (response.body.includes('Buffer')) DEG.level = DEG.level + 14
        if (response.body.includes("require('fs')")) DEG.level = DEG.level + 9
        if (response.body.includes('quotedMessage')) DEG.level = DEG.level + 5
        if (response.body.includes('fs.unlinkSync')) DEG.level = DEG.level + 16
        if (response.body.includes('findAll')) DEG.level = DEG.level + 20
        if (response.body.includes('MessageType.location')) DEG.level = DEG.level + 9
        if (response.body.includes('message.client.user.jid')) DEG.level = DEG.level + 8
        if (response.body.includes('exec')) DEG.level = DEG.level + 14
        if (response.body.includes('setMessage')) DEG.level = DEG.level + 22
        if (response.body.includes('/sql/notes') || response.body.includes('/sql/lydia') || response.body.includes('/sql/plugin') || response.body.includes('/sql/greetings') || response.body.includes('/sql/filters')) DEG.level = DEG.level + 33
        if (response.body.includes('neofetch')) DEG.level = DEG.level + 12
        if (response.body.includes('groupMetadata')) DEG.level = DEG.level + 29
        if (response.body.includes('similarity')) DEG.level = DEG.level + 18
        if (response.body.includes('format')) DEG.level = DEG.level + 26


        let plugins;
        let find;
        try { plugins = Object.keys(PluginDB.getData("/INSTALLED")); find = plugins.toString('utf-8') } catch { find = [] }

        if (url.includes('SL-Alpha-X') || url.includes('HansakaBro') || url.includes('UviYaBro')) {
            await new Promise(r => setTimeout(r, 400))
            await PluginDB.push('/INSTALLED', {
                [plugin_name]: url
            }, false)
            await message.client.sendMessage(message.jid, { text: Lang.INSTALLED }, 
                { quoted: message.data }
            );
        } else if (find.includes(plugin_name)) {
            await message.client.sendMessage(message.jid, { text: LANG.duplicate }, 
                { quoted: message.data }
            );
            await new Promise(r => setTimeout(r, 400))
            fs.unlinkSync(ConfigData.PATH + 'plugins/' + plugin_name + '.js')
        } else if (response.body.includes('formation')) {
            await message.client.sendMessage(message.jid, { text: LANG.harmful }, 
                { quoted: message.data }
            );
            await new Promise(r => setTimeout(r, 400))
            fs.unlinkSync(ConfigData.PATH + 'plugins/' + plugin_name + '.js')
        } else if ((response.body.includes('commands.map') || response.body.includes('PluginDB') || response.body.includes('groupRemove') || response.body.includes('groupAdd') || response.body.includes('groupMakeAdmin') || response.body.includes('groupDemoteAdmin') || response.body.includes('groupSettingChange') || response.body.includes('groupInviteCode') || response.body.includes('Math.round((new Date()).getTime() / 1000)') || response.body.includes('https://thiccyscarbonapi.herokuapp.com/?code=') || response.body.includes('filtreler.map') || response.body.includes('heroku.delete') || response.body.includes('heroku.patch') || response.body.includes('Chrome/80.0.3987.149 Mobile Safari/537.36') || response.body.includes('groupLeave') || response.body.includes('updateProfilePicture') || response.body.includes('blockUser') || response.body.includes("Language.getString('system_stats')") || response.body.includes("commits['all'].map") || response.body.includes('await git.fetch') || response.body.includes('jids.push'))) {
            await message.client.sendMessage(message.jid, { text: LANG.imside }, 
                { quoted: message.data }
            );
            await new Promise(r => setTimeout(r, 400))
            fs.unlinkSync(ConfigData.PATH + 'plugins/' + plugin_name + '.js')
        } else if (DEG.level > 99) {
            await message.client.sendMessage(message.jid, { text: LANG.limit + DEG.level + '_' }, 
                { quoted: message.data }
            );
            fs.unlinkSync(ConfigData.PATH + 'plugins/' + plugin_name + '.js')
        } else {
            await PluginDB.push('/INSTALLED', {
                [plugin_name]: url
            }, false)
            await new Promise(r => setTimeout(r, 400))
            await message.client.sendMessage(message.jid, { text: Lang.UNOFF }, 
                { quoted: message.data }
            );
            await new Promise(r => setTimeout(r, 400))
            await message.client.sendMessage(message.jid, { text: LANG.unaffinfo + DEG.level + '_' }, 
                { quoted: message.data }
            );
        }
    }

}));

Events.alphaXCMD({
    pattern: 'plugin$', fromMe: true, desc: Lang.PLUGIN_DESC, deleteCommand: false }, (async(message, match) => {

    var mesaj = Lang.INSTALLED_FROM_REMOTE;

    let plugins;
    try { plugins = await PluginDB.getData('/INSTALLED') } catch {};
    var keys = Object.keys(plugins);
    if ( keys.length === 0 ) {
        return await message.sendMessage(message.jid, { text: Lang.NO_PLUGIN },
            { quoted: message.data }
        );
    } else {
        keys.map(
            (plugin) => {
                let vf
                if ( PluginDB.getData('/INSTALLED/' + plugin).includes('SL-Alpha-X') || PluginDB.getData('/INSTALLED/' + plugin).includes('UviYaBro') || PluginDB.getData('/INSTALLED/' + plugin).includes('HansakaBro') ) { vf = msg } else { vf = unmsg }

                mesaj += '```' + plugin + '```: ' + PluginDB.getData('/INSTALLED/' + plugin) + '\n' + vf + '\n\n';
            }
        );
        return await message.client.sendMessage(message.jid, { text: mesaj }, 
                { quoted: message.data }
            );
    }
}));

Events.alphaXCMD({
    pattern: 'remove (.*)', fromMe: true, desc: Lang.REMOVE_DESC, deleteCommand: false }, (async(message, match) => {

    let name = match[1];

    if (name === '') return await message.sendMessage(message.jid,
        { text: Lang.NEED_PLUGIN },
        { quoted: message.data }
    );
    if (!name.startsWith('__')) var get = '__' + match[1];
    try {
        var plugin = await PluginDB.getData('/INSTALLED/' + get);
        if (plugin.length === 0) {
            return await message.sendMessage(message.jid, { text: Lang.NOT_FOUND_PLUGIN }, 
                { quoted: message.data }
            );
        } else {
            PluginDB.delete('/INSTALLED/' + get);
            fs.unlinkSync(ConfigData.PATH + 'plugins/' + get + '.js');
            await message.client.sendMessage(message.jid, { text: Lang.DELETED }, 
                { quoted: message.data }
            );
        }
    } catch (errormsg) {
        return await message.sendMessage(message.jid, { text: Lang.NOT_FOUND_PLUGIN }, 
                { quoted: message.data }
            );
    }
}));