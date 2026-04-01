exports.default = {
   names: ['Maker'],
   tags: ['stickerwm', 'take'],
   command: ['stickerwm', 'swm', 'wm', 'take'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      mime,
      quoted,
      isPremium
   }) => {
      const pack = text.split('|')[0] ? text.split('|')[0] : undefined;
      const own = text.split('|')[1] ? text.split('|')[1] : undefined; 
      let author; if (own === undefined) author = isPremium ? undefined : sticker_wm;
      else author = isPremium ? own : `${own}\n${sticker_wm}`;
      if (/webp|sticker|image|video/.test(mime) || m.mtype === 'stickerMessage' || m.mtype === 'imageMessage') {
         const buffer = await quoted.download();
         conn.adReply(m.chat, loading, cover, m);
         if (text) {
            conn.sendSticker(m.chat, buffer, m, {
               packname: pack,
               author: author
            })
         } else {
            conn.sendSticker(m.chat, buffer, m, {
               packname: setting.botName,
               author: `${setting.footer === '' || setting.footer === undefined ? sticker_wm : setting.footer}\ncreated : \n${waktu.tanggal}\n${waktu.time} ${waktu.suasana}`
            })
         }
      } else if (/lottie/.test(mime)) {
         throw 'Tidak support sticker animasi dari WhatsApp resmi';
      } else {
         return m.reply(`Balas stiker dengan caption ${prefix + command}\ngunakan | sebagai pemisahan (optional)`);
      }
   },
   premium: false
}