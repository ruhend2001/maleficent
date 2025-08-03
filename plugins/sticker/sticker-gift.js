exports.default = {
   names: ['Maker'],
   tags: ['stickergif', 'sgif'],
   command: ['stickergif', 'sgif'],
   start: async (m, {
      conn,
      prefix,
      command,
      mime,
      quoted
   }) => {
      if (/video|image/.test(mime) || m.mtype === 'videoMessage') {
         if (!quoted) return
         const buffer = await quoted.download();
         conn.adReply(m.chat, loading, cover, m);
         conn.sendSticker(m.chat, buffer, m, {
            packname: setting.botName,
            author: setting.footer
         })
      } else {
         return m.reply(`Kirim video dengan caption ${prefix+command} atau balas video yang sudah dikirim`);
      }
   },
   limit: true
};