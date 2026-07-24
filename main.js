process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const { Format, Signal, Connect } = require('mf-system'); 
const { connections } = require('./lib/handler.js');
Object.assign(global, { 
   default_db: { users: {}, chats: {}, settings: {}, stores: {}, menfess: {}, contacts: {} }, 
   Format: Format, Connect: Connect,
   setting: require('./config.json'), 
   mess: require('./lib/message.js'), 
   moment: require("moment-timezone"),   
}); 
moment.tz.setDefault("Asia/Jakarta").locale("id");
require('./lib/settings.js');
require('./lib/src/cloud/mongo-db.js');
require('./lib/src/cloud/github-db.js');
require('./lib/src/cloud/gitlab-db.js');
require('./lib/src/cloud/neon-db.js');
require('./lib/src/cloud/supabase-db.js');
const startWhatsApp = async () => {
   const conn = await Signal();
   connections(conn);
   conn.ev.on('connection.update', (update) => {
      const { connection } = update;
      if (connection === 'open') {
         console.log(`🟢 Online`);
      } else if (connection === 'connecting') {
         console.log(`🟡 Reconnecting`);
      } else if (connection === 'close') {
         console.log(`🔴 Disconnected`)
         startWhatsApp()
      }
   })   
};
startWhatsApp()