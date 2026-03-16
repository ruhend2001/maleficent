process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', (e) => { 
   const error = String(e);
   if (error.includes('rate-overlimit')) {
      return false   
   } else if (error.includes('internal-server-error')) {
      return false
   } else console.error(e);
});
const { Format, Connect, Signal } = require('utils-mf'); 
Object.assign(global, { default_db: { users: {}, chats: {}, settings: {}, stores: {}, menfess: {}, contacts: {} }, setting: require('./config.json'), mess: require('./lib/message.js'), Connect: Connect, Format: Format, moment: require("moment-timezone") });
moment.tz.setDefault("Asia/Jakarta").locale("id");
require('./lib/settings.js');
require('utils-mf/index.js');
require('./lib/system.js');
require('./lib/src/cloud/mongo-db.js');
require('./lib/src/cloud/github-db.js');
const startWhatsApp = async () => {
   const conn = await Signal({ sessions: './sessions' }); 
   require('./lib/system.js').caller(conn);
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