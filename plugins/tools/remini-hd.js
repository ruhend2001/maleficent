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
      if (/image/.test(mime) || m.mtype === 'imageMessage') {                 
         /** 
          * untuk nyalain ketik .on hd
          * biar ga di spam hd ke enakan dia nantinya udh gratis g tau diri
          * matiin lagi .off hd
          * soalnya kalo koid nih fitur agak susah kalo di spam hd
          **/
         if (!m.isGroup && !isPremium) return m.reply('Ups HD Di Private Chat Hanya Pengguna Premium Saja ');
         if (m.isGroup && !db.chats[m.chat].hd) return conn.reply(m.chat, 'Ups HD Masih Di Nonaktifkan Owner Untuk Group Ini\nUntuk Mengaktifkan Ketik .on hd', m, { contextInfo: { mentionedJid: [...setting.ownerNumber, setting.botNumber].map(num => `${num}@s.whatsapp.net`)}});
         m.react('🕒');
         const content = await conn.download(quoted);
         conn.adReply(m.chat, loading, cover, m);
         const data = await Format.HD2(content); 
         conn.sendFile(m.chat, data, `${star} Berhasil`, m);         
      } else {
        return m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}`)
      }
   },
   limit: 2,
   disable: false
};