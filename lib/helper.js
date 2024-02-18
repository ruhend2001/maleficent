process.on('uncaughtException', console.error)
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs, { watchFile, unwatchFile } from 'fs'
import path from 'path'
import chalk from 'chalk'
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
   let isCmd = body.startsWith(prefix)
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
   const _0x12803f=_0x1b0e;(function(_0x2395b0,_0x419d10){const _0x18fd3d=_0x1b0e,_0x4b2129=_0x2395b0();while(!![]){try{const _0x2a7496=-parseInt(_0x18fd3d(0x227))/(0x19e7+-0x1a1a+-0x34*-0x1)*(parseInt(_0x18fd3d(0x1d9))/(-0x14a2+-0x1173+0x2617))+parseInt(_0x18fd3d(0x210))/(0x1*0xf4+-0x24e5+-0x11fa*-0x2)+parseInt(_0x18fd3d(0x1ef))/(0x3*-0x531+0x1fca+-0xb*0x179)*(parseInt(_0x18fd3d(0x1bb))/(0x15*0x47+0x30d*-0x1+-0x2c1))+-parseInt(_0x18fd3d(0x1e3))/(0xa1f+-0x2256+-0x183d*-0x1)+-parseInt(_0x18fd3d(0x1e7))/(-0x1cc7*-0x1+-0x37*0x49+-0xd11)*(parseInt(_0x18fd3d(0x1de))/(-0x2626*-0x1+-0x3*-0x385+-0x30ad))+parseInt(_0x18fd3d(0x1d5))/(0x1a25+0x6a*-0x47+0x34a)+parseInt(_0x18fd3d(0x1f8))/(-0x2296+-0x248e+0x472e)*(parseInt(_0x18fd3d(0x21a))/(-0xd8*-0x2e+-0x2469+-0x25c));if(_0x2a7496===_0x419d10)break;else _0x4b2129['push'](_0x4b2129['shift']());}catch(_0x513495){_0x4b2129['push'](_0x4b2129['shift']());}}}(_0x5d15,-0x1*0x10ecd7+-0xf07e0+0x2a632f*0x1));let sender=m[_0x12803f(0x1d8)];global[_0x12803f(0x1e4)]={'tanggal':tanggal,'jam':jam,'suasana':suasana,'time':time},global[_0x12803f(0x20c)]=limit,global[_0x12803f(0x21f)]=uang,global[_0x12803f(0x22f)]=kupon,conn[_0x12803f(0x21e)+_0x12803f(0x1b5)](_0x12803f(0x1f5)+'e',m[_0x12803f(0x1f7)]);if(setting[_0x12803f(0x1d4)])conn[_0x12803f(0x21e)+_0x12803f(0x1b5)](_0x12803f(0x1df),m[_0x12803f(0x1f7)]);else{if(setting[_0x12803f(0x226)])conn[_0x12803f(0x21e)+_0x12803f(0x1b5)](_0x12803f(0x226),m[_0x12803f(0x1f7)]);else setting[_0x12803f(0x1dc)]&&conn[_0x12803f(0x20b)+'es']([m[_0x12803f(0x211)]]);}let isPremium=User[_0x12803f(0x1e1)+_0x12803f(0x1d0)](sender),ceklimit=User[_0x12803f(0x22a)+_0x12803f(0x1e5)](sender)<=-0x235*-0x3+0x1*-0x600+0x3*-0x35,isBanned=User[_0x12803f(0x1c5)+_0x12803f(0x200)](sender),autodl=User[_0x12803f(0x202)](),self=User[_0x12803f(0x1d2)]();if(self){if(!m[_0x12803f(0x1f0)]&&!isOwner&&!isPremium)return;}function _0x5d15(){const _0x436a8c=['/group','.js','dUser','xXbfV','readAutoDL','join','documentMe','ssage\x20📑\x20','daftar','QvJwL','includes','disable','kaAwD','readMessag','limit_','fASER','stickerMes','audioMessa','1583250yrMkCG','key','282@s.what','OnlyPM','Dokumen\x20Me','GrupAdmin','uUfCl','default','eacUu','black','572wLpoEU','videoMessa','log','reply','sendPresen','uang_','statSync','function','Video\x20Mess','names','fstXK','register','recording','1125401GLkWEr','sapp.net','alHsa','checkLimit','writeFileS','ssage\x20🎨\x20','VeEWs','OnlyOwner','kupon_','readFileSy','Private','from\x20','hOTBw','loadUserDa','Audio\x20Mess','ztxfF','Limit','ync','limit','Group','checkRegis','stringify','OnlyGroup','imageMessa','ceUpdate','age\x20📽\x20','group','find','desc','adReply','5FkEEMy','uPWaT','ssage','age\x20📸\x20','owner','Image\x20Mess','\x20from\x20','Sticker\x20Me','./database','thumbnail','checkBanne','6281563372','vrFaW','teredUser','parse','yellow','start','isFile','bold','white','length','umUser','NugTo','readSelf','readdirSyn','typing','5881176GcdsJC','premium','tags','sender','2bagFTN','sage','../plugins','read','object','88vaUjqv','composing','kDLpb','checkPremi','endsWith','2781648MeICjj','waktu','User','isGroup','82019OIrLwT','banned','mtype','then','push','aZflU','existsSync','green','1627336OMweql','fromMe','.json','command','some','private','unavailabl','owVwl','chat','156440CjGWlZ','bgWhite','amount','isDirector','age\x20🎤','admin'];_0x5d15=function(){return _0x436a8c;};return _0x5d15();};let users=[];function _0x1b0e(_0x42ad28,_0x444d98){const _0x45ef1b=_0x5d15();return _0x1b0e=function(_0x750148,_0x515543){_0x750148=_0x750148-(-0x2*0xeef+-0x482*0x5+0x6d*0x7f);let _0x49e29d=_0x45ef1b[_0x750148];return _0x49e29d;},_0x1b0e(_0x42ad28,_0x444d98);}for(let i=-0x106d+0x753+0x2*0x48d;i<-0x244d*0x1+-0x3*0xaf5+0x453b;i++){let user={'sender':m[_0x12803f(0x1d8)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x12803f(0x1eb)](user);}for(let i=0x1c6f+-0x2*0x10f0+-0xc7*-0x7;i<users[_0x12803f(0x1cf)];i++){let user=users[i];User[_0x12803f(0x234)+'ta'](user[_0x12803f(0x1d8)],user[_0x12803f(0x1fa)]);}let groupFolderPath=_0x12803f(0x1c3)+_0x12803f(0x1fe),groupFilePath=path[_0x12803f(0x203)](groupFolderPath,groupId+_0x12803f(0x1f1)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink,'description':groupMetadata[_0x12803f(0x1b9)]}];function saveGroupData(){const _0x92878c=_0x12803f;!fs[_0x92878c(0x1ed)](groupFilePath)&&fs[_0x92878c(0x22b)+_0x92878c(0x1ae)](groupFilePath,JSON[_0x92878c(0x1b2)](groupData,null,0x11e5+-0x73e+0xaa5*-0x1));}function readGroupData(){const _0x50a115=_0x12803f;fs[_0x50a115(0x1ed)](groupFilePath)&&(groupData=JSON[_0x50a115(0x1c9)](fs[_0x50a115(0x230)+'nc'](groupFilePath)));}function readAntilink(){const _0xcc59f9=_0x12803f;return fs[_0xcc59f9(0x1ed)](groupFilePath)?JSON[_0xcc59f9(0x1c9)](fs[_0xcc59f9(0x230)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x12803f(0x1b8)](_0x2d7ebb=>_0x2d7ebb['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let pluginsFolderPath=await path[_0x12803f(0x203)](__dirname,_0x12803f(0x1db));event(pluginsFolderPath),plugins(pluginsFolderPath);async function plugins(_0x27c0f8){const _0x37715c=_0x12803f,_0x3a4ba5={'kDLpb':_0x37715c(0x1c6)+_0x37715c(0x212)+_0x37715c(0x228),'NugTo':function(_0x1f1dc3,_0x32c822){return _0x1f1dc3(_0x32c822);},'owVwl':_0x37715c(0x1ff),'fASER':function(_0xc6ea6,_0x4f2ca6){return _0xc6ea6===_0x4f2ca6;},'eacUu':_0x37715c(0x221),'vrFaW':function(_0x3bd131,_0xf4803d){return _0x3bd131===_0xf4803d;},'hOTBw':_0x37715c(0x1dd),'ztxfF':function(_0xfb7595,_0x2b86ab){return _0xfb7595||_0x2b86ab;},'fstXK':function(_0x5b8815,_0x42a93a){return _0x5b8815===_0x42a93a;},'uPWaT':function(_0xf1bab1,_0xbbfea5){return _0xf1bab1===_0xbbfea5;},'xXbfV':function(_0x4e7f03,_0x3d01cf){return _0x4e7f03(_0x3d01cf);}};try{let _0x41906c=await fs[_0x37715c(0x1d3)+'c'](_0x27c0f8);for(let _0x48d784 of _0x41906c){let _0x36e86b=await path[_0x37715c(0x203)](_0x27c0f8,_0x48d784),_0x1b9386=await fs[_0x37715c(0x220)](_0x36e86b);if(_0x1b9386[_0x37715c(0x1fb)+'y']())await _0x3a4ba5[_0x37715c(0x1d1)](plugins,_0x36e86b);else{if(_0x1b9386[_0x37715c(0x1cc)]()&&_0x48d784[_0x37715c(0x1e2)](_0x3a4ba5[_0x37715c(0x1f6)]))try{let _0x1c9290=await import(_0x36e86b),_0x528a90=await _0x1c9290[_0x37715c(0x217)];if(_0x3a4ba5[_0x37715c(0x20d)](typeof _0x528a90,_0x3a4ba5[_0x37715c(0x218)])||_0x3a4ba5[_0x37715c(0x1c7)](typeof _0x528a90,_0x3a4ba5[_0x37715c(0x233)])){if(_0x528a90[_0x37715c(0x1f2)]&&_0x528a90[_0x37715c(0x1f2)][_0x37715c(0x208)](command)){if(_0x528a90[_0x37715c(0x1d7)]&&_0x528a90[_0x37715c(0x1d7)][_0x37715c(0x1f3)](_0x54c5ed=>_0x528a90[_0x37715c(0x1d7)][_0x37715c(0x208)](_0x54c5ed))||_0x528a90[_0x37715c(0x223)]&&_0x528a90[_0x37715c(0x223)][_0x37715c(0x1f3)](_0x3bb6c7=>_0x528a90[_0x37715c(0x223)][_0x37715c(0x208)](_0x3bb6c7))){}let _0xd97736=User[_0x37715c(0x1c5)+_0x37715c(0x200)](sender);if(_0xd97736&&!m[_0x37715c(0x1f0)])return m[_0x37715c(0x21d)](mess[_0x37715c(0x1e8)]);if(_0x528a90[_0x37715c(0x1d6)]&&!isPremium)return m[_0x37715c(0x1ba)](mess[_0x37715c(0x1d6)],setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)]);if(_0x528a90[_0x37715c(0x1fd)]&&!_0x3a4ba5[_0x37715c(0x1ac)](isOwner,isAdmins))return m[_0x37715c(0x1ba)](mess[_0x37715c(0x215)],setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)]);if(_0x528a90[_0x37715c(0x1bf)]&&!isOwner)return m[_0x37715c(0x1ba)](mess[_0x37715c(0x22e)],setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)]);if(_0x528a90[_0x37715c(0x209)])return m[_0x37715c(0x1ba)](mess[_0x37715c(0x209)],setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)]);if(_0x528a90[_0x37715c(0x1b7)]&&!m[_0x37715c(0x1e6)])return m[_0x37715c(0x1ba)](mess[_0x37715c(0x1b3)],setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)]);if(_0x528a90[_0x37715c(0x1f4)]&&m[_0x37715c(0x1e6)])return m[_0x37715c(0x1ba)](mess[_0x37715c(0x213)],setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)]);if(_0x528a90[_0x37715c(0x225)]&&!User[_0x37715c(0x1b1)+_0x37715c(0x1c8)](sender))return m[_0x37715c(0x1ba)](mess[_0x37715c(0x206)],setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)]);if(_0x3a4ba5[_0x37715c(0x224)](_0x528a90[_0x37715c(0x1af)],![])?-0x92*0x17+0x9*0x16f+-0xb*-0x5:_0x3a4ba5[_0x37715c(0x1bc)](_0x528a90[_0x37715c(0x1af)],!![])?0x2265*0x1+0xc2+-0x2326:_0x528a90[_0x37715c(0x1af)]){if(ceklimit)return m[_0x37715c(0x1ba)](mess[_0x37715c(0x1af)],setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)]);if(_0xd97736)return m[_0x37715c(0x21d)](mess[_0x37715c(0x1e8)]);User[_0x37715c(0x1ad)](m,m[_0x37715c(0x1d8)],_0x528a90[_0x37715c(0x1af)]);}await _0x528a90[_0x37715c(0x1cb)](m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'Format':Format,'quoted':quoted,'User':User,'groupName':groupName,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'mentionByReply':mentionByReply,'cmd':cmd});}}}catch(_0x1df55d){const _0x4314dc=await _0x3a4ba5[_0x37715c(0x1d1)](format,_0x1df55d);return m[_0x37715c(0x1ba)](''+_0x4314dc,setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)])[_0x37715c(0x1ea)](()=>{const _0x54a65b=_0x37715c;conn[_0x54a65b(0x21d)](_0x3a4ba5[_0x54a65b(0x1e0)],_0x4314dc,m);});}}}}catch(_0x136121){const _0xb06a4c=await _0x3a4ba5[_0x37715c(0x201)](format,_0x136121);return m[_0x37715c(0x1ba)](''+_0xb06a4c,setting[_0x37715c(0x1c4)],m[_0x37715c(0x1f7)])[_0x37715c(0x1ea)](()=>{const _0x1c5788=_0x37715c;conn[_0x1c5788(0x21d)](_0x3a4ba5[_0x1c5788(0x1e0)],_0xb06a4c,m);});}}async function event(_0x472de1){const _0x33b7e7=_0x12803f,_0x1ab358={'VeEWs':function(_0x36bb80,_0x400cae){return _0x36bb80(_0x400cae);},'kaAwD':_0x33b7e7(0x1ff),'alHsa':function(_0x738be8,_0x11bdc3){return _0x738be8===_0x11bdc3;},'uUfCl':_0x33b7e7(0x221),'QvJwL':_0x33b7e7(0x1dd),'aZflU':function(_0x4f937d,_0x180c48,_0x2677fb){return _0x4f937d(_0x180c48,_0x2677fb);}};try{let _0x1af9f0=await fs[_0x33b7e7(0x1d3)+'c'](_0x472de1);for(let _0x42845f of _0x1af9f0){let _0x1d6a18=await path[_0x33b7e7(0x203)](_0x472de1,_0x42845f),_0x5ebc44=await fs[_0x33b7e7(0x220)](_0x1d6a18);if(_0x5ebc44[_0x33b7e7(0x1fb)+'y']())await _0x1ab358[_0x33b7e7(0x22d)](event,_0x1d6a18);else{if(_0x5ebc44[_0x33b7e7(0x1cc)]()&&_0x42845f[_0x33b7e7(0x1e2)](_0x1ab358[_0x33b7e7(0x20a)]))try{let _0x2a2740=await import(_0x1d6a18);if(_0x1ab358[_0x33b7e7(0x229)](typeof _0x2a2740['m'],_0x1ab358[_0x33b7e7(0x216)])||_0x1ab358[_0x33b7e7(0x229)](typeof _0x2a2740['m'],_0x1ab358[_0x33b7e7(0x207)])){let _0x3318e1=User[_0x33b7e7(0x1c5)+_0x33b7e7(0x200)](sender);if(_0x3318e1&&!m[_0x33b7e7(0x1f0)])return;let _0x140e3d=await _0x2a2740['m'][_0x33b7e7(0x1cb)];await _0x1ab358[_0x33b7e7(0x1ec)](_0x140e3d,m,{'conn':conn,'group':group,'budy':budy,'command':command,'isAdmins':isAdmins,'isOwner':isOwner,'isPremium':isPremium,'User':User,'mess':mess,'Format':Format,'quoted':quoted,'mime':mime,'participants':participants,'autodl':autodl});}}catch(_0x5b3714){return console[_0x33b7e7(0x21c)](_0x5b3714);}}}}catch(_0x4fecf7){return console[_0x33b7e7(0x21c)](_0x4fecf7);}}const gambar=m[_0x12803f(0x1e9)]===_0x12803f(0x1b4)+'ge',stiker=m[_0x12803f(0x1e9)]===_0x12803f(0x20e)+_0x12803f(0x1da),audio=m[_0x12803f(0x1e9)]===_0x12803f(0x20f)+'ge',video=m[_0x12803f(0x1e9)]===_0x12803f(0x21b)+'ge',doc=m[_0x12803f(0x1e9)]===_0x12803f(0x204)+_0x12803f(0x1bd);(gambar||audio||stiker||video||doc)&&console[_0x12803f(0x21c)](chalk[_0x12803f(0x1ce)][_0x12803f(0x1cd)](''+(gambar?_0x12803f(0x1c0)+_0x12803f(0x1be):'')+(audio&&gambar?',\x20':'')+(audio?_0x12803f(0x1ab)+_0x12803f(0x1fc):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x12803f(0x1c2)+_0x12803f(0x22c):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x12803f(0x222)+_0x12803f(0x1b6):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x12803f(0x214)+_0x12803f(0x205):'')));;if(m[_0x12803f(0x1e6)])console[_0x12803f(0x21c)](colors[_0x12803f(0x1ee)][_0x12803f(0x1cd)](_0x12803f(0x1b0))+colors[_0x12803f(0x1ca)][_0x12803f(0x1cd)]('\x20'+time)),console[_0x12803f(0x21c)](chalk[_0x12803f(0x219)][_0x12803f(0x1f9)](pushname+_0x12803f(0x1c1)+groupName)),console[_0x12803f(0x21c)](chalk[_0x12803f(0x1ce)][_0x12803f(0x1cd)](body));else!m[_0x12803f(0x1e6)]&&(console[_0x12803f(0x21c)](colors[_0x12803f(0x1ee)][_0x12803f(0x1cd)](_0x12803f(0x231))+colors[_0x12803f(0x1ca)][_0x12803f(0x1cd)]('\x20'+time)),console[_0x12803f(0x21c)](chalk[_0x12803f(0x219)][_0x12803f(0x1f9)](_0x12803f(0x232)+pushname)),console[_0x12803f(0x21c)](chalk[_0x12803f(0x1ce)][_0x12803f(0x1cd)](body)));
   if (budy.startsWith(">") || budy.startsWith("=") || budy.startsWith("×")) {
      if (!isOwner) return m.reply(mess.OnlyOwner);
      try {
         m.reply(`evaling...`)
         m.reply(util.format(await eval(`;(async () => { ${budy.slice(2)} })()`)))
      } catch (e) {
         m.reply(util.format(e))
      }
   };
   if (budy.startsWith("=>") || budy.startsWith("->")) {
      if (!isOwner) return m.reply(mess.OnlyOwner);
      try {
         m.reply(`returning...`);
         m.reply(util.format(await eval(`(async () => { return ${budy.slice(3)} })()`)));
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