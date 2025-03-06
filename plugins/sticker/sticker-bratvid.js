exports.default = {
   names: ['Maker'],
   tags: ['bratvid'],
   command: ['bratvid', 'bratvideo'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Kirim perintah ${prefix+command} text\ncontoh: ${prefix+command} ${setting.botName}`);
      const result = await BUFFER_URL(`https://fastrestapis.fasturl.cloud/maker/brat/animated?text=${text}&mode=animated`);
      conn.adReply(m.chat, loading, cover, m).then(() => {            
         conn.sendImageAsSticker(m.chat, result, m, {
           packname: setting.botName,
           author: `${setting.footer}\ncreated: \n${waktu.tanggal}\n${waktu.time} ${waktu.suasana}`
         })
      })
   },
   limit: 2
}