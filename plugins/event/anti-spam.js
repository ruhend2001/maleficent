const spam = require('../../lib/system.js');
module.exports = {
   start: async (m, {
      conn,
      args,
      prefix,
      command
   }) => {
      const antispam = db.settings.antispam
      const orang_spam = []
      spam.ResetSpam(orang_spam);      
      if (antispam && command && spam.isFiltered(m.sender) && !m.isGroup && !m.isBaileys && !(prefix === undefined || prefix === '')) {
         spam.addSpam(m.sender, orang_spam)
         return m.reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 3 detik')
      }  
      if (antispam && command && args.length < 1 && !m.isBaileys) {
         spam.addFilter(m.sender);
      }
   }
}