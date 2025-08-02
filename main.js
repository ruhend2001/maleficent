process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', (e) => { 
   const error = String(e);
   if (error.includes('rate-overlimit')) {
      return false   
   } else if (error.includes('internal-server-error')) {
      return false
   } else console.error(e);
});
const pino = require('pino');
const { Format, Connect, Signal } = require('utils-mf'); 
Object.assign(global, { default_db: { users: {}, chats: {}, settings: {}, stores: {}, menfess: {}, contacts: {} }, setting: require('./config.json'), mess: require('./lib/message.js'), Connect: Connect, Format: Format, moment: require("moment-timezone") });
moment.tz.setDefault("Asia/Jakarta").locale("id");
require('./lib/settings.js');
require('utils-mf/index.js');
require('./lib/system.js');
require('./lib/src/cloud/mongo-db.js');
require('./lib/src/cloud/github-db.js');
const { caller } = require('./lib/system.js');
const startWhatsApp = async () => {
   const { makeInMemoryStore, useMultiFileAuthState, DisconnectReason } = await import('@baileys-md/baileys');
   const { state, saveCreds } = await useMultiFileAuthState('./sessions');
   const store = await makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' })});    
   const conn = await Signal(state, store); 
   store.bind(conn.ev); caller(conn);
   conn.ev.on('creds.update', () => saveCreds());
   conn.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'open') {
         console.log(`🟢 Online`);
      }
      else if (connection === 'connecting') {
         console.log(`🟡 Reconnecting`);
      } 
      else if (connection === 'close') {
         console.log(`🔴 Disconnected`);
         return startWhatsApp();
      }
   })
};
startWhatsApp()