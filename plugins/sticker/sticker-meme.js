exports.default = {
   names: ['Maker'],
   tags: ['stickermeme', 'smeme'],
   command: ['stickermeme', 'smeme'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      mime,
      quoted,
      Format
   }) => {
      if (!/webp/.test(mime) || /image/.test(mime) || m.mtype === 'imageMessage') {
         if (!text) return m.reply(`Balas Atau Kirim image dengan caption ${prefix + command} text1|text2`)                  
         if (!quoted) return
         const up = text.split('|')[0] ? text.split('|')[0] : ' ‎'
         const down = text.split('|')[1] ? text.split('|')[1] : ' ‎'
         const media = await quoted.download();
         const meme = await Format.smeme(media, up, down);
         conn.sendImageAsSticker(m.chat, meme, m, {
            packname: setting.botName,
            author: setting.footer
         })
      } else {
         return m.reply(`Balas Atau Kirim Gambar dengan caption ${prefix + command} text1|text2`)
      }
   },
   limit: true,
   premium: false
};