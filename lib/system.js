const cron = require('node-cron');
const caller = (conn) => {
   conn.ws.on('CB:call', (update) => {
      const call = update.content[0].attrs['call-creator'];
      if (!global.anticall) return
      if (setting.ownerNumber.includes(call.split('@')[0])) return 
      const text = 'Kamu Telah Melanggar Ketentuan\nDilarang Menelepon Bot'
      conn.sendMessage(call, { text: text }, { ...conn_bind }).then(() => {
         conn.updateBlockStatus(call, 'block');
      })
   })
};
exports.caller = caller
cron.schedule('0 23 * * *', () => {
   const limit = 25
   const list = Object.entries(global.db.users);
   list.forEach(([user, data]) => {
      data.limit += limit
   });
   const caption = `Berhasil Menambah ${limit} Limit ke setiap pengguna\n`;
   console.log(caption);
}, {
   timezone: "Asia/Jakarta"
});