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
   let uang = 500
   let kupon = 3   
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
   function _0x6ccf(){const _0x4c464c=['jABii','object','log','writeFileS','age\x20📽\x20','fromMe','chat','1415767KgqGnp','bold','OnlyOwner','readMessag','\x0aHubungi\x20w','6281563372','Dokumen\x20Me','limit_','split','qhbgu','waktu','sendMessag','1297146MhNAPX','group','LDNqV','checkPremi','uang_','rTDRw','checkBanne','ssage\x20📑\x20','eteksi:*\x0a','limit','sage','unavailabl','amount','recording','videoMessa','zKTqm','age\x20📸\x20','yellow','stickerMes','1|3|2|4|0','thumbnail','isBaileys','ceUpdate','teredUser','loadUserDa','.json','GrupAdmin','\x20from\x20','Audio\x20Mess','readSelf','premium','read','names','Group','MBygC','age\x20🎤','WvxfD','statSync','find','isFile','MCLEy','User','existsSync','ssage','groupOnly','Image\x20Mess','send2Butto','readFileSy','endsWith','banned','msg','readdirSyn','mtype','cchTI','audioMessa','sapp.net','Video\x20Mess','hiRLC','some','then','includes','umUser','29188yvBfgc','974488yRrkZk','Private','documentMe','/group','282@s.what','*❗Laporan\x20','JlEvJ','length','bgWhite','join','869550QeVQXU','YbeuK','command','reply','isDirector','readAutoDL','dUser','push','ptt','private','fvGvm','Limit','owner','contact','NYoAN','checkLimit','checkRegis','isGroup','daftar','register','5667750KqihCR','Error\x20Terd','typing','OnlyPM','adReply','./database','black','default','354XDQnhW','5575345StIzgX','sender','key','OnlyGroup','start','TUtRN','composing','a.me/','stringify','desc','aaVEt','ssage\x20🎨\x20','PFvon','parse','white','54Xyqbzw','0|3|2|1|4','../plugins','Sticker\x20Me','.js','ync','green','disable','function','from\x20','cwjKU','21ZGDDeH','tags','kupon_','imageMessa','admin','sendPresen'];_0x6ccf=function(){return _0x4c464c;};return _0x6ccf();}const _0x33411f=_0x90cd;(function(_0xd5baa0,_0x2092d1){const _0x79ec3f=_0x90cd,_0x3717b6=_0xd5baa0();while(!![]){try{const _0x2f40b9=parseInt(_0x79ec3f(0x10d))/(-0x1f12+-0x1494+0x33a7)+parseInt(_0x79ec3f(0xc9))/(-0x286*0xa+0x16f7+0x247)+-parseInt(_0x79ec3f(0xe5))/(0xd9a+0xf5e+-0x1cf5)*(-parseInt(_0x79ec3f(0xbe))/(-0x2031*0x1+-0x1df8+0x5a7*0xb))+parseInt(_0x79ec3f(0xe6))/(0x1*0xca3+-0x14e1+0x5*0x1a7)+-parseInt(_0x79ec3f(0x119))/(0x66*0x18+0x165f+0x15*-0x185)*(-parseInt(_0x79ec3f(0x100))/(0x24e5*0x1+0x488+-0x2966))+-parseInt(_0x79ec3f(0xbf))/(-0x19cf+0x2042+-0x1f*0x35)+parseInt(_0x79ec3f(0xf5))/(0x11*-0x13f+-0x1*0x1a7a+0x2fb2)*(-parseInt(_0x79ec3f(0xdd))/(-0xc2*0x4+0x12f7+-0xd*0x139));if(_0x2f40b9===_0x2092d1)break;else _0x3717b6['push'](_0x3717b6['shift']());}catch(_0x1bf65d){_0x3717b6['push'](_0x3717b6['shift']());}}}(_0x6ccf,0x29f3e+0x12320f*0x1+-0x6478c));let isPremium=User[_0x33411f(0x83)+_0x33411f(0xbd)](sender);if(groupMode&&!m[_0x33411f(0xda)]&&!m[_0x33411f(0x95)]&&!m[_0x33411f(0x10b)]&&!isOwner&&!isPremium)return m[_0x33411f(0xcc)](mess[_0x33411f(0xac)]);if(!m[_0x33411f(0x10b)]&&m[_0x33411f(0x95)]&&m[_0x33411f(0xb2)][_0x33411f(0xd1)])return conn[_0x33411f(0x118)+'e'](m[_0x33411f(0x10c)],{'delete':{'remoteJid':m[_0x33411f(0x10c)],'fromMe':![],'id':m[_0x33411f(0xe8)]['id'],'participant':m[_0x33411f(0xe7)]}});let gambar=m[_0x33411f(0xb4)]===_0x33411f(0x103)+'ge',stiker=m[_0x33411f(0xb4)]===_0x33411f(0x92)+_0x33411f(0x8a),audio=m[_0x33411f(0xb4)]===_0x33411f(0xb6)+'ge',video=m[_0x33411f(0xb4)]===_0x33411f(0x8e)+'ge',doc=m[_0x33411f(0xb4)]===_0x33411f(0xc1)+_0x33411f(0xab);if(m[_0x33411f(0xda)]){const VimfIe=_0x33411f(0xf6)[_0x33411f(0x115)]('|');let ffiqin=-0x8c7*0x1+-0x1cf7*-0x1+-0x1430;while(!![]){switch(VimfIe[ffiqin++]){case'0':console[_0x33411f(0x108)](colors[_0x33411f(0xfb)][_0x33411f(0x10e)](_0x33411f(0xa1))+colors[_0x33411f(0x91)][_0x33411f(0x10e)]('\x20'+time));continue;case'1':(gambar||audio||stiker||video||doc)&&console[_0x33411f(0x108)](chalk[_0x33411f(0xf4)][_0x33411f(0x10e)](''+(gambar?_0x33411f(0xad)+_0x33411f(0x90):'')+(audio&&gambar?',\x20':'')+(audio?_0x33411f(0x9c)+_0x33411f(0xa3):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x33411f(0xf8)+_0x33411f(0xf1):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x33411f(0xb8)+_0x33411f(0x10a):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x33411f(0x113)+_0x33411f(0x87):'')));continue;case'2':console[_0x33411f(0x108)](chalk[_0x33411f(0xf4)][_0x33411f(0x10e)](body));continue;case'3':console[_0x33411f(0x108)](chalk[_0x33411f(0xe3)][_0x33411f(0xc7)](pushname+_0x33411f(0x9b)+groupName));continue;case'4':;continue;}break;}}else{if(!m[_0x33411f(0xda)]){const lmRjkF=_0x33411f(0x93)[_0x33411f(0x115)]('|');let LSnQrq=-0x1*-0x11dc+-0x2fa*0x2+-0x1fc*0x6;while(!![]){switch(lmRjkF[LSnQrq++]){case'0':;continue;case'1':console[_0x33411f(0x108)](colors[_0x33411f(0xfb)][_0x33411f(0x10e)](_0x33411f(0xc0))+colors[_0x33411f(0x91)][_0x33411f(0x10e)]('\x20'+time));continue;case'2':console[_0x33411f(0x108)](chalk[_0x33411f(0xf4)][_0x33411f(0x10e)](body));continue;case'3':console[_0x33411f(0x108)](chalk[_0x33411f(0xe3)][_0x33411f(0xc7)](_0x33411f(0xfe)+pushname));continue;case'4':(gambar||audio||stiker||video||doc)&&console[_0x33411f(0x108)](chalk[_0x33411f(0xf4)][_0x33411f(0x10e)](''+(gambar?_0x33411f(0xad)+_0x33411f(0x90):'')+(audio&&gambar?',\x20':'')+(audio?_0x33411f(0x9c)+_0x33411f(0xa3):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x33411f(0xf8)+_0x33411f(0xf1):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x33411f(0xb8)+_0x33411f(0x10a):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x33411f(0x113)+_0x33411f(0x87):'')));continue;}break;}}}global[_0x33411f(0x117)]={'tanggal':tanggal,'jam':jam,'suasana':suasana,'time':time},global[_0x33411f(0x114)]=limit,global[_0x33411f(0x84)]=uang,global[_0x33411f(0x102)]=kupon,conn[_0x33411f(0x105)+_0x33411f(0x96)](_0x33411f(0x8b)+'e',m[_0x33411f(0x10c)]);if(setting[_0x33411f(0xdf)])conn[_0x33411f(0x105)+_0x33411f(0x96)](_0x33411f(0xec),m[_0x33411f(0x10c)]);else{if(setting[_0x33411f(0x8d)])conn[_0x33411f(0x105)+_0x33411f(0x96)](_0x33411f(0x8d),m[_0x33411f(0x10c)]);else setting[_0x33411f(0x9f)]&&conn[_0x33411f(0x110)+'es']([m[_0x33411f(0xe8)]]);}let ceklimit=User[_0x33411f(0xd8)+_0x33411f(0xa9)](sender)<=-0x2*-0x829+0x1a37+-0x2a89,isBanned=User[_0x33411f(0x86)+_0x33411f(0xcf)](sender),autodl=User[_0x33411f(0xce)](),self=User[_0x33411f(0x9d)]();if(self){if(!m[_0x33411f(0x10b)]&&!isOwner&&!isPremium)return;};let users=[];for(let i=-0xb0e+0x1597+-0xa89*0x1;i<-0x1472+0x155e+0xdd*-0x1;i++){let user={'sender':m[_0x33411f(0xe7)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x33411f(0xd0)](user);}for(let i=0x1b31*-0x1+0xe8*0x24+-0x56f;i<users[_0x33411f(0xc6)];i++){let user=users[i];User[_0x33411f(0x98)+'ta'](user[_0x33411f(0xe7)],user[_0x33411f(0x8c)]);}let groupFolderPath=_0x33411f(0xe2)+_0x33411f(0xc2),groupFilePath=path[_0x33411f(0xc8)](groupFolderPath,groupId+_0x33411f(0x99)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink,'description':groupMetadata[_0x33411f(0xef)]}];function saveGroupData(){const _0x28fe2d=_0x33411f;!fs[_0x28fe2d(0xaa)](groupFilePath)&&fs[_0x28fe2d(0x109)+_0x28fe2d(0xfa)](groupFilePath,JSON[_0x28fe2d(0xee)](groupData,null,-0x1*-0x24ce+-0x33*-0xb7+-0x3*0x186b));}function readGroupData(){const _0x1ef07a=_0x33411f;fs[_0x1ef07a(0xaa)](groupFilePath)&&(groupData=JSON[_0x1ef07a(0xf3)](fs[_0x1ef07a(0xaf)+'nc'](groupFilePath)));}function readAntilink(){const _0x3c181d=_0x33411f;return fs[_0x3c181d(0xaa)](groupFilePath)?JSON[_0x3c181d(0xf3)](fs[_0x3c181d(0xaf)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x33411f(0xa6)](_0x1ddf0d=>_0x1ddf0d['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let pluginsFolderPath=await path[_0x33411f(0xc8)](__dirname,_0x33411f(0xf7));event(pluginsFolderPath),plugins(pluginsFolderPath);async function plugins(_0x24251e){const _0x3afbac=_0x33411f,_0x26eb5c={'jABii':_0x3afbac(0x112)+_0x3afbac(0xc3)+_0x3afbac(0xb7),'cchTI':function(_0x5484b5,_0x28c857){return _0x5484b5+_0x28c857;},'TUtRN':_0x3afbac(0xc4)+_0x3afbac(0xde)+_0x3afbac(0x88),'hiRLC':function(_0x5e4a2c,_0x4297b5){return _0x5e4a2c(_0x4297b5);},'PFvon':_0x3afbac(0xf9),'qhbgu':function(_0x57e9cc,_0x18b902){return _0x57e9cc===_0x18b902;},'NYoAN':_0x3afbac(0xfd),'MCLEy':_0x3afbac(0x107),'aaVEt':function(_0x21f413,_0x1ba2dc){return _0x21f413+_0x1ba2dc;},'JlEvJ':function(_0x55cfe4,_0x1ff4b5){return _0x55cfe4||_0x1ff4b5;},'cwjKU':function(_0x500c1f,_0x1af637){return _0x500c1f+_0x1af637;},'rTDRw':function(_0x51cbab,_0x4c5426){return _0x51cbab(_0x4c5426);}};try{let _0x58b135=await fs[_0x3afbac(0xb3)+'c'](_0x24251e);for(let _0x23a6c6 of _0x58b135){let _0x1d19b9=await path[_0x3afbac(0xc8)](_0x24251e,_0x23a6c6),_0x200dd4=await fs[_0x3afbac(0xa5)](_0x1d19b9);if(_0x200dd4[_0x3afbac(0xcd)+'y']())await _0x26eb5c[_0x3afbac(0xb9)](plugins,_0x1d19b9);else{if(_0x200dd4[_0x3afbac(0xa7)]()&&_0x23a6c6[_0x3afbac(0xb0)](_0x26eb5c[_0x3afbac(0xf2)])){let _0x4e7d0f=await import(_0x1d19b9),_0x1ba24e=await _0x4e7d0f[_0x3afbac(0xe4)];if(_0x26eb5c[_0x3afbac(0x116)](typeof _0x1ba24e,_0x26eb5c[_0x3afbac(0xd7)])||_0x26eb5c[_0x3afbac(0x116)](typeof _0x1ba24e,_0x26eb5c[_0x3afbac(0xa8)])){if(_0x1ba24e[_0x3afbac(0xcb)]&&_0x1ba24e[_0x3afbac(0xcb)][_0x3afbac(0xbc)](command)){if(_0x1ba24e[_0x3afbac(0x101)]&&_0x1ba24e[_0x3afbac(0x101)][_0x3afbac(0xba)](_0x2a8ca3=>_0x1ba24e[_0x3afbac(0x101)][_0x3afbac(0xbc)](_0x2a8ca3))||_0x1ba24e[_0x3afbac(0xa0)]&&_0x1ba24e[_0x3afbac(0xa0)][_0x3afbac(0xba)](_0x19f6a5=>_0x1ba24e[_0x3afbac(0xa0)][_0x3afbac(0xbc)](_0x19f6a5))){}let _0x48a9bd=User[_0x3afbac(0x86)+_0x3afbac(0xcf)](sender);if(_0x48a9bd&&!m[_0x3afbac(0x10b)])return m[_0x3afbac(0xcc)](_0x26eb5c[_0x3afbac(0xf0)](mess[_0x3afbac(0xb1)],_0x3afbac(0x111)+_0x3afbac(0xed)+setting[_0x3afbac(0xd6)]));if(_0x1ba24e[_0x3afbac(0x9e)]&&!isPremium)return m[_0x3afbac(0xe1)](mess[_0x3afbac(0x9e)],setting[_0x3afbac(0x94)],m[_0x3afbac(0x10c)]);if(_0x1ba24e[_0x3afbac(0x104)]&&!_0x26eb5c[_0x3afbac(0xc5)](isOwner,isAdmins))return m[_0x3afbac(0xe1)](mess[_0x3afbac(0x9a)],setting[_0x3afbac(0x94)],m[_0x3afbac(0x10c)]);if(_0x1ba24e[_0x3afbac(0xd5)]&&!isOwner)return m[_0x3afbac(0xe1)](mess[_0x3afbac(0x10f)],setting[_0x3afbac(0x94)],m[_0x3afbac(0x10c)]);if(_0x1ba24e[_0x3afbac(0xfc)])return m[_0x3afbac(0xe1)](mess[_0x3afbac(0xfc)],setting[_0x3afbac(0x94)],m[_0x3afbac(0x10c)]);if(_0x1ba24e[_0x3afbac(0x11a)]&&!m[_0x3afbac(0xda)])return m[_0x3afbac(0xe1)](mess[_0x3afbac(0xe9)],setting[_0x3afbac(0x94)],m[_0x3afbac(0x10c)]);if(_0x1ba24e[_0x3afbac(0xd2)]&&m[_0x3afbac(0xda)])return m[_0x3afbac(0xe1)](mess[_0x3afbac(0xe0)],setting[_0x3afbac(0x94)],m[_0x3afbac(0x10c)]);if(_0x1ba24e[_0x3afbac(0xdc)]&&!User[_0x3afbac(0xd9)+_0x3afbac(0x97)](sender))return m[_0x3afbac(0xe1)](mess[_0x3afbac(0xdb)],image_daftar,m[_0x3afbac(0x10c)])[_0x3afbac(0xbb)](()=>{const _0x4978da=_0x3afbac;conn[_0x4978da(0xae)+'n'](m[_0x4978da(0x10c)],image_daftar,text_daftar,btn1_daftar,btn2_daftar,m);});if(_0x26eb5c[_0x3afbac(0x116)](_0x1ba24e[_0x3afbac(0x89)],![])?-0x43*-0x2+0x13d3+0x1*-0x1459:_0x26eb5c[_0x3afbac(0x116)](_0x1ba24e[_0x3afbac(0x89)],!![])?-0x2531+0x106f+0x14c3:_0x1ba24e[_0x3afbac(0x89)]){if(ceklimit)return m[_0x3afbac(0xe1)](mess[_0x3afbac(0x89)],setting[_0x3afbac(0x94)],m[_0x3afbac(0x10c)]);if(_0x48a9bd)return m[_0x3afbac(0xcc)](_0x26eb5c[_0x3afbac(0xff)](mess[_0x3afbac(0xb1)],_0x3afbac(0x111)+_0x3afbac(0xed)+setting[_0x3afbac(0xd6)]));User[_0x3afbac(0xd4)](m,m[_0x3afbac(0xe7)],_0x1ba24e[_0x3afbac(0x89)]);}await _0x1ba24e[_0x3afbac(0xea)](m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'cmd':cmd,'Format':Format,'quoted':quoted,'User':User,'groupName':groupName,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'mentionByReply':mentionByReply});}}}}}}catch(_0x559885){let _0x54f97f=await _0x26eb5c[_0x3afbac(0x85)](format,_0x559885);return await m[_0x3afbac(0xe1)](''+_0x54f97f,setting[_0x3afbac(0x94)],m[_0x3afbac(0x10c)])[_0x3afbac(0xbb)](async()=>{const _0x5c1f69=_0x3afbac;await conn[_0x5c1f69(0xcc)](_0x26eb5c[_0x5c1f69(0x106)],_0x26eb5c[_0x5c1f69(0xb5)](_0x26eb5c[_0x5c1f69(0xeb)],_0x54f97f),m);});}}function _0x90cd(_0x444f19,_0x5c0232){const _0x50b247=_0x6ccf();return _0x90cd=function(_0x3c04eb,_0x22fe4c){_0x3c04eb=_0x3c04eb-(-0x23f7+0x1165+-0x1315*-0x1);let _0x22f891=_0x50b247[_0x3c04eb];return _0x22f891;},_0x90cd(_0x444f19,_0x5c0232);}async function event(_0x1d0b5f){const _0x1bc77c=_0x33411f,_0xb8739a={'YbeuK':function(_0xb0badb,_0xba4fd1){return _0xb0badb(_0xba4fd1);},'zKTqm':_0x1bc77c(0xf9),'fvGvm':function(_0x8c35d8,_0x27f05d){return _0x8c35d8===_0x27f05d;},'LDNqV':_0x1bc77c(0xfd),'MBygC':_0x1bc77c(0x107),'WvxfD':function(_0x3825a6,_0x25dc87,_0x34fec4){return _0x3825a6(_0x25dc87,_0x34fec4);}};try{let _0x325c73=await fs[_0x1bc77c(0xb3)+'c'](_0x1d0b5f);for(let _0x2f9f5b of _0x325c73){let _0x5ab45f=await path[_0x1bc77c(0xc8)](_0x1d0b5f,_0x2f9f5b),_0x420a39=await fs[_0x1bc77c(0xa5)](_0x5ab45f);if(_0x420a39[_0x1bc77c(0xcd)+'y']())await _0xb8739a[_0x1bc77c(0xca)](event,_0x5ab45f);else{if(_0x420a39[_0x1bc77c(0xa7)]()&&_0x2f9f5b[_0x1bc77c(0xb0)](_0xb8739a[_0x1bc77c(0x8f)]))try{let _0x12401c=await import(_0x5ab45f);if(_0xb8739a[_0x1bc77c(0xd3)](typeof _0x12401c['m'],_0xb8739a[_0x1bc77c(0x11b)])||_0xb8739a[_0x1bc77c(0xd3)](typeof _0x12401c['m'],_0xb8739a[_0x1bc77c(0xa2)])){let _0xdf38d0=User[_0x1bc77c(0x86)+_0x1bc77c(0xcf)](sender);if(_0xdf38d0&&!m[_0x1bc77c(0x10b)])return;let _0x3141ad=await _0x12401c['m'][_0x1bc77c(0xea)];_0xb8739a[_0x1bc77c(0xa4)](_0x3141ad,m,{'conn':conn,'group':group,'budy':budy,'command':command,'isAdmins':isAdmins,'isOwner':isOwner,'isPremium':isPremium,'User':User,'mess':mess,'Format':Format,'quoted':quoted,'mime':mime,'participants':participants,'autodl':autodl});}}catch(_0x31f0f3){return console[_0x1bc77c(0x108)](_0x31f0f3);}}}}catch(_0x546b35){return console[_0x1bc77c(0x108)](_0x546b35);}}
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