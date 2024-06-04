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
   const _0x85d33f=_0x1c17;(function(_0x4cfa0e,_0x7219f8){const _0x256a61=_0x1c17,_0xdfe133=_0x4cfa0e();while(!![]){try{const _0xfd7ccf=parseInt(_0x256a61(0x12a))/(0xca7+-0x43*-0x5f+-0x2583)*(-parseInt(_0x256a61(0x194))/(-0x1*0x26b1+-0x89b*0x4+0x491f))+-parseInt(_0x256a61(0x116))/(0x1743+0x1*-0xe6d+-0x8d3)+-parseInt(_0x256a61(0x14b))/(0xf1+0x2*-0xcfc+-0x190b*-0x1)*(parseInt(_0x256a61(0x141))/(-0x13d*-0x11+-0x2*0xee+-0x2*0x996))+-parseInt(_0x256a61(0x15b))/(0x1921+0x1768+-0x3083)*(parseInt(_0x256a61(0x10a))/(0x13f4+-0x410+0x1*-0xfdd))+-parseInt(_0x256a61(0x117))/(0xa25+-0x2*0xc26+-0xe2f*-0x1)+parseInt(_0x256a61(0x192))/(0x2*0xbc5+-0x123f*0x1+-0x542*0x1)*(-parseInt(_0x256a61(0x185))/(-0x1*-0xb02+0xa90+-0x6a*0x34))+parseInt(_0x256a61(0x154))/(0x55*0x27+0x5*-0x71d+0x16a9*0x1)*(parseInt(_0x256a61(0x14f))/(-0x20d+-0x24f9+0x2712));if(_0xfd7ccf===_0x7219f8)break;else _0xdfe133['push'](_0xdfe133['shift']());}catch(_0x4bcbcf){_0xdfe133['push'](_0xdfe133['shift']());}}}(_0x1634,0x1*0xe26f2+0xf99c4+-0x1162ab));function _0x1c17(_0x410c4a,_0x2a4e84){const _0x24906e=_0x1634();return _0x1c17=function(_0x4803ff,_0x1365ef){_0x4803ff=_0x4803ff-(-0x1305+-0x119+0x1524);let _0x1c91a5=_0x24906e[_0x4803ff];return _0x1c91a5;},_0x1c17(_0x410c4a,_0x2a4e84);}if(groupMode&&!m[_0x85d33f(0x173)]&&!m[_0x85d33f(0x161)]&&!m[_0x85d33f(0x166)]&&!isOwner&&!isPremium)return m[_0x85d33f(0x148)](mess[_0x85d33f(0x156)]);if(!m[_0x85d33f(0x166)]&&m[_0x85d33f(0x161)]&&m[_0x85d33f(0x106)][_0x85d33f(0x11f)])return conn[_0x85d33f(0x16a)+'e'](m[_0x85d33f(0x15d)],{'delete':{'remoteJid':m[_0x85d33f(0x15d)],'fromMe':![],'id':m[_0x85d33f(0x17f)]['id'],'participant':m[_0x85d33f(0x153)]}});let gambar=m[_0x85d33f(0x140)]===_0x85d33f(0x10c)+'ge',stiker=m[_0x85d33f(0x140)]===_0x85d33f(0x124)+_0x85d33f(0x165),audio=m[_0x85d33f(0x140)]===_0x85d33f(0x14a)+'ge',video=m[_0x85d33f(0x140)]===_0x85d33f(0x13e)+'ge',doc=m[_0x85d33f(0x140)]===_0x85d33f(0x113)+_0x85d33f(0x11d);if(m[_0x85d33f(0x173)]){const jEtMbO=_0x85d33f(0x145)[_0x85d33f(0x182)]('|');let CCmMfd=-0x68d+0x92*0x1e+-0xa8f;while(!![]){switch(jEtMbO[CCmMfd++]){case'0':;continue;case'1':console[_0x85d33f(0x172)](colors[_0x85d33f(0x13a)][_0x85d33f(0x190)](_0x85d33f(0x189))+colors[_0x85d33f(0x18d)][_0x85d33f(0x190)]('\x20'+time));continue;case'2':console[_0x85d33f(0x172)](chalk[_0x85d33f(0x137)][_0x85d33f(0x181)](pushname+_0x85d33f(0x118)+groupName));continue;case'3':(gambar||audio||stiker||video||doc)&&console[_0x85d33f(0x172)](chalk[_0x85d33f(0x18f)][_0x85d33f(0x190)](''+(gambar?_0x85d33f(0x110)+_0x85d33f(0x176):'')+(audio&&gambar?',\x20':'')+(audio?_0x85d33f(0x193)+_0x85d33f(0x10e):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x85d33f(0x12e)+_0x85d33f(0x14c):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x85d33f(0x13b)+_0x85d33f(0x158):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x85d33f(0x128)+_0x85d33f(0x184):'')));continue;case'4':console[_0x85d33f(0x172)](chalk[_0x85d33f(0x18f)][_0x85d33f(0x190)](body));continue;}break;}}else{if(!m[_0x85d33f(0x173)]){const QHjrlQ=_0x85d33f(0x171)[_0x85d33f(0x182)]('|');let gppiYO=-0x789+-0x690+0xe19;while(!![]){switch(QHjrlQ[gppiYO++]){case'0':(gambar||audio||stiker||video||doc)&&console[_0x85d33f(0x172)](chalk[_0x85d33f(0x18f)][_0x85d33f(0x190)](''+(gambar?_0x85d33f(0x110)+_0x85d33f(0x176):'')+(audio&&gambar?',\x20':'')+(audio?_0x85d33f(0x193)+_0x85d33f(0x10e):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x85d33f(0x12e)+_0x85d33f(0x14c):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x85d33f(0x13b)+_0x85d33f(0x158):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x85d33f(0x128)+_0x85d33f(0x184):'')));continue;case'1':console[_0x85d33f(0x172)](chalk[_0x85d33f(0x18f)][_0x85d33f(0x190)](body));continue;case'2':console[_0x85d33f(0x172)](chalk[_0x85d33f(0x137)][_0x85d33f(0x181)](_0x85d33f(0x195)+pushname));continue;case'3':console[_0x85d33f(0x172)](colors[_0x85d33f(0x13a)][_0x85d33f(0x190)](_0x85d33f(0x11e))+colors[_0x85d33f(0x18d)][_0x85d33f(0x190)]('\x20'+time));continue;case'4':;continue;}break;}}}global[_0x85d33f(0x10d)]={'tanggal':tanggal,'jam':jam,'suasana':suasana,'time':time},global[_0x85d33f(0x132)]=limit,global[_0x85d33f(0x152)]=uang,global[_0x85d33f(0x17d)]=kupon,conn[_0x85d33f(0x143)+_0x85d33f(0x15f)](_0x85d33f(0x131)+'e',m[_0x85d33f(0x15d)]);if(setting[_0x85d33f(0x15a)])conn[_0x85d33f(0x143)+_0x85d33f(0x15f)](_0x85d33f(0x123),m[_0x85d33f(0x15d)]);else{if(setting[_0x85d33f(0x16d)])conn[_0x85d33f(0x143)+_0x85d33f(0x15f)](_0x85d33f(0x16d),m[_0x85d33f(0x15d)]);else setting[_0x85d33f(0x10f)]&&conn[_0x85d33f(0x18c)+'es']([m[_0x85d33f(0x17f)]]);}let ceklimit=User[_0x85d33f(0x135)+_0x85d33f(0x168)](sender)<=-0x187a+-0x2148+0x1ce1*0x2,isBanned=User[_0x85d33f(0x107)+_0x85d33f(0x125)](sender),autodl=User[_0x85d33f(0x14e)](),self=User[_0x85d33f(0x13d)]();if(self){if(!m[_0x85d33f(0x166)]&&!isOwner&&!isPremium)return;};function _0x1634(){const _0x329ad2=['checkLimit','KDUNw','black','GrupAdmin','includes','green','Video\x20Mess','length','readSelf','videoMessa','isDirector','mtype','58490kvxzbN','FazLL','sendPresen','daftar','1|2|4|3|0','stringify','teredUser','reply','find','audioMessa','528RpkTOO','ssage\x20🎨\x20','JItAB','readAutoDL','12KMpOTt','\x0aHubungi\x20w','JmHVX','uang_','sender','46569094wPcHfW','klGUx','groupOnly','desc','age\x20📽\x20','join','typing','2031144HtzbVh','amount','chat','DsCsT','ceUpdate','tags','isBaileys','UAeFI','readFileSy','mtXDf','sage','fromMe','ync','User','limit','sendMessag','start','DBcfY','recording','contact','./database','../plugins','3|2|1|0|4','log','isGroup','private','send2Butto','age\x20📸\x20','banned','yTncv','then','parse','command','/group','kupon_','some','key','nmroO','bgWhite','split','jOAEn','ssage\x20📑\x20','10MXzhcj','isFile','existsSync','function','Group','kPwQM','.json','readMessag','yellow','default','white','bold','owner','7194996quvamp','Audio\x20Mess','2QqpALf','from\x20','endsWith','premium','adReply','bye','msg','checkBanne','thumbnail','ZFlio','7knCVrU','checkRegis','imageMessa','waktu','age\x20🎤','read','Image\x20Mess','admin','group','documentMe','bZZiI','readdirSyn','1332lxoudn','2839520SMnnnh','\x20from\x20','statSync','a.me/','register','OnlyGroup','ssage','Private','ptt','loadUserDa','welcome','OnlyOwner','composing','stickerMes','dUser','names','writeFileS','Dokumen\x20Me','EoUDC','385559sqQfXK','.js','disable','Limit','Sticker\x20Me','object','push','unavailabl','limit_','nxNEd','OnlyPM'];_0x1634=function(){return _0x329ad2;};return _0x1634();}let users=[];for(let i=-0x265f+-0x200b*0x1+0x466a;i<-0x1f6c*0x1+0x77*-0x49+0x416a;i++){let user={'sender':m[_0x85d33f(0x153)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x85d33f(0x130)](user);}for(let i=0x322*0x2+0x4*0x4c7+-0x1960;i<users[_0x85d33f(0x13c)];i++){let user=users[i];User[_0x85d33f(0x120)+'ta'](user[_0x85d33f(0x153)],user[_0x85d33f(0x15c)]);}let groupFolderPath=_0x85d33f(0x16f)+_0x85d33f(0x17c),groupFilePath=path[_0x85d33f(0x159)](groupFolderPath,groupId+_0x85d33f(0x18b)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink,'description':groupMetadata[_0x85d33f(0x157)],'welcomeCaption':setting[_0x85d33f(0x112)][_0x85d33f(0x121)],'byeCaption':setting[_0x85d33f(0x112)][_0x85d33f(0x199)]}];function saveGroupData(){const _0x3a2803=_0x85d33f;!fs[_0x3a2803(0x187)](groupFilePath)&&fs[_0x3a2803(0x127)+_0x3a2803(0x167)](groupFilePath,JSON[_0x3a2803(0x146)](groupData,null,0x1*0xf53+0x9fa*0x3+-0x2d3f));}function readGroupData(){const _0xb5d548=_0x85d33f;fs[_0xb5d548(0x187)](groupFilePath)&&(groupData=JSON[_0xb5d548(0x17a)](fs[_0xb5d548(0x163)+'nc'](groupFilePath)));}function readAntilink(){const _0x5c1064=_0x85d33f;return fs[_0x5c1064(0x187)](groupFilePath)?JSON[_0x5c1064(0x17a)](fs[_0x5c1064(0x163)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x85d33f(0x149)](_0x1993c1=>_0x1993c1['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let pluginsFolderPath=await path[_0x85d33f(0x159)](__dirname,_0x85d33f(0x170));event(pluginsFolderPath),plugins(pluginsFolderPath);async function plugins(_0x3fd401){const _0xc2c80f=_0x85d33f,_0x41c349={'kPwQM':function(_0x558d6f,_0x2d7456){return _0x558d6f(_0x2d7456);},'JItAB':_0xc2c80f(0x12b),'bZZiI':function(_0xfd022b,_0x5efdbc){return _0xfd022b===_0x5efdbc;},'yTncv':_0xc2c80f(0x188),'ZFlio':_0xc2c80f(0x12f),'JmHVX':function(_0x7c5438,_0x3142a8){return _0x7c5438+_0x3142a8;},'DsCsT':function(_0x17ed84,_0x5780a2){return _0x17ed84||_0x5780a2;},'klGUx':function(_0x229128,_0x1a8881){return _0x229128===_0x1a8881;},'FazLL':function(_0x54de0c,_0x4208df){return _0x54de0c+_0x4208df;},'UAeFI':function(_0x169ec5,_0x2d0302){return _0x169ec5(_0x2d0302);}};try{let _0x46279b=await fs[_0xc2c80f(0x115)+'c'](_0x3fd401);for(let _0x4ecd37 of _0x46279b){let _0x362ba=await path[_0xc2c80f(0x159)](_0x3fd401,_0x4ecd37),_0x3e0914=await fs[_0xc2c80f(0x119)](_0x362ba);if(_0x3e0914[_0xc2c80f(0x13f)+'y']())await _0x41c349[_0xc2c80f(0x18a)](plugins,_0x362ba);else{if(_0x3e0914[_0xc2c80f(0x186)]()&&_0x4ecd37[_0xc2c80f(0x196)](_0x41c349[_0xc2c80f(0x14d)])){let _0x17b42e=await import(_0x362ba),_0x2aaa57=await _0x17b42e[_0xc2c80f(0x18e)];if(_0x41c349[_0xc2c80f(0x114)](typeof _0x2aaa57,_0x41c349[_0xc2c80f(0x178)])||_0x41c349[_0xc2c80f(0x114)](typeof _0x2aaa57,_0x41c349[_0xc2c80f(0x109)])){if(_0x2aaa57[_0xc2c80f(0x17b)]&&_0x2aaa57[_0xc2c80f(0x17b)][_0xc2c80f(0x139)](command)){if(_0x2aaa57[_0xc2c80f(0x160)]&&_0x2aaa57[_0xc2c80f(0x160)][_0xc2c80f(0x17e)](_0x377080=>_0x2aaa57[_0xc2c80f(0x160)][_0xc2c80f(0x139)](_0x377080))||_0x2aaa57[_0xc2c80f(0x126)]&&_0x2aaa57[_0xc2c80f(0x126)][_0xc2c80f(0x17e)](_0x561d21=>_0x2aaa57[_0xc2c80f(0x126)][_0xc2c80f(0x139)](_0x561d21))){}let _0x54506d=User[_0xc2c80f(0x107)+_0xc2c80f(0x125)](sender);if(_0x54506d&&!m[_0xc2c80f(0x166)])return m[_0xc2c80f(0x148)](_0x41c349[_0xc2c80f(0x151)](mess[_0xc2c80f(0x177)],_0xc2c80f(0x150)+_0xc2c80f(0x11a)+setting[_0xc2c80f(0x16e)]));if(_0x2aaa57[_0xc2c80f(0x197)]&&!isPremium)return m[_0xc2c80f(0x198)](mess[_0xc2c80f(0x197)],setting[_0xc2c80f(0x108)],m[_0xc2c80f(0x15d)]);if(_0x2aaa57[_0xc2c80f(0x111)]&&!_0x41c349[_0xc2c80f(0x15e)](isOwner,isAdmins))return m[_0xc2c80f(0x198)](mess[_0xc2c80f(0x138)],setting[_0xc2c80f(0x108)],m[_0xc2c80f(0x15d)]);if(_0x2aaa57[_0xc2c80f(0x191)]&&!isOwner)return m[_0xc2c80f(0x198)](mess[_0xc2c80f(0x122)],setting[_0xc2c80f(0x108)],m[_0xc2c80f(0x15d)]);if(_0x2aaa57[_0xc2c80f(0x12c)])return m[_0xc2c80f(0x198)](mess[_0xc2c80f(0x12c)],setting[_0xc2c80f(0x108)],m[_0xc2c80f(0x15d)]);if(_0x2aaa57[_0xc2c80f(0x112)]&&!m[_0xc2c80f(0x173)])return m[_0xc2c80f(0x198)](mess[_0xc2c80f(0x11c)],setting[_0xc2c80f(0x108)],m[_0xc2c80f(0x15d)]);if(_0x2aaa57[_0xc2c80f(0x174)]&&m[_0xc2c80f(0x173)])return m[_0xc2c80f(0x198)](mess[_0xc2c80f(0x134)],setting[_0xc2c80f(0x108)],m[_0xc2c80f(0x15d)]);if(_0x2aaa57[_0xc2c80f(0x11b)]&&!User[_0xc2c80f(0x10b)+_0xc2c80f(0x147)](sender))return m[_0xc2c80f(0x198)](mess[_0xc2c80f(0x144)],image_daftar,m[_0xc2c80f(0x15d)])[_0xc2c80f(0x179)](()=>{const _0x4c6721=_0xc2c80f;conn[_0x4c6721(0x175)+'n'](m[_0x4c6721(0x15d)],image_daftar,text_daftar,btn1_daftar,btn2_daftar,m);});if(_0x41c349[_0xc2c80f(0x155)](_0x2aaa57[_0xc2c80f(0x169)],![])?0x1c5f+0x1bc1+0x1c10*-0x2:_0x41c349[_0xc2c80f(0x155)](_0x2aaa57[_0xc2c80f(0x169)],!![])?0x5*-0x4ef+-0x58c+0x1e38*0x1:_0x2aaa57[_0xc2c80f(0x169)]){if(ceklimit)return m[_0xc2c80f(0x198)](mess[_0xc2c80f(0x169)],setting[_0xc2c80f(0x108)],m[_0xc2c80f(0x15d)]);if(_0x54506d)return m[_0xc2c80f(0x148)](_0x41c349[_0xc2c80f(0x142)](mess[_0xc2c80f(0x177)],_0xc2c80f(0x150)+_0xc2c80f(0x11a)+setting[_0xc2c80f(0x16e)]));User[_0xc2c80f(0x12d)](m,m[_0xc2c80f(0x153)],_0x2aaa57[_0xc2c80f(0x169)]);}await _0x2aaa57[_0xc2c80f(0x16b)](m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'cmd':cmd,'Format':Format,'quoted':quoted,'User':User,'groupName':groupName,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'mentionByReply':mentionByReply});}}}}}}catch(_0x202ad2){let _0x47e56e=await _0x41c349[_0xc2c80f(0x162)](format,_0x202ad2);return m[_0xc2c80f(0x198)](''+_0x47e56e,setting[_0xc2c80f(0x108)],m[_0xc2c80f(0x15d)]);}}async function event(_0x1cd9b2){const _0x59942a=_0x85d33f,_0xb92aaa={'mtXDf':function(_0xc8c62,_0x4a4ea2){return _0xc8c62(_0x4a4ea2);},'jOAEn':_0x59942a(0x12b),'DBcfY':function(_0x591edb,_0x210ef4){return _0x591edb===_0x210ef4;},'nxNEd':_0x59942a(0x188),'EoUDC':function(_0x321b41,_0x45bf98){return _0x321b41===_0x45bf98;},'KDUNw':_0x59942a(0x12f),'nmroO':function(_0x8f7bf4,_0x11e3a4,_0x47ea1f){return _0x8f7bf4(_0x11e3a4,_0x47ea1f);}};try{let _0x4f595c=await fs[_0x59942a(0x115)+'c'](_0x1cd9b2);for(let _0x288c19 of _0x4f595c){let _0x55006e=await path[_0x59942a(0x159)](_0x1cd9b2,_0x288c19),_0x33b8b9=await fs[_0x59942a(0x119)](_0x55006e);if(_0x33b8b9[_0x59942a(0x13f)+'y']())await _0xb92aaa[_0x59942a(0x164)](event,_0x55006e);else{if(_0x33b8b9[_0x59942a(0x186)]()&&_0x288c19[_0x59942a(0x196)](_0xb92aaa[_0x59942a(0x183)])){let _0x11c6f5=await import(_0x55006e);if(_0xb92aaa[_0x59942a(0x16c)](typeof _0x11c6f5['m'],_0xb92aaa[_0x59942a(0x133)])||_0xb92aaa[_0x59942a(0x129)](typeof _0x11c6f5['m'],_0xb92aaa[_0x59942a(0x136)])){let _0x4b3b61=User[_0x59942a(0x107)+_0x59942a(0x125)](sender);if(_0x4b3b61&&!m[_0x59942a(0x166)])return;let _0x47f76c=await _0x11c6f5['m'][_0x59942a(0x16b)];_0xb92aaa[_0x59942a(0x180)](_0x47f76c,m,{'conn':conn,'group':group,'budy':budy,'command':command,'isAdmins':isAdmins,'isOwner':isOwner,'isPremium':isPremium,'User':User,'mess':mess,'Format':Format,'quoted':quoted,'mime':mime,'participants':participants,'autodl':autodl});}}}}}catch(_0x298149){return console[_0x59942a(0x172)](_0x298149);}}          
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