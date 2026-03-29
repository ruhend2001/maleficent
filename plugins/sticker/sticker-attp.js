const { ttp } = require('../../lib/src/scraper/ttp.js');
exports.default = {
   names: ['Maker'],
   tags: ['attp', 'ttp'],
   command: ['attp', 'ttp'],
   start: async (m, {
      conn,
      prefix,
      text,
      command
   }) => {
      if (!text) return m.reply(`Kirim perintah ${prefix+command} text\ncontoh: ${prefix+command} ${setting.botName}`);
      const result = await ttp(text);
      conn.adReply(m.chat, loading, cover, m).then(() => {            
         conn.sendImageAsSticker(m.chat, result.url, m, {
           packname: setting.botName,
           author: `${setting.footer}\ncreated : \n${waktu.tanggal}\n${waktu.time} ${waktu.suasana}`
         })
      })
   },
   limit: true
}