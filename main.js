process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error);
import 'maleficent-bot/setup.js';
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { Boom } from '@hapi/boom'
import fetch from 'node-fetch'
import Pino from 'pino';
import './lib/other.js';
import { makeWASocket, DisconnectReason, makeInMemoryStore, useMultiFileAuthState } from '@adiwajshing/baileys'
import { nocache, uncache } from './lib/cache.js';
import { signalGroup, auto_BlockCaller } from "./lib/sock.js";
async function startWhatsApp() {
   try {
      let store = makeInMemoryStore({
         logger: Pino().child({
            level: 'silent',
            stream: 'store'
         })
      });
      function _0x2dcd(_0x64ce9f,_0x42849b){const _0xe7211a=_0x4836();return _0x2dcd=function(_0x4954c4,_0x29aab5){_0x4954c4=_0x4954c4-(-0x1*0x222a+0x2006+0x3a6);let _0x4f9068=_0xe7211a[_0x4954c4];return _0x4f9068;},_0x2dcd(_0x64ce9f,_0x42849b);}const _0x54275b=_0x2dcd;(function(_0x29aaa9,_0x4e0445){const _0x50b0cb=_0x2dcd,_0x4e45ce=_0x29aaa9();while(!![]){try{const _0x1ab3ca=parseInt(_0x50b0cb(0x18f))/(-0x2460+-0xecf+0x3330)*(-parseInt(_0x50b0cb(0x189))/(0xff3+-0x23ec+0xb*0x1d1))+parseInt(_0x50b0cb(0x194))/(-0x1047+-0x257f+0x35c9)*(-parseInt(_0x50b0cb(0x1a5))/(0x1cf4+0x2*-0x3fc+-0x4*0x53e))+parseInt(_0x50b0cb(0x188))/(-0x1fae+-0x5c9+-0x95f*-0x4)*(parseInt(_0x50b0cb(0x191))/(0x341+-0x1*-0x1732+-0x1a6d))+-parseInt(_0x50b0cb(0x1a7))/(0x184c+-0x1*-0xe6b+-0x26b0)*(-parseInt(_0x50b0cb(0x18d))/(-0x98e+-0x17ad+-0x28f*-0xd))+-parseInt(_0x50b0cb(0x196))/(0x98d+0x10fa+-0x1a7e)+parseInt(_0x50b0cb(0x1ab))/(-0xecc+-0x545*0x5+0x292f)*(parseInt(_0x50b0cb(0x187))/(-0x1b6c+-0x94d*-0x2+0x8dd))+-parseInt(_0x50b0cb(0x186))/(-0x1ea1+-0xd*-0x124+0xfd9)*(parseInt(_0x50b0cb(0x190))/(-0x20d0+-0x112*0x7+0x285b*0x1));if(_0x1ab3ca===_0x4e0445)break;else _0x4e45ce['push'](_0x4e45ce['shift']());}catch(_0x1c5ec9){_0x4e45ce['push'](_0x4e45ce['shift']());}}}(_0x4836,-0x107c49+0xc6327+0x1114c0*0x1));let {state,saveCreds}=await useMultiFileAuthState(_0x54275b(0x1a9)),setting=JSON[_0x54275b(0x19b)](fs[_0x54275b(0x1a4)+'nc'](_0x54275b(0x19c)+_0x54275b(0x185))),pairingCode=setting[_0x54275b(0x1aa)],useQr=setting['qr'],phoneNumber=setting[_0x54275b(0x1a2)],connectionOptions={...useQr&&{'printQRInTerminal':!![]},...pairingCode&&{'printQRInTerminal':!pairingCode},'logger':Pino({'level':_0x54275b(0x183)}),'auth':state,'browser':[_0x54275b(0x192)+_0x54275b(0x1a6),'','']};var conn=await makeWASocket(connectionOptions);if(pairingCode&&!conn[_0x54275b(0x18a)][_0x54275b(0x19d)][_0x54275b(0x198)]){let code=await conn[_0x54275b(0x1a1)+_0x54275b(0x18b)](phoneNumber);code=code?.[_0x54275b(0x1a8)](/.{1,4}/g)?.[_0x54275b(0x19f)]('-')||code,console[_0x54275b(0x184)](chalk[_0x54275b(0x195)](_0x54275b(0x199)+_0x54275b(0x1a0)+_0x54275b(0x193))),console[_0x54275b(0x184)](_0x54275b(0x182)+chalk[_0x54275b(0x18c)+'ht'](_0x54275b(0x19e)+_0x54275b(0x1a3))+':'),console[_0x54275b(0x184)]('\x0a'),console[_0x54275b(0x184)]('\x20'+chalk[_0x54275b(0x18c)+'ht'](_0x54275b(0x18e))+':\x20'+code),console[_0x54275b(0x184)](chalk[_0x54275b(0x195)](_0x54275b(0x199)+_0x54275b(0x1a0)+_0x54275b(0x193)));}conn['ev']['on'](_0x54275b(0x19a)+'te',saveCreds),store[_0x54275b(0x197)](conn['ev']),signalGroup(conn,setting,store);function _0x4836(){const _0x367d9e=['5988712yyyWLJ','Code','412820QNcDNr','52rqaOKb','6RROTiB','Opera\x20(Lin','••\x0a\x0a','11013KJNOfh','cyan','10585710sVgQvU','bind','registered','\x0a\x0a••••••••','creds.upda','parse','./config.j','creds','Your\x20Pairi','join','••••••••••','requestPai','botNumber','ng\x20Code','readFileSy','652EuvqEw','ux)','14deufda','match','./sessions','pairing','650GUxFwr','\x20💻\x20','silent','log','son','2722872nkdAaN','151162fUqFdw','7777225XytomO','2qEIJXS','authState','ringCode','yellowBrig'];_0x4836=function(){return _0x367d9e;};return _0x4836();}
      conn.ev.on('connection.update', (update) => {
         let {
            connection,
            lastDisconnect
         } = update;
         if (connection === 'open') {
            console.log(`Connection :`, connection)
         } else if (connection === 'close') {
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startWhatsApp() : console.log('Koneksi Terputus...')
         }
         console.log(update);
      });
      conn.ws.on('CB:call', (_call) => {
         auto_BlockCaller(conn, _call)
      });
   } catch (e) {
      return console.error(e);
   }
};
startWhatsApp();