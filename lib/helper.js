process.on('uncaughtException', console.error);
const path = require('path')
const chalk = require('chalk')
const fetch = require('node-fetch')
const { exec } = require("child_process")
const fs = require('fs')
const util = require('util'), { format } = require ('util')
const colors = require('colors/safe.js')
const moment = require("moment-timezone")
moment.tz.setDefault("Asia/Jakarta").locale("id");
const helper = async (m, { 
   conn, 
   store
}) => {
   const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
   const tanggal = moment().tz("Asia/Jakarta").format("ll")
   const suasana = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
   const time = moment(new Date()).format("HH:mm");
   const welcome = true
   const antilink = true
   const limit = 25
   const uang = 1000
   const kupon = 5   
   global._limit = limit;
   global._uang = uang;
   global._kupon = kupon;
   global.waktu = { tanggal, jam, suasana, time };
   var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'interactiveResponseMessage') ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') ? m.msg.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
   var budy = (typeof m.text == 'string' ? m.text : '')
   var type = Object.keys(m.message)[0]
   const prefix = /^./.test(body) ? body.match(/^./gi) : '#';
   const age = m.sender.split("@")[0].substring(m.sender.split("@")[0].length - 2);
   const isCmd = body.startsWith(prefix)
   const sender = m.sender;
   const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
   const cmd = body.slice(1).trim().split(/ +/).shift().toLowerCase()
   const args = body.trim().split(/ +/).slice(1)
   const text = args.join(' ');
   const pushname = m.pushName || setting.botName || m.sender.split('@')[0];
   const botNumber = conn.decodeJid(conn.user.id)
   const isOwner = setting.ownerNumber.map(num => `${num}@s.whatsapp.net`).includes(m.sender);   
   const quoted = m.quoted ? m.quoted : m
   const mime = (quoted.m || quoted).mimetype || ''
   const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
   const groupId = m.isGroup ? groupMetadata.id : ''
   const groupName = m.isGroup ? groupMetadata.subject : ''
   const participants = m.isGroup ? groupMetadata.participants : ''
   const groupAdmins = m.isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : ''
   const groupOwner = m.isGroup ? groupMetadata.owner : '';
   const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
   const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
   const { Format, User, connect } = await require('utility-mf');
   const isPremium = User.checkPremiumUser(sender) || isOwner
   const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   const mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
   const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
   mention != undefined ? mention.push(mentionByReply) : []
   const mentionUser = mention != undefined ? mention.filter(n => n) : []
   const name_daftar = pushname || 'Setan' || `${m.sender.split("@")[0]}`;   
   const ceklimit = User.checkLimitUser(sender) <= 0;
   const isBanned = User.checkBannedUser(sender);
   const autodl = User.readAutoDL();
   User.isDataUser(m, { User, uang, kupon, limit });
   const isDataGroup = { groupId, groupName, welcome, antilink, groupMetadata };
   User.updateGroup(isDataGroup);
   const { group } = User.updateGroup(isDataGroup);
   const extra = { conn, prefix, command, text, mime, args, cmd, Format, quoted, User, groupName, participants, groupAdmins, mentionUser, mentionByReply, group, budy, isAdmins, isOwner, isPremium, autodl, store};
   const image_daftar = 'https://telegra.ph/file/ab9beaa8589f6af8887e0.jpg'
   const text_daftar = '*Pendaftaran*'
   const button_daftar = [ ['Daftar Otomatis', `.daftar ${name_daftar}.${age}`], ['Daftar Manual', '.daftar'] ];
   const isUser = { isBanned, ceklimit, image_daftar, text_daftar, button_daftar };
   connect(m, extra, isUser);
   User.Logger(m, { conn, colors, time, chalk, pushname, groupName, body });
   if (budy.startsWith('>') || budy.startsWith('©')) {
      if (!isOwner) return m.reply(mess.OnlyOwner);
      try {
         m.reply(`evaling...`)
         await m.reply(util.format(await eval(`(async () => { ${budy.slice(2)} })()`)))
      } catch (e) {
         return await m.reply(util.format(e))
      };
   };
   if (budy.startsWith('=>') || budy.startsWith('->') || budy.startsWith('~>')) {
      if (!isOwner) return m.reply(mess.OnlyOwner);
      try {
         await m.reply(util.format(await eval(`(async () => { return ${budy.slice(3)} })()`)));
      } catch (e) {
         return await m.reply(String(e));
      };
   };
   if (budy.startsWith('$') || budy.startsWith('%') || budy.startsWith('&')) {
      if (!isOwner) return m.reply(mess.OnlyOwner);
      try {
         m.reply(`executing...`);
         await exec(budy.slice(2), async (err, stdout) => {
            if (err) {
               return await m.reply('' + JSON.stringify(err, null, 2) + '\n\n' + stdout);
            };
            if (stdout) {
               return await m.reply(stdout);
            };
         });
      } catch (error) {
         return await m.reply(`${error}`);
      };
   };   
};
module.exports = helper
let file = require.resolve(__filename)
fs.watchFile(file, () => {
   fs.unwatchFile(file)
   console.log(chalk.redBright(`Updated ${__filename}`))
   delete require.cache[file]
   require(file)
})