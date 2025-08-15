const axios = require('axios');
const chalk = require('chalk');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { exec } = require("child_process");
const { format } = require('util'), fs = require('fs');
const spam = require('./system.js');
const connect = async (m, {
   conn,
   store
}) => {
   const type = typeof m.message === 'object' ? Object.keys(m.message)[0] : {};
   const budy = typeof m.text == 'string' ? m.text : '', body = m.body;
   const cmd = body?.slice(1).trim().split(/ +/).shift().toLowerCase();
   const args = body?.trim().split(/ +/).slice(1);
   const text = args?.join(' '), command = m.command, prefix = m.prefix;
   const pushname = m.pushName || setting.botName.trim() || m.sender.split('@')[0];
   const botNumber = conn.decodeJid(conn.user.id), isMe = botNumber.split('@')[0];
   const isBotLidNumber = m.isLid ? m.jid(botNumber) : botNumber
   const isOwner = m.isLid ? (setting.ownerNumber.includes(isBotLidNumber.split('@')[0]) || [...setting.ownerNumber, isMe].map(num => `${num}@lid`).includes(m.sender)) : [...setting.ownerNumber, isMe].map(num => `${num}@s.whatsapp.net`).includes(m.sender)
   const quoted = m.quoted ? m.quoted : m;
   const mime = m.quoted ? (m?.quoted?.mimetype || m?.quoted?.mtype) : m.mtype;
   const groupMetadata = m.isGroup ? await conn.cacheGroupMetadata(m.chat) : {};
   const groupId = m.isGroup ? groupMetadata?.id : '';
   const groupName = m.isGroup ? groupMetadata?.subject : '';
   const groupDesc = m.isGroup ? groupMetadata?.desc : '';
   const participants = m.isGroup ? groupMetadata?.participants : '';
   const groupAdmins = conn.getAdmins(m, groupMetadata, participants);
   const groupOwner = m.isGroup ? groupMetadata?.owner : '';
   const isBotAdmins = m.isGroup ? groupAdmins?.includes(botNumber) : false;
   const isAdmins = m.isGroup ? groupAdmins?.includes(m.sender) : false;
   const jam = moment.tz('asia/jakarta').format('HH:mm:ss');
   const tanggal = moment().tz("Asia/Jakarta").format("ll");
   const suasana = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a');
   const time = moment(new Date()).format("HH:mm");
   global.waktu = { tanggal, jam, suasana, time };
   const users = global.db?.users[m.sender] ? global.db?.users[m.sender] : global.db.users[m.sender] = {};
   if (Object.keys(users).length < 1) global.db.users[m.sender] = { name: pushname, registered: false, registeredTime: '', umur: '', seri: '', premium: false, premiumTime: '', banned: false, bannedReason: '', limit: isOwner ? 100 : 15, kupon: 5, uang: 1000, hitCmd: 0, notes: '', lastClaim: '', lastHour: '', lastUang: '', lastKupon: '', lastSpin: '', spin: 10, is_spin: false, afkTime: -1, afkReason: '', chat_ai: false };
   const groups = global.db.chats[groupId] ? global.db.chats[groupId] : global.db.chats[groupId] = {};
   if (Object.keys(groups).length < 1) global.db.chats[groupId] = { name: groupName, welcome: true, antilink: true, mute: false, absen: false, absen_count: 0, absen_user: [], absen_text: '', viewOnce: true, antiToxic: true, antiPhoto: false, antiBot: false, chat_ai: false, hd: false, tagsw: true, description: groupDesc == undefined ? '' : groupDesc , welcomeCaption: global.group_welcome || '', byeCaption: global.group_bye || '' };
   if (global.db.chats['']) delete global.db.chats[''];
   const settings = global.db.settings ? global.db.settings : global.db.settings = {};
   if (Object.keys(settings).length < 1) global.db.settings = { menu_type: 2, prefix: 'multi', cover: setting.thumbnail, status: 0, readsw: true, antispam: true, block_pc: false, auto_bio: true, auto_down: false, auto_sticker: false };
   global.cover = db.settings.cover; Format.Logger(m, { conn, time, chalk, pushname, groupName, body });    
   if (typeof global.db.menfess !== 'object') global.db.menfess = {};
   if (!('stores' in global.db)) global.db.stores = {};   
   if (typeof global.db.stores !== 'object') global.db.stores = {};
   const isPremium = db.users[m.sender].premium || isOwner;
   const owner = setting.ownerNumber.map(num => `${num}@s.whatsapp.net`) || setting.ownerNumber.map(num => `${num}@lid`);       
   if (db.settings.block_pc && !m.fromMe && !owner.includes(m.chat) && m.chat !== 'status@broadcast' && !m.isGroup && !isPremium && !isOwner) {
      console.log(`${m.sender.split('@')[0]} Blocked From Private Chat`)
      return conn.updateBlockStatus(m.sender, 'block');         
   };
   const antispam = db.settings.antispam, orang_spam = [];
   spam.ResetSpam(orang_spam);
   if (antispam && command && spam.isFiltered(m.sender) && !m.isGroup && !m.isBaileys && !(prefix === undefined || prefix === '')) {
      spam.addSpam(m.sender, orang_spam);
      return m.reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 3 detik');
   };
   const number = conn.decodeNum(m.sender).replace('s.whatsapp.net', '').replace('lid', '');
   const num = m.isLid ? m.fromMe ? botNumber : number + '@lid' : number + '@s.whatsapp.net';
   if ((db.users[num].banned) && !m.isBaileys && !m.fromMe) {
     if (cmd_plugins.includes(command)) {
        return m.reply(mess.banned + `${db.users[num].bannedReason}`);
     } else {
        return console.log(mess.banned + `${db.users[num].bannedReason}`);
     }     
   };
   if (antispam && command && args.length < 1 && !m.isBaileys) spam.addFilter(m.sender);
   const age = m?.sender?.split("@")[0].substring(m?.sender?.split("@")[0].length - 2);
   const image_daftar = 'https://telegra.ph/file/ab9beaa8589f6af8887e0.jpg';
   const name_daftar = pushname || 'Setan' || `${m.sender.split("@")[0]}`;
   const text_daftar = '*Pendaftaran*';
   const button_daftar = [
      ['Daftar Otomatis', `.daftar ${name_daftar}.${age}`],
      ['Daftar Manual', '.daftar']
   ];
   const extra = { Format, conn, prefix, command, text, mime, args, cmd, quoted, groupName, participants, groupAdmins, budy, isAdmins, isBotAdmins, isOwner, isPremium, store };
   const register = { image_daftar, text_daftar, button_daftar }; Connect(m, extra, register); 
   if (budy.startsWith('>') || budy.startsWith('©')) {
      if (!isOwner || m.isBaileys) return
      return m.reply(`> evaling...`).then(async () => {
         return await m.reply(format(await eval(`(async () => { try { ${budy.slice(2)} } catch (e) { return m.reply(format(e)) } })()`)));
      })   
   };
   if (budy.startsWith('=>') || budy.startsWith('->') || budy.startsWith('~>')) {
      if (!isOwner || m.isBaileys) return
      try {
         return await m.reply(format(await eval(`(async () => { return ${budy.slice(3)} })()`)));
      } catch (e) {
         return await m.reply(format(e));
      }
   };
   if (budy.startsWith('$') || budy.startsWith('%') || budy.startsWith('&')) {
      if (!isOwner || m.isBaileys) return
      return m.reply('> executing...').then(async () => {         
         return await exec(budy.slice(2), async (error, stdout) => {
            if (error) await m.reply(format(error));
            if (stdout) await m.reply(format(stdout));
         })     
      })
   }
};
module.exports = connect