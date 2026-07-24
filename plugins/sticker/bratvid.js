exports.default = {
   names: ['Maker'],
   tags: ['bratvid'],
   command: ['bratvid', 'bratvideo', 'bratg'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Kirim perintah ${prefix + command} text\ncontoh: ${prefix + command} ${setting.botName}`);      
      conn.adReply(m.chat, loading, cover, m);
      conn.sendSticker(m.chat, await Format.bratvid(text), m, {
         packname: setting.botName,
         author: `${setting.footer === '' ? sticker_wm : setting.footer}\ncreated : \n${waktu.tanggal}\n${waktu.time} ${waktu.suasana}`
      })
   },
   limit: 3
}