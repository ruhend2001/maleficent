const axios = require('axios')
const chalk = require('chalk');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { exec } = require("child_process");
const moment = require("moment-timezone");
const { format } = require('util'), fs = require('fs');
/** some require for evaluate sometimes **/
const helper = async (m, {
   conn,
   store
}) => {
   const type = typeof m.message === 'object' ? Object.keys(m.message)[0] : {}, budy = typeof m.text == 'string' ? m.text : '';
   const age = m.sender.split("@")[0].substring(m.sender.split("@")[0].length - 2), body = m.body;
   const cmd = body?.slice(1).trim().split(/ +/).shift().toLowerCase()
   const args = body?.trim().split(/ +/).slice(1), text = args?.join(' ');
   const pushname = m.pushName || setting.botName.trim() || m.sender.split('@')[0];
   const botNumber = conn.decodeJid(conn.user.id), isMe = botNumber.split('@')[0];
   const isOwner = [...setting.ownerNumber, isMe].map(num => `${num}@s.whatsapp.net`).includes(m.sender);
   const quoted = m.quoted ? m.quoted : m, mime = m.quoted ? m.quoted.mimetype : m.mtype;
   const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
   const groupId = m.isGroup ? groupMetadata?.id : ''
   const groupName = m.isGroup ? groupMetadata?.subject : ''
   const groupDesc = m.isGroup ? groupMetadata?.desc : ''
   const participants = m.isGroup ? groupMetadata?.participants : ''
   const groupAdmins = m.isGroup ? participants?.filter(v => v.admin !== null).map(v => v.id) : ''
   const groupOwner = m.isGroup ? groupMetadata?.owner : '';
   const isBotAdmins = m.isGroup ? groupAdmins?.includes(botNumber) : false
   const isAdmins = m.isGroup ? groupAdmins?.includes(m.sender) : false
   const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   const mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
   const mention = typeof (mentionByTag) == 'string' ? [mentionByTag] : mentionByTag, command = m.command, prefix = m.prefix; 
   mention != undefined ? mention.push(mentionByReply) : []
   moment.tz.setDefault("Asia/Jakarta").locale("id");
   const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
   const tanggal = moment().tz("Asia/Jakarta").format("ll")
   const suasana = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
   const time = moment(new Date()).format("HH:mm");
   global.waktu = { tanggal, jam, suasana, time };
   const mentionUser = mention != undefined ? mention.filter(n => n) : []
   const isNumber = x => typeof x === 'number' && !isNaN(x);
   const users = global.db.users[m.sender] ? global.db.users[m.sender] : global.db.users[m.sender] = {}
   if (Object.keys(users).length < 1) {
      if (!('name' in users)) users.name = pushname
      if (!('registered' in users)) users.registered = false
      if (!('registeredTime' in users)) users.registeredTime = ''
      if (!('umur' in users)) users.umur = ''
      if (!('seri' in users)) users.seri = ''
      if (!('premium' in users)) users.premium = false
      if (!('premiumTime' in users)) users.premiumTime = ''
      if (!('banned' in users)) users.banned = false
      if (!('bannedReason' in users)) users.bannedReason = ''
      if (!isNumber(users.limit)) users.limit = isOwner ? 100 : 20
      if (!isNumber(users.kupon)) users.kupon = 5
      if (!isNumber(users.uang)) users.uang = 1000
      if (!isNumber(users.hitCmd)) users.hitCmd = 0
      if (!('notes' in users)) users.notes = ''
      if (!('lastClaim' in users)) users.lastClaim = ''
      if (!('lastHour' in users)) users.lastHour = ''
      if (!('lastUang' in users)) users.lastUang = ''
      if (!('lastKupon' in users)) users.lastKupon = ''
      if (!('lastSpin' in users)) users.lastSpin = ''
      if (!isNumber(users.spin)) users.spin = 10
      if (!('is_spin' in users)) users.is_spin = false
      if (!isNumber(users.afkTime)) users.afkTime = -1
      if (!('afkReason' in users)) users.afkReason = ''
      if (!('chat_ai' in users)) users.chat_ai = false
      if (!('event_cmd' in users)) users.event_cmd = {}
   };
   const groups = global.db.chats[groupId] ? global.db.chats[groupId] : global.db.chats[groupId] = {}   
   if (Object.keys(groups).length < 1) {
      if (!('name' in groups)) groups.name = groupName
      if (!('welcome' in groups)) groups.welcome = true
      if (!('antilink' in groups)) groups.antilink = true
      if (!('mute' in groups)) groups.mute = false
      if (!('absen' in groups)) groups.absen = false
      if (!isNumber(groups.absen_count)) groups.absen_count = 0
      if (!('absen_user' in groups)) groups.absen_user = []
      if (!('absen_text' in groups)) groups.absen_text = ''
      if (!('viewOnce' in groups)) groups.viewOnce = true
      if (!('antiToxic' in groups)) groups.antiToxic = true
      if (!('antiPhoto' in groups)) groups.antiPhoto = false
      if (!('antiBot' in groups)) groups.antiBot = false
      if (!('chat_ai' in groups)) groups.chat_ai = false
      if (!('description' in groups)) groups.description = groupDesc
      if (!('welcomeCaption' in groups)) groups.welcomeCaption = global.group_welcome || ''
      if (!('byeCaption' in groups)) groups.byeCaption = global.group_bye || ''
   };
   if (global.db.chats['']) delete global.db.chats['']
   const settings = global.db.settings ? global.db.settings : global.db.settings = {}   
   if (Object.keys(settings).length < 1) {
      if (!isNumber(settings.menu_type)) settings.menu_type = 2
      if (!('prefix' in settings)) settings.prefix = 'multi'
      if (!('cover' in settings)) settings.cover = setting.thumbnail
      if (!isNumber(settings.status)) settings.status = 0
      if (!('readsw' in settings)) settings.readsw = true
      if (!('autobio' in settings)) settings.autobio = true
      if (!('antispam' in settings)) settings.antispam = true
   };
   if (typeof global.db.menfess !== 'object') global.db.menfess = {}
   if (!('stores' in global.db)) global.db.stores = {}; global.cover = db.settings.cover;
   if (typeof global.db.stores !== 'object') global.db.stores = {}      
   const isPremium = db.users[m.sender].premium || isOwner;
   const image_daftar = 'https://telegra.ph/file/ab9beaa8589f6af8887e0.jpg'
   const name_daftar = pushname || 'Setan' || `${m.sender.split("@")[0]}`;
   const text_daftar = '*Pendaftaran*'
   const button_daftar = [
      ['Daftar Otomatis', `.daftar ${name_daftar}.${age}`],
      ['Daftar Manual', '.daftar']
   ]; 
   const extra = { Format, conn, prefix, command, text, mime, args, cmd, quoted, groupName, participants, groupAdmins, mentionUser, mentionByReply, budy, isAdmins, isBotAdmins, isOwner, isPremium, store };
   const register = { image_daftar, text_daftar, button_daftar };   
   Connect(m, extra, register);
   Format.Logger(m, { conn, time, chalk, pushname, groupName, body }); 
   if (budy.startsWith('>') || budy.startsWith('©')) {
      if (!isOwner || m.isBaileys) return
      try {
         return m.reply(`> evaling...`).then(async () => {
            return await m.reply(format(await eval(`(async () => { ${budy.slice(2)} })()`)));
         })
      } catch (e) {
         return await m.reply(format(e))
      }
   };
   if (budy.startsWith('=>') || budy.startsWith('->') || budy.startsWith('~>')) {
      if (!isOwner || m.isBaileys) return
      try {
         return await m.reply(format(await eval(`(async () => { return ${budy.slice(3)} })()`)));
      } catch (e) {
         return await m.reply(String(e));
      }
   };
   if (budy.startsWith('$') || budy.startsWith('%') || budy.startsWith('&')) {
      if (!isOwner || m.isBaileys) return      
      return m.reply('> executing...').then(async () => {
         try {
            return exec(budy.slice(2), async (error, stdout) => {
               if (error) await m.reply(format(error));
               if (stdout) await m.reply(format(stdout));
            })
         } catch (e) {
            return await m.reply(format(e));
         }
      })
   }
}
module.exports = helper