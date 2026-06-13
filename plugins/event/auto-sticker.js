module.exports = {
   start: async (m, {
      conn,
      quoted,
      command
   }) => {
      if (db.settings?.auto_sticker && m.mtype === 'imageMessage') {
         const ignore = ['remini', 'hd', 'sticker', 's', 'stiker', 'smeme'];
         if (ignore.includes(command) && !m.fromMe) return m.react('❎');
         if (!m.fromMe && db.users[m.sender].limit < 0) return m.reply(mess.limit);
         m.react('🐽');
         conn.sendImageAsSticker(m.chat, await quoted.download(), m, {
            packname: setting.botName,
            author: `${setting.footer === '' ? sticker_wm : setting.footer}\ncreated : \n${waktu.tanggal}\n${waktu.time} ${waktu.suasana}`
         }).then(() => {
            if (!m.fromMe) {
               db.users[m.sender].limit -= 2
               m.reply(limit_message.replace('%limit', 2))
            }
         })
      }
   }
}