export default {
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
      let pack = setting.botName
      let own = setting.footer
      if (/video/.test(mime) || m.mtype === 'videoMessage') {
         if (!quoted) return
         let buffer = await quoted.download();
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         conn.sendImageAsSticker(m.chat, buffer, m, {
            packname: pack,
            author: own
         });
      } else {
         m.reply(`Kirim video dengan caption ${prefix + command} atau balas video yang sudah dikirim`);
      }
   },
   limit: true
};