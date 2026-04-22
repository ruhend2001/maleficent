exports.default = {
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
      const pack = setting.botName;
      const own = setting.footer;
      if (/webp|image|video/.test(mime) || m.mtype === 'imageMessage' || m.mtype === 'videoMessage') {
         const buffer = await quoted.download();
         conn.adReply(m.chat, loading, cover, m);
         conn.sendSticker(m.chat, buffer, m, {
            packname: pack,
            author: `${own === '' ? sticker_wm : own}\ncreated : \n${waktu.tanggal}\n${waktu.time} ${waktu.suasana}`
         })
      } else {
         return m.reply(`Kirim gambar atau video dengan caption ${prefix + command} atau balas gambar yang sudah dikirim`);
      }
   },
   limit: 2
};
