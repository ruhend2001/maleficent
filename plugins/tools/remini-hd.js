exports.default = {
   names: ['Tools'],
   tags: ['remini', 'hd'],
   command: ['remini', 'hd', 'hdr'],
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
         m.react('🕒');
         const content = await conn.downloadAndSaveMediaMessage(quoted);
         conn.adReply(m.chat, loading, cover, m);
         const data = await Format.HD2(content);         
         conn.sendFile(m.chat, data, {
            caption: `${star} Berhasil`,
            quoted: m
         })
      } else {
        return m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}`)
      }
   },
   limit: 5,
   premium: false,   
   disable: false
};