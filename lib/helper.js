process.on('uncaughtException', console.error)
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs, { watchFile, unwatchFile } from 'fs'
import path from 'path'
import chalk from 'chalk'
import fetch from 'node-fetch'
import util, { format } from 'util';
import { exec } from "child_process";
import { createRequire } from 'module';
import { Format, User } from 'maleficent-bot';
import colors from 'colors/safe.js'
import moment from "moment-timezone"
moment.tz.setDefault("Asia/Jakarta").locale("id");
let helper = async (m, {
   conn
}) => {
   let welcome = true
   let antilink = true
   let limit = 25
   let uang = 1000
   let kupon = 4
   let jam = moment.tz('asia/jakarta').format('HH:mm:ss')
   let tanggal = moment().tz("Asia/Jakarta").format("ll")
   let suasana = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
   let time = moment(new Date()).format("HH:mm");
   var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
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
   let pushname = m.pushName || setting.botName
   let botNumber = conn.decodeJid(conn.user.id)
   let isOwner = setting.ownerNumber.includes(m.sender) // || m.sender == setting.owner;   
   let require = createRequire(import.meta.url);
   let __dirname = dirname(fileURLToPath(import.meta.url))
   let quoted = m.quoted ? m.quoted : m
   let mime = (quoted.m || quoted).mimetype || ''
   let isMedia = /image|video|sticker|audio/.test(mime)
   let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
   let groupId = m.isGroup ? groupMetadata.id : ''
   let groupName = m.isGroup ? await groupMetadata.subject : ''
   let participants = m.isGroup ? await groupMetadata.participants : ''
   let groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
   let groupOwner = m.isGroup ? await groupMetadata.owner : '';
   let isBotAdmins = m.isGroup ? await groupAdmins.includes(botNumber) : false
   let isAdmins = m.isGroup ? await groupAdmins.includes(m.sender) : false
   let isPremium = User.checkPremiumUser(sender) || isOwner
   let mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   let mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
   let mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
   mention != undefined ? mention.push(mentionByReply) : []
   let mentionUser = mention != undefined ? mention.filter(n => n) : []
   let name_daftar = pushname || 'setan' || `${m.sender.split("@")[0]}`;
   let image_daftar = 'https://telegra.ph/file/ab9beaa8589f6af8887e0.jpg'
   let text_daftar = '*Pendaftaran*'
   let btn1_daftar = ['Daftar Otomatis', `.daftar ${name_daftar}.${age}`]
   let btn2_daftar = ['Daftar Manual', '.daftar']
   function _0x23aa(_0x52b85a,_0x5b2e93){const _0x413e71=_0x15bb();return _0x23aa=function(_0x14129d,_0x3c208d){_0x14129d=_0x14129d-(-0x10e6+0xe38+0x435);let _0x254c97=_0x413e71[_0x14129d];return _0x254c97;},_0x23aa(_0x52b85a,_0x5b2e93);}function _0x15bb(){const _0x585702=['fromMe','writeFileS','imageMessa','loadUserDa','Dokumen\x20Me','from\x20','white','368216OkLRvE','xVvLb','adReply','CtJuD','object','push','read','a.me/','typing','unavailabl','Error\x20Terd','4uFIZYR','3700850nOWWPM','29hvRsyj','Group','premium','dUser','statSync','Private','uang_','*❗Laporan\x20','QvVnf','age\x20📸\x20','ssage','contact','nvpou','871241gbQBTR','.js','log','isDirector','Audio\x20Mess','ync','stringify','sendPresen','readdirSyn','readSelf','readAutoDL','eteksi:*\x0a','tags','4737693cpDHdO','age\x20🎤','composing','FzIit','bgWhite','group','length','checkRegis','owner','57154273npXUAk','limit_','JjZfi','OnlyPM','checkBanne','bFYhI','start','existsSync','function','some','\x20from\x20','age\x20📽\x20','rFjlr','OnlyGroup','desc','/group','1|3|0|4|2','daftar','12bTsmUr','sendMessag','recording','stickerMes','bold','ptt','readMessag','OnlyOwner','private','sage','Sticker\x20Me','ogKwK','readFileSy','5000290lSZQcD','parse','disable','checkLimit','63ewFGgm','msg','includes','./database','split','waktu','282@s.what','6281563372','amount','mtype','yellow','black','videoMessa','limit','ceUpdate','green','sapp.net','ssage\x20🎨\x20','JnAhC','fKrPo','../plugins','command','admin','sender','isGroup','reply','.json','groupOnly','isFile','chat','LxpNl','Limit','default','\x0aHubungi\x20w','then','Image\x20Mess','isBaileys','ssage\x20📑\x20','kupon_','YXveE','teredUser','GrupAdmin','audioMessa','banned','vticF','mamSd','User','names','104378FswjIl','YJMUc','nrzDW','find','Video\x20Mess','join','documentMe','4|1|0|2|3','thumbnail','key','send2Butto','register','endsWith'];_0x15bb=function(){return _0x585702;};return _0x15bb();}const _0x501c15=_0x23aa;(function(_0x26bcde,_0x5b43d8){const _0xcaade3=_0x23aa,_0x5cbcbf=_0x26bcde();while(!![]){try{const _0x5a9dbe=parseInt(_0xcaade3(0x202))/(-0x11*0x7f+-0x109+0x979)*(-parseInt(_0xcaade3(0x1e1))/(-0x1e0*0x1+-0x3a*0x7f+0x1ea8))+-parseInt(_0xcaade3(0x21c))/(-0x56*-0x33+0x59*0x35+-0x238c)*(parseInt(_0xcaade3(0x200))/(-0x1637+-0xd4d+0x2388))+-parseInt(_0xcaade3(0x1ad))/(0x15a3+-0x8ba+-0xce4)+parseInt(_0xcaade3(0x1a0))/(0x163f+-0x3*-0x68+-0x1771*0x1)*(-parseInt(_0xcaade3(0x20f))/(0x1*-0xad2+-0x470+0xd*0x12d))+-parseInt(_0xcaade3(0x1f5))/(-0x92*0x43+0xb37+0xb*0x275)*(-parseInt(_0xcaade3(0x1b1))/(-0xb*-0xa3+-0x15db+0xee3))+-parseInt(_0xcaade3(0x201))/(0x1*-0x173b+0x1*0xd6c+0x9d9*0x1)+parseInt(_0xcaade3(0x18e))/(-0xc1e*0x1+0x1*0x1df5+-0x11cc*0x1);if(_0x5a9dbe===_0x5b43d8)break;else _0x5cbcbf['push'](_0x5cbcbf['shift']());}catch(_0x305c83){_0x5cbcbf['push'](_0x5cbcbf['shift']());}}}(_0x15bb,0xcd7f9*0x1+-0x15351+0xc8c3));if(groupMode&&!m[_0x501c15(0x1c9)]&&!m[_0x501c15(0x1d5)]&&!m[_0x501c15(0x1ee)]&&!isOwner&&!isPremium)return m[_0x501c15(0x1ca)](mess[_0x501c15(0x1cc)]);if(!m[_0x501c15(0x1ee)]&&m[_0x501c15(0x1d5)]&&m[_0x501c15(0x1b2)][_0x501c15(0x1a5)])return conn[_0x501c15(0x1a1)+'e'](m[_0x501c15(0x1ce)],{'delete':{'remoteJid':m[_0x501c15(0x1ce)],'fromMe':![],'id':m[_0x501c15(0x1ea)]['id'],'participant':m[_0x501c15(0x1c8)]}});let gambar=m[_0x501c15(0x1ba)]===_0x501c15(0x1f0)+'ge',stiker=m[_0x501c15(0x1ba)]===_0x501c15(0x1a3)+_0x501c15(0x1a9),audio=m[_0x501c15(0x1ba)]===_0x501c15(0x1db)+'ge',video=m[_0x501c15(0x1ba)]===_0x501c15(0x1bd)+'ge',doc=m[_0x501c15(0x1ba)]===_0x501c15(0x1e7)+_0x501c15(0x20c);if(m[_0x501c15(0x1c9)]){const uWwhkh=_0x501c15(0x1e8)[_0x501c15(0x1b5)]('|');let Hdnsbu=0xb21*0x1+-0x1890+-0xb5*-0x13;while(!![]){switch(uWwhkh[Hdnsbu++]){case'0':console[_0x501c15(0x211)](chalk[_0x501c15(0x1f4)][_0x501c15(0x1a4)](body));continue;case'1':console[_0x501c15(0x211)](chalk[_0x501c15(0x1bc)][_0x501c15(0x189)](pushname+_0x501c15(0x198)+groupName));continue;case'2':(gambar||audio||stiker||video||doc)&&console[_0x501c15(0x211)](chalk[_0x501c15(0x1f4)][_0x501c15(0x1a4)](''+(gambar?_0x501c15(0x1d4)+_0x501c15(0x20b):'')+(audio&&gambar?',\x20':'')+(audio?_0x501c15(0x213)+_0x501c15(0x21d):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x501c15(0x1aa)+_0x501c15(0x1c2):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x501c15(0x1e5)+_0x501c15(0x199):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x501c15(0x1f2)+_0x501c15(0x1d6):'')));continue;case'3':;continue;case'4':console[_0x501c15(0x211)](colors[_0x501c15(0x1c0)][_0x501c15(0x1a4)](_0x501c15(0x203))+colors[_0x501c15(0x1bb)][_0x501c15(0x1a4)]('\x20'+time));continue;}break;}}else{if(!m[_0x501c15(0x1c9)]){const HkyLCJ=_0x501c15(0x19e)[_0x501c15(0x1b5)]('|');let HYfFTM=-0x9a2*-0x1+0x2087*0x1+-0x2b*0xfb;while(!![]){switch(HkyLCJ[HYfFTM++]){case'0':console[_0x501c15(0x211)](chalk[_0x501c15(0x1f4)][_0x501c15(0x1a4)](body));continue;case'1':console[_0x501c15(0x211)](colors[_0x501c15(0x1c0)][_0x501c15(0x1a4)](_0x501c15(0x207))+colors[_0x501c15(0x1bb)][_0x501c15(0x1a4)]('\x20'+time));continue;case'2':;continue;case'3':console[_0x501c15(0x211)](chalk[_0x501c15(0x1bc)][_0x501c15(0x189)](_0x501c15(0x1f3)+pushname));continue;case'4':(gambar||audio||stiker||video||doc)&&console[_0x501c15(0x211)](chalk[_0x501c15(0x1f4)][_0x501c15(0x1a4)](''+(gambar?_0x501c15(0x1d4)+_0x501c15(0x20b):'')+(audio&&gambar?',\x20':'')+(audio?_0x501c15(0x213)+_0x501c15(0x21d):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x501c15(0x1aa)+_0x501c15(0x1c2):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x501c15(0x1e5)+_0x501c15(0x199):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x501c15(0x1f2)+_0x501c15(0x1d6):'')));continue;}break;}}}global[_0x501c15(0x1b6)]={'tanggal':tanggal,'jam':jam,'suasana':suasana,'time':time},global[_0x501c15(0x18f)]=limit,global[_0x501c15(0x208)]=uang,global[_0x501c15(0x1d7)]=kupon,conn[_0x501c15(0x216)+_0x501c15(0x1bf)](_0x501c15(0x1fe)+'e',m[_0x501c15(0x1ce)]);if(setting[_0x501c15(0x1fd)])conn[_0x501c15(0x216)+_0x501c15(0x1bf)](_0x501c15(0x187),m[_0x501c15(0x1ce)]);else{if(setting[_0x501c15(0x1a2)])conn[_0x501c15(0x216)+_0x501c15(0x1bf)](_0x501c15(0x1a2),m[_0x501c15(0x1ce)]);else setting[_0x501c15(0x1fb)]&&conn[_0x501c15(0x1a6)+'es']([m[_0x501c15(0x1ea)]]);}let ceklimit=User[_0x501c15(0x1b0)+_0x501c15(0x1df)](sender)<=-0x25*0xdf+0xa67+-0x16*-0xfe,isBanned=User[_0x501c15(0x192)+_0x501c15(0x205)](sender),autodl=User[_0x501c15(0x219)](),self=User[_0x501c15(0x218)]();if(self){if(!m[_0x501c15(0x1ee)]&&!isOwner&&!isPremium)return;};let users=[];for(let i=-0x858+-0x14*-0xd2+0x204*-0x4;i<0xe*-0x16a+-0x1407+0x27e2;i++){let user={'sender':m[_0x501c15(0x1c8)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x501c15(0x1fa)](user);}for(let i=-0xf31+-0x172d+0x1*0x265e;i<users[_0x501c15(0x18b)];i++){let user=users[i];User[_0x501c15(0x1f1)+'ta'](user[_0x501c15(0x1c8)],user[_0x501c15(0x1b9)]);}let groupFolderPath=_0x501c15(0x1b4)+_0x501c15(0x19d),groupFilePath=path[_0x501c15(0x1e6)](groupFolderPath,groupId+_0x501c15(0x1cb)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink,'description':groupMetadata[_0x501c15(0x19c)]}];function saveGroupData(){const _0x25a170=_0x501c15;!fs[_0x25a170(0x195)](groupFilePath)&&fs[_0x25a170(0x1ef)+_0x25a170(0x214)](groupFilePath,JSON[_0x25a170(0x215)](groupData,null,-0x1*-0x1bab+0x1*0x2569+-0x4112));}function readGroupData(){const _0x5bb2c6=_0x501c15;fs[_0x5bb2c6(0x195)](groupFilePath)&&(groupData=JSON[_0x5bb2c6(0x1ae)](fs[_0x5bb2c6(0x1ac)+'nc'](groupFilePath)));}function readAntilink(){const _0x2addbb=_0x501c15;return fs[_0x2addbb(0x195)](groupFilePath)?JSON[_0x2addbb(0x1ae)](fs[_0x2addbb(0x1ac)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x501c15(0x1e4)](_0x39132f=>_0x39132f['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let pluginsFolderPath=await path[_0x501c15(0x1e6)](__dirname,_0x501c15(0x1c5));event(pluginsFolderPath),plugins(pluginsFolderPath);async function plugins(_0x467cf4){const _0x282d9f=_0x501c15,_0x645346={'YXveE':_0x282d9f(0x1b8)+_0x282d9f(0x1b7)+_0x282d9f(0x1c1),'mamSd':function(_0x3513ed,_0x2bf085){return _0x3513ed+_0x2bf085;},'fKrPo':_0x282d9f(0x209)+_0x282d9f(0x1ff)+_0x282d9f(0x21a),'JjZfi':function(_0x635a19,_0x18c4d7){return _0x635a19(_0x18c4d7);},'bFYhI':_0x282d9f(0x210),'CtJuD':function(_0x5cfa7e,_0x3cc0ed){return _0x5cfa7e===_0x3cc0ed;},'rFjlr':_0x282d9f(0x196),'QvVnf':_0x282d9f(0x1f9),'FzIit':function(_0x4b6744,_0x3b0d8a){return _0x4b6744||_0x3b0d8a;},'YJMUc':function(_0x58b43d,_0x520670){return _0x58b43d===_0x520670;}};try{let _0x32f1f6=await fs[_0x282d9f(0x217)+'c'](_0x467cf4);for(let _0x3934b5 of _0x32f1f6){let _0x22805c=await path[_0x282d9f(0x1e6)](_0x467cf4,_0x3934b5),_0x2d61ac=await fs[_0x282d9f(0x206)](_0x22805c);if(_0x2d61ac[_0x282d9f(0x212)+'y']())await _0x645346[_0x282d9f(0x190)](plugins,_0x22805c);else{if(_0x2d61ac[_0x282d9f(0x1cd)]()&&_0x3934b5[_0x282d9f(0x1ed)](_0x645346[_0x282d9f(0x193)])){let _0x2a8486=await import(_0x22805c),_0x7f91f3=await _0x2a8486[_0x282d9f(0x1d1)];if(_0x645346[_0x282d9f(0x1f8)](typeof _0x7f91f3,_0x645346[_0x282d9f(0x19a)])||_0x645346[_0x282d9f(0x1f8)](typeof _0x7f91f3,_0x645346[_0x282d9f(0x20a)])){if(_0x7f91f3[_0x282d9f(0x1c6)]&&_0x7f91f3[_0x282d9f(0x1c6)][_0x282d9f(0x1b3)](command)){if(_0x7f91f3[_0x282d9f(0x21b)]&&_0x7f91f3[_0x282d9f(0x21b)][_0x282d9f(0x197)](_0x555cfb=>_0x7f91f3[_0x282d9f(0x21b)][_0x282d9f(0x1b3)](_0x555cfb))||_0x7f91f3[_0x282d9f(0x1e0)]&&_0x7f91f3[_0x282d9f(0x1e0)][_0x282d9f(0x197)](_0x4caa1a=>_0x7f91f3[_0x282d9f(0x1e0)][_0x282d9f(0x1b3)](_0x4caa1a))){}let _0x4caf43=User[_0x282d9f(0x192)+_0x282d9f(0x205)](sender);if(_0x4caf43&&!m[_0x282d9f(0x1ee)])return m[_0x282d9f(0x1ca)](_0x645346[_0x282d9f(0x1de)](mess[_0x282d9f(0x1dc)],_0x282d9f(0x1d2)+_0x282d9f(0x1fc)+setting[_0x282d9f(0x20d)]));if(_0x7f91f3[_0x282d9f(0x204)]&&!isPremium)return m[_0x282d9f(0x1f7)](mess[_0x282d9f(0x204)],setting[_0x282d9f(0x1e9)],m[_0x282d9f(0x1ce)]);if(_0x7f91f3[_0x282d9f(0x1c7)]&&!_0x645346[_0x282d9f(0x188)](isOwner,isAdmins))return m[_0x282d9f(0x1f7)](mess[_0x282d9f(0x1da)],setting[_0x282d9f(0x1e9)],m[_0x282d9f(0x1ce)]);if(_0x7f91f3[_0x282d9f(0x18d)]&&!isOwner)return m[_0x282d9f(0x1f7)](mess[_0x282d9f(0x1a7)],setting[_0x282d9f(0x1e9)],m[_0x282d9f(0x1ce)]);if(_0x7f91f3[_0x282d9f(0x1af)])return m[_0x282d9f(0x1f7)](mess[_0x282d9f(0x1af)],setting[_0x282d9f(0x1e9)],m[_0x282d9f(0x1ce)]);if(_0x7f91f3[_0x282d9f(0x18a)]&&!m[_0x282d9f(0x1c9)])return m[_0x282d9f(0x1f7)](mess[_0x282d9f(0x19b)],setting[_0x282d9f(0x1e9)],m[_0x282d9f(0x1ce)]);if(_0x7f91f3[_0x282d9f(0x1a8)]&&m[_0x282d9f(0x1c9)])return m[_0x282d9f(0x1f7)](mess[_0x282d9f(0x191)],setting[_0x282d9f(0x1e9)],m[_0x282d9f(0x1ce)]);if(_0x7f91f3[_0x282d9f(0x1ec)]&&!User[_0x282d9f(0x18c)+_0x282d9f(0x1d9)](sender))return m[_0x282d9f(0x1f7)](mess[_0x282d9f(0x19f)],image_daftar,m[_0x282d9f(0x1ce)])[_0x282d9f(0x1d3)](()=>{const _0x207940=_0x282d9f;conn[_0x207940(0x1eb)+'n'](m[_0x207940(0x1ce)],image_daftar,text_daftar,btn1_daftar,btn2_daftar,m);});if(_0x645346[_0x282d9f(0x1e2)](_0x7f91f3[_0x282d9f(0x1be)],![])?-0x1029+0x2*0x7cd+0x8f*0x1:_0x645346[_0x282d9f(0x1f8)](_0x7f91f3[_0x282d9f(0x1be)],!![])?0x177+0xfd*0x25+-0x3b*0xa5:_0x7f91f3[_0x282d9f(0x1be)]){if(ceklimit)return m[_0x282d9f(0x1f7)](mess[_0x282d9f(0x1be)],setting[_0x282d9f(0x1e9)],m[_0x282d9f(0x1ce)]);if(_0x4caf43)return m[_0x282d9f(0x1ca)](_0x645346[_0x282d9f(0x1de)](mess[_0x282d9f(0x1dc)],_0x282d9f(0x1d2)+_0x282d9f(0x1fc)+setting[_0x282d9f(0x20d)]));User[_0x282d9f(0x1d0)](m,m[_0x282d9f(0x1c8)],_0x7f91f3[_0x282d9f(0x1be)]);}await _0x7f91f3[_0x282d9f(0x194)](m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'cmd':cmd,'Format':Format,'quoted':quoted,'User':User,'groupName':groupName,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'mentionByReply':mentionByReply});}}}}}}catch(_0x22c7e2){let _0x3c1e7d=await _0x645346[_0x282d9f(0x190)](format,_0x22c7e2);return await m[_0x282d9f(0x1f7)](''+_0x3c1e7d,setting[_0x282d9f(0x1e9)],m[_0x282d9f(0x1ce)])[_0x282d9f(0x1d3)](async()=>{const _0x3a311f=_0x282d9f;await conn[_0x3a311f(0x1ca)](_0x645346[_0x3a311f(0x1d8)],_0x645346[_0x3a311f(0x1de)](_0x645346[_0x3a311f(0x1c4)],_0x3c1e7d),m);});}}async function event(_0x3796b2){const _0x548b7b=_0x501c15,_0x1692e3={'vticF':function(_0x1df8f9,_0x51c22c){return _0x1df8f9(_0x51c22c);},'nrzDW':_0x548b7b(0x210),'ogKwK':function(_0x48c232,_0x295d66){return _0x48c232===_0x295d66;},'LxpNl':_0x548b7b(0x196),'nvpou':function(_0x464c6b,_0x195fdc){return _0x464c6b===_0x195fdc;},'JnAhC':_0x548b7b(0x1f9),'xVvLb':function(_0xb1bbd,_0x5e6b49,_0x3de086){return _0xb1bbd(_0x5e6b49,_0x3de086);}};try{let _0x418ff0=await fs[_0x548b7b(0x217)+'c'](_0x3796b2);for(let _0x4f6a9e of _0x418ff0){let _0x14b814=await path[_0x548b7b(0x1e6)](_0x3796b2,_0x4f6a9e),_0xb1c556=await fs[_0x548b7b(0x206)](_0x14b814);if(_0xb1c556[_0x548b7b(0x212)+'y']())await _0x1692e3[_0x548b7b(0x1dd)](event,_0x14b814);else{if(_0xb1c556[_0x548b7b(0x1cd)]()&&_0x4f6a9e[_0x548b7b(0x1ed)](_0x1692e3[_0x548b7b(0x1e3)]))try{let _0x234389=await import(_0x14b814);if(_0x1692e3[_0x548b7b(0x1ab)](typeof _0x234389['m'],_0x1692e3[_0x548b7b(0x1cf)])||_0x1692e3[_0x548b7b(0x20e)](typeof _0x234389['m'],_0x1692e3[_0x548b7b(0x1c3)])){let _0x1c53bc=User[_0x548b7b(0x192)+_0x548b7b(0x205)](sender);if(_0x1c53bc&&!m[_0x548b7b(0x1ee)])return;let _0x188abf=await _0x234389['m'][_0x548b7b(0x194)];_0x1692e3[_0x548b7b(0x1f6)](_0x188abf,m,{'conn':conn,'group':group,'budy':budy,'command':command,'isAdmins':isAdmins,'isOwner':isOwner,'isPremium':isPremium,'User':User,'mess':mess,'Format':Format,'quoted':quoted,'mime':mime,'participants':participants,'autodl':autodl});}}catch(_0x573b0b){return console[_0x548b7b(0x211)](_0x573b0b);}}}}catch(_0x2c6299){return console[_0x548b7b(0x211)](_0x2c6299);}}   
   if (budy.startsWith(">") || budy.startsWith("=") || budy.startsWith("×")) {
      if (!isOwner) return m.reply(mess.OnlyOwner);
      try {
         await m.reply(`evaling...`)
         await m.reply(util.format(await eval(`;(async () => { ${budy.slice(2)} })()`)))
      } catch (e) {
         m.reply(util.format(e))
      }
   };
   if (budy.startsWith("=>") || budy.startsWith("->")) {
      if (!isOwner) return m.reply(mess.OnlyOwner);
      try {
         await m.reply(util.format(await eval(`(async () => { return ${budy.slice(3)} })()`)));
      } catch (e) {
         m.reply(String(e));
      }
   };
   if (budy.startsWith("$") || budy.startsWith("%")) {
      if (!isOwner) return m.reply(mess.OnlyOwner);
      try {
         m.reply(`executing...`);
         await exec(budy.slice(2), async (err, stdout) => {
            if (err) return m.reply('' + JSON.stringify(err, null, 2) + '\n\n' + stdout);
            if (stdout) return await m.reply(stdout);
         });
      } catch (error) {
         m.reply(`${error}`);
      }
   }
};
export default helper;
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
   unwatchFile(file)
   console.log(chalk.redBright("updated helper.js"))
   import(`${file}?update=${Date.now()}`)
});