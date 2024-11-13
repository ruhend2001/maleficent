process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error);
require('./lib/other.js');
require('utils-mf/index.js');
require('./lib/src/mongo/mongo-info.js');
const pino = require('pino');
const { 
   signalGroup
} = require('utils-mf');
const {
   makeInMemoryStore,
   useMultiFileAuthState,
   DisconnectReason
} = require('@adiwajshing/baileys');
const store = makeInMemoryStore({
   logger: pino().child({
      level: 'silent',
      stream: 'store'
   })
});
const startWhatsApp = async () => {     
   const { state, saveCreds } = await useMultiFileAuthState('./sessions');   
   const conn = await signalGroup(state, store);   
   conn.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'open') {
         console.log(`🟢 Online`)
      } else if (connection === 'connecting') {
         console.log(`🟡 Reconnecting`)
      } else if (connection === 'close') {
         console.log(`🔴 Disconnected`)
         lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startWhatsApp() : startWhatsApp();
      }
   });
   store.bind(conn.ev);
   conn.ev.on('creds.update', saveCreds);  
}
startWhatsApp();