exports.default = {
   names: ['Maker'],
   tags: ['stickermeme', 'smeme', 'memek'],
   command: ['stickermeme', 'smeme', 'memek'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      mime,
      quoted,
      Format
   }) => {
      if (/(webp|image)/.test(mime)) {
         if (!text) return m.reply(`Balas Atau Kirim image dengan caption ${prefix + command} text1 | text2`);
         const up = text.split('|')[0] ? text.split('|')[0] : ' ‎'
         const down = text.split('|')[1] ? text.split('|')[1] : ' ‎'
         const media = await Format.upload4(await conn.download(quoted));
         const data = await BUFFER_URL(`https://api.memegen.link/images/custom/${encodeURIComponent(up ? up : '')}/${encodeURIComponent(down ? down : '')}.png?background=${media}`);
         conn.sendImageAsSticker(m.chat, data, m, {
            packname: setting.botName,
            author: setting.footer
         });
      } else {
         return m.reply(`Balas Atau Kirim Gambar dengan caption ${prefix + command} text1 | text2`)
      }
   },
   limit: 2
}