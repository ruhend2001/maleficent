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
      Format,
      isPremium
   }) => {
      if (/image|webp/.test(mime) || m.mtype === 'imageMessage' || m.mtype === 'stickerMessage') {
         if (!m.isGroup && !isPremium) return m.reply('Ups HD Di Private Chat Hanya Pengguna Premium Saja ');
         if (m.isGroup && !db.chats[m.chat].hd) return conn.reply(m.chat, 'Ups HD Masih Di Nonaktifkan Owner Untuk Group Ini\nUntuk Mengaktifkan Ketik .on hd', m, { contextInfo: { mentionedJid: [...setting.ownerNumber, setting.botNumber].map(num => `${num}@s.whatsapp.net`)}});
         m.react('🕒');
         const media = await conn.download(quoted);
         const tmp = await Format.upload4(media);    
         const image = `https://fastrestapis.fasturl.link/aiimage/upscale?imageUrl=${tmp}&resize=2`;
         conn.adReply(m.chat, loading, cover, m);
         conn.sendFile(m.chat, await toBuffer(image), `${star} Berhasil`, m);         
      } else {
        return m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}`)
      }
   },
   limit: 5,
   disable: false
};