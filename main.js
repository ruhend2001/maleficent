process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const { Format, Connect, Signal } = require('mf-system'); 
Object.assign(global, { 
   default_db: { users: {}, chats: {}, settings: {}, stores: {}, menfess: {}, contacts: {} }, 
   setting: require('./config.json'), 
   mess: require('./lib/message.js'), 
   Connect: Connect, Format: Format, 
   moment: require("moment-timezone") 
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
   require('./lib/other.js').connections(conn);
   conn.ev.on('connection.update', (update) => {
      const { connection } = update;
      if (connection === 'open') {
         console.log(`🟢 Online`);
      } else if (connection === 'connecting') {
         console.log(`🟡 Reconnecting`);
      } else if (connection === 'close') {
         console.log(`🔴 Disconnected`), startWhatsApp();
      }
   })
};
startWhatsApp()