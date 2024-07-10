process.on('uncaughtException', console.error);
import { fileURLToPath } from 'url'
import fs, { watchFile, unwatchFile } from 'fs'
import path from 'path'
import chalk from 'chalk'
import fetch from 'node-fetch'
import util, { format } from 'util';
import { exec } from "child_process";
import { createRequire } from 'module';
import { Format, User, _dirname } from 'maleficent-bot';
import colors from 'colors/safe.js'
import moment from "moment-timezone"
moment.tz.setDefault("Asia/Jakarta").locale("id");
let helper = async (m, { 
   conn
}) => {   
   let jam = moment.tz('asia/jakarta').format('HH:mm:ss')
   let tanggal = moment().tz("Asia/Jakarta").format("ll")
   let suasana = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
   let time = moment(new Date()).format("HH:mm");   
   let welcome = true
   let antilink = true
   let limit = 25
   let uang = 1000
   let kupon = 5
   global.limit_ = limit;
   global.uang_ = uang;
   global.kupon_ = kupon;   
   global.qm = { quoted: m };
   global.waktu = { tanggal, jam, suasana, time };   
   var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text ) : ''
   var budy = (typeof m.text == 'string' ? m.text : '')
   var type = Object.keys(m.message)[0]
   let prefix = /^./.test(body) ? body.match(/^./gi) : '#';
   let age = m.sender.split("@")[0].substring(m.sender.split("@")[0].length - 2);
   let isCmd = body.startsWith(prefix)
   let sender = m.sender;      
   let command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
   let cmd = body.slice(1).trim().split(/ +/).shift().toLowerCase()
   let args = body.trim().split(/ +/).slice(1)
   let text = args.join(' ');
   let pushname = m.pushName || setting.botName || m.sender.split('@')[0];
   let botNumber = conn.decodeJid(conn.user.id)
   let isOwner = setting.ownerNumber.map(num => `${num}@s.whatsapp.net`).includes(m.sender);
   let require = createRequire(import.meta.url);
   let quoted = m.quoted ? m.quoted : m
   let mime = (quoted.m || quoted).mimetype || ''
   let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
   let groupId = m.isGroup ? groupMetadata.id : ''
   let groupName = m.isGroup ? groupMetadata.subject : ''
   let participants = m.isGroup ? groupMetadata.participants : ''
   let groupAdmins = m.isGroup ? participants.filter(v => v.admin !== null).map(v => v.id) : ''
   let groupOwner = m.isGroup ? groupMetadata.owner : '';
   let isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
   let isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
   let isPremium = User.checkPremiumUser(sender) || isOwner
   let mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   let mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
   let mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
   mention != undefined ? mention.push(mentionByReply) : []
   let mentionUser = mention != undefined ? mention.filter(n => n) : []
   let name_daftar = pushname || 'Setan' || `${m.sender.split("@")[0]}`;
   let image_daftar = 'https://telegra.ph/file/ab9beaa8589f6af8887e0.jpg'
   let text_daftar = '*Pendaftaran*'
   let btn1_daftar = ['Daftar Otomatis', `.daftar ${name_daftar}.${age}`]
   let btn2_daftar = ['Daftar Manual', '.daftar']   
   let ceklimit = User.checkLimitUser(sender) <= 0;
   let isBanned = User.checkBannedUser(sender);
   let autodl = User.readAutoDL();
   User.isDataUser(m, { User, uang, kupon, limit });   
   let isDataGroup = { groupId, groupName, welcome, antilink, groupMetadata };
   User.updateGroup(isDataGroup);
   let { group } = User.updateGroup(isDataGroup);
   let extra = { conn, prefix, command, text, mime, args, cmd, Format, quoted, User, groupName, participants, groupAdmins, mentionUser, mentionByReply, group, budy, isAdmins, isOwner, isPremium, autodl };
   let isUser = { isBanned, ceklimit, image_daftar, text_daftar, btn1_daftar, btn2_daftar };
   _dirname(m, extra, isUser);
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
         return m.reply(`${error}`);
      };
   };
};
export default helper;
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
   unwatchFile(file)
   console.log(chalk.redBright("updated helper.js"))
   import(`${file}?update=${Date.now()}`)
});
