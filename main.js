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
   const _0x37449e=_0x1ba9;(function(_0x122971,_0x3d8699){const _0x9487a9=_0x1ba9,_0x57acc5=_0x122971();while(!![]){try{const _0x976e3=parseInt(_0x9487a9(0x1bc))/(-0x542*-0x1+0x1650+0x1b91*-0x1)*(parseInt(_0x9487a9(0x1ad))/(0x71*0x1e+-0x64b*0x5+0x123b))+parseInt(_0x9487a9(0x1b6))/(0x255b+-0x1f*-0x4+-0x327*0xc)*(parseInt(_0x9487a9(0x1a9))/(0x69e+-0x31*0x89+0x139f))+-parseInt(_0x9487a9(0x1be))/(-0x6*-0x50c+-0x41d+0x1*-0x1a26)+-parseInt(_0x9487a9(0x1c2))/(0x7c4+0xba*-0x33+-0x38*-0x86)*(-parseInt(_0x9487a9(0x1c4))/(-0x235e*0x1+0x1153*-0x2+-0x1a1*-0x2b))+parseInt(_0x9487a9(0x1b3))/(-0xaf5+0x3*0xc82+-0x1a89)*(parseInt(_0x9487a9(0x1a1))/(-0x1450+-0x19ae+-0x2e07*-0x1))+parseInt(_0x9487a9(0x1bd))/(-0x1dab+0x1d2*-0x7+0x2a73)+-parseInt(_0x9487a9(0x1aa))/(0x11*-0x179+0x1c*0x2b+0x1460);if(_0x976e3===_0x3d8699)break;else _0x57acc5['push'](_0x57acc5['shift']());}catch(_0x4bd9d3){_0x57acc5['push'](_0x57acc5['shift']());}}}(_0x5310,-0x13955d+0x6a4f*-0x1+0x1e849b));let {state,saveCreds}=await useMultiFileAuthState(_0x37449e(0x1ab)),setting=JSON[_0x37449e(0x1bb)](fs[_0x37449e(0x1c3)+'nc'](_0x37449e(0x1b5)+_0x37449e(0x1c0))),pairingCode=setting[_0x37449e(0x1c6)],useQr=setting['qr'],phoneNumber=setting[_0x37449e(0x1b2)],connectionOptions={...useQr&&{'printQRInTerminal':!![]},...pairingCode&&{'printQRInTerminal':!pairingCode},'logger':Pino({'level':_0x37449e(0x1b1)}),'auth':state,'browser':[_0x37449e(0x1a8)+_0x37449e(0x1b0),'','']};function _0x1ba9(_0x97c239,_0x283da2){const _0x46a0fc=_0x5310();return _0x1ba9=function(_0x3e751a,_0x3bb1a8){_0x3e751a=_0x3e751a-(-0x2a2*-0x1+-0x1b*0xbb+0x12b7*0x1);let _0x3f1fd0=_0x46a0fc[_0x3e751a];return _0x3f1fd0;},_0x1ba9(_0x97c239,_0x283da2);}function _0x5310(){const _0x242e3f=['86794ogLubr','2598080CcBTGU','581050JmJKEh','bind','son','ng\x20Code','12CTpstO','readFileSy','959980wvXKgB','••\x0a\x0a','pairing','log','registered','9414OUkFYk','ringCode','creds','match','creds.upda','join','yellowBrig','Opera\x20(Lin','12hOBcny','8814498BdtDcT','./sessions','requestPai','8NWAhrg','Your\x20Pairi','Code','ux)','silent','botNumber','2136IjcVze','\x20💻\x20','./config.j','446373wjzmlo','cyan','authState','••••••••••','\x0a\x0a••••••••','parse'];_0x5310=function(){return _0x242e3f;};return _0x5310();}var conn=await makeWASocket(connectionOptions);if(pairingCode&&!conn[_0x37449e(0x1b8)][_0x37449e(0x1a3)][_0x37449e(0x1a0)]){let code=await conn[_0x37449e(0x1ac)+_0x37449e(0x1a2)](phoneNumber);code=code?.[_0x37449e(0x1a4)](/.{1,4}/g)?.[_0x37449e(0x1a6)]('-')||code,console[_0x37449e(0x1c7)](chalk[_0x37449e(0x1b7)](_0x37449e(0x1ba)+_0x37449e(0x1b9)+_0x37449e(0x1c5))),console[_0x37449e(0x1c7)](_0x37449e(0x1b4)+chalk[_0x37449e(0x1a7)+'ht'](_0x37449e(0x1ae)+_0x37449e(0x1c1))+':'),console[_0x37449e(0x1c7)]('\x0a'),console[_0x37449e(0x1c7)]('\x20'+chalk[_0x37449e(0x1a7)+'ht'](_0x37449e(0x1af))+':\x20'+code),console[_0x37449e(0x1c7)](chalk[_0x37449e(0x1b7)](_0x37449e(0x1ba)+_0x37449e(0x1b9)+_0x37449e(0x1c5)));}conn['ev']['on'](_0x37449e(0x1a5)+'te',saveCreds),store[_0x37449e(0x1bf)](conn['ev']),signalGroup(conn,setting,store);
   conn.ev.on('connection.update', (update) => {
      let {
         connection,
         lastDisconnect
      } = update;
      if (connection == "open") {
         console.log(`Connection :`, connection)
      }
      if (connection == "close") {
         let reason = new Boom(lastDisconnect?.error)?.output.statusCode
         if (reason === DisconnectReason.badSession) {
            console.log(`Bad Session File, Please Delete Session and Scan Again`);
            conn.logout();
         } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed\nreconnecting....");            
         } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server.\nreconnecting...");
         } else if (reason === DisconnectReason.connectionReplaced) {
            console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
            conn.logout();
         } else if (reason === DisconnectReason.loggedOut) {
            console.log("Device Logged Out, Please Scan Again And Run.")
         } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting..."); startWhatsApp();
         } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting..."); startWhatsApp();
         } else console.log(`Disconnected: ${reason} ${lastDisconnect.error.output.payload.error}\n${lastDisconnect.error.output.payload.message}`); startWhatsApp();
      }
   })   
   conn.ws.on('CB:call', (_call) => {
      auto_BlockCaller(conn, _call)
   });      
  } catch(e) {
    return console.error(e)
  }
}
startWhatsApp();
