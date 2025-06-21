exports.default = {
   names: ['Tools'],
   tags: ['circle', 'bulat'],
   command: ['circle', 'bulat'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      mime,
      quoted,
      Format     
   }) => {
      if (/image/.test(mime) || m.mtype === 'imageMessage') {
         try {
            m.react('🕒');
            const content = await quoted.download();
            conn.adReply(m.chat, loading, cover, m);
            const image = text ? await Format.circle_photo(content, parseInt(text)) : await Format.circle_photo(content);
            conn.sendFile(m.chat, image, '', m);
         } catch {
            throw 'Error when converting !'
         } 
      } else {
        return m.reply(`Balas atau kirim gambar dengan caption ${prefix+command} yang mau di jadikan ke bulat\noptional kamu dapat menyesuaikan ukuran gambar contoh:\n${prefix+command} 300`)
      }
   },
   limit: 2
}