const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { exec } = require("child_process");
const { format } = require('util');
const other = require('./other.js');
const connect = async (m, {
   conn,
   store
}) => {
   const type = typeof m.message === 'object' ? Object?.keys(m.message)[0] : {};
   const budy = typeof m.text == 'string' ? m.text : '', body = m.body;
   const cmd = body?.slice(1).trim().split(/ +/).shift().toLowerCase();
   const args = body?.trim().split(/ +/).slice(1);
   const text = args?.join(' '), command = m.command, prefix = m.prefix;
   const pushname = m.pushName || setting.botName.trim() || m.sender.split('@')[0];
   const botNumber = conn.decodeJid(conn.user.id), isMe = botNumber.split('@')[0];
   const mebot = m.isLid ? m.jid(m.sender)?.split('@')[0] : isMe
   const isOwner = m.isLid ? (setting.ownerNumber.includes(mebot) || [...setting.ownerNumber, isMe].map(num => `${num}@s.whatsapp.net`.replace(/[+-\s]/g,'')).includes(m.sender)) : [...setting.ownerNumber, isMe].map(num => `${num}@s.whatsapp.net`.replace(/[+-\s]/g,'')).includes(m.sender)
   const quoted = m.quoted ? m.quoted : m;
   const mime = m.quoted ? (m?.quoted?.mimetype || m?.quoted?.mtype) : m.mtype;
   const groupMetadata = m.isGroup ? await conn.cacheGroupMetadata(m.chat) : {};
   const groupId = m.isGroup ? groupMetadata?.id : '';
   const groupName = m.isGroup ? groupMetadata?.subject : '';
   const groupDesc = m.isGroup ? groupMetadata?.desc : '';
   const participants = m.isGroup ? groupMetadata?.participants : '';   
   const groupAdmins = m.isLid ? await other.getAdmins(m, conn, groupMetadata, participants) : await conn.getAdmins(m, groupMetadata, participants);
   const groupOwner = m.isGroup ? groupMetadata?.owner : '';
   const isBotAdmins = m.isGroup ? groupAdmins?.includes(m.isLid ? m.jid(botNumber) : botNumber) : false;
   const isAdmins = m.isGroup ? groupAdmins?.includes(m.sender) : false;
   const jam = moment.tz('asia/jakarta').format('HH:mm:ss');
   const tanggal = moment().tz("Asia/Jakarta").format("ll");
   const suasana = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a');
   const time = moment(new Date()).format("HH:mm");
   global.waktu = { tanggal, jam, suasana, time }, cover = db.settings.cover;
   await other.database(m, pushname, isOwner, groupId, groupName, groupDesc);
   Format.Logger(m, { conn, time, chalk, pushname, groupName, body });    
   const isPremium = db.users[m.sender].premium || isOwner;
   const owner = setting.ownerNumber.map(num => `${num}@s.whatsapp.net`).concat(setting.ownerNumber.map(num => `${num}@lid`));
   if (db.settings.block_pc && !m.fromMe && !owner.includes(m.sender) && m.chat !== 'status@broadcast' && !m.isGroup && !isPremium && !isOwner) {
      console.log(`${m.sender.split('@')[0]} Blocked From Private Chat`)      
      return conn.updateBlockStatus(m.sender, 'block');
   };
   const antispam = db.settings.antispam, orang_spam = [];
   other.ResetSpam(orang_spam);
   if (antispam && command && other.isFiltered(m.sender) && !m.isBaileys && !(prefix === undefined || prefix === '')) {
      other.addSpam(m.sender, orang_spam);
      return await m.reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 3 detik');
   };
   const number = conn.decodeNum(m.sender).replace('s.whatsapp.net', '').replace('lid', '');
   const num = m.isLid ? m.fromMe ? botNumber : number + '@s.whatsapp.net' : number + '@s.whatsapp.net';
   if ((db.users[num]?.banned) && !m.isBaileys && !m.fromMe) {
     if (cmd_plugins.includes(command)) {
        return m.reply(mess.banned + `${db.users[num].bannedReason}`);
     } else {
        return console.log(mess.banned + `${db.users[num].bannedReason}`);
     }     
   };
   if (antispam && command && args.length < 1 && !m.isBaileys) other.addFilter(m.sender);
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
   if (budy.startsWith('>') || budy.startsWith(')')) {
      if (!isOwner || m.isBaileys) return
      return m.reply(`> evaling...`).then(async () => {
         return await m.reply(format(await eval(`(async () => { try { ${budy.slice(2)} } catch (e) { return m.reply(format(e)) } })()`)));
      })   
   };
   if (budy.startsWith('=>') || budy.startsWith('->') || budy.startsWith('~>') || budy.startsWith('-)') || budy.startsWith('=)')) {
      if (!isOwner || m.isBaileys) return
      try {
         return await m.reply(format(await eval(`(async () => { return ${budy.slice(3)} })()`)));
      } catch (e) {
         return await m.reply(format(e));
      }
   };
   if (budy.startsWith('$') || budy.startsWith('%') || budy.startsWith('&') || budy.startsWith('*')) {
      if (!isOwner || m.isBaileys) return
      return m.reply('> executing...').then(async () => {         
         return await exec(budy.slice(1) || budy.slice(2), async (error, stdout) => {
            if (error) await m.reply(format(error));
            if (stdout) await m.reply(format(stdout));
         })     
      })
   }
};
module.exports = connect