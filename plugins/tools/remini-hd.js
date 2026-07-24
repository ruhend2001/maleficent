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
      isPremium
   }) => {
      if (/image|webp/.test(mime) || m.mtype === 'imageMessage' || m.mtype === 'stickerMessage') {
         if (!m.isGroup && !isPremium) return m.reply('HD Di Private Chat Hanya Pengguna Premium Saja\nHubungi Owner Untuk Upgrade Ke Premium .owner');
         // if (m.isGroup && !db.chats[m.chat].hd) return conn.reply(m.chat, 'Ups HD Masih Di Nonaktifkan Owner Untuk Group Ini\nHubungi Owner Untuk Mengaktifkan Ketik .on hd', m);
         m.react('🕒');
         const media = await toBuffer(await conn.download(quoted));
         conn.adReply(m.chat, loading, cover, m);
         const data = await Scraper.ihancer(media, { size: isPremium ? 'high' : 'medium' });    
         conn.sendFile(m.chat, data, `${star} Berhasil`, m);         
      } else {
        return m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}`)
      }
   },
   limit: 5,
   disable: false
};