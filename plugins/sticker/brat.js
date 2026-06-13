exports.default = {
   names: ['Maker'],
   tags: ['brat'],
   command: ['brat'],
   start: async (m, {
      conn,
      prefix,
      text,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Kirim perintah ${prefix+command} text\ncontoh: ${prefix+command} ${setting.botName}`);
      const result = await toBuffer(`https://aqul-brat.hf.space/?text=${text}`);
      conn.adReply(m.chat, loading, cover, m).then(() => {            
         conn.sendImageAsSticker(m.chat, result, m, {
           packname: setting.botName,
           author: `${setting.footer === '' ? sticker_wm : setting.footer}\ncreated : \n${waktu.tanggal}\n${waktu.time} ${waktu.suasana}`
         })
      })
   },
   limit: 2
}