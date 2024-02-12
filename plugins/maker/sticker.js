export default {
   names: ['Maker'],
   tags: ['sticker'],
   command: ['sticker', 's', 'stiker', 'sk'],
   start: async (m, {
      conn,
      prefix,
      command,
      mime,
      quoted
   }) => {
      let pack = setting.botName;
      let own = setting.footer;
      if (/image|video/.test(mime) || m.mtype === 'imageMessage' || m.mtype === 'videoMessage') {
         if (!quoted) return;
         let buffer = await quoted.download();
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         conn.sendImageAsSticker(m.chat, buffer, m, {
            packname: pack,
            author: `${own}\ncreated : \n${waktu.tanggal}\n${waktu.jam} ${waktu.suasana}`
         });
      } else {
         m.reply(`Kirim gambar atau video dengan caption ${prefix + command} atau balas gambar yang sudah dikirim`);
      }
   },
   limit: true
};
