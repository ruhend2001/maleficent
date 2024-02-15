export default {
   names: ['Maker'],
   tags: ['attp', 'ttp'],
   command: ['attp', 'ttp'],
   start: async (m, {
      conn,
      prefix,
      text,
      command,
      Format
   }) => {
      let pack = setting.botName
      let own = setting.footer
      if (!text) return m.reply(`Kirim perintah ${prefix+command} text\ncontoh: ${prefix+command} ${setting.botName}`);
      let result = await Format.attp(text);
      m.adReply(mess.wait, setting.thumbnail, m.chat).then(async () => {            
         conn.sendImageAsSticker(m.chat, result, m, {
           packname: pack,
           author: `${own}\ncreated : \n${waktu.tanggal}\n${waktu.time} ${waktu.suasana}`
         });
      })
   },
   limit: true
};
