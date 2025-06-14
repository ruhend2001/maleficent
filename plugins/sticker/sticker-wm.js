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
      quoted
   }) => {
      const pack = text.split('|')[0] ? text.split('|')[0] : undefined
      const own = text.split('|')[1] ? text.split('|')[1] : undefined
      if (/webp|image/.test(mime) || m.mtype === 'stickerMessage' || m.mtype === 'imageMessage') {
         const buffer = await quoted.download();
         conn.adReply(m.chat, loading, cover, m);
         conn.sendImageAsSticker(m.chat, buffer, m, {
            packname: pack,
            author: own === undefined ? sticker_wm : own + '\n© Ruhend' //u can change yours 
         });
      } else {
         return m.reply(`Balas stiker dengan caption ${prefix + command}\ngunakan | sebagai pemisahan (optional)`);
      }
   },
   premium: false
}