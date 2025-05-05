exports.default = {
   names: ['Info'],
   tags: ['idch', 'infochannel', 'infoch'],
   command: ['idch', 'infochannel', 'infoch'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply('Masukan Link Channelnya \ncontoh ' + prefix + command + ' https://whatsapp.com/channel/0029VaGuQ62FnSz')
      const id = text.replace('https://whatsapp.com/channel/', '');
      const data = await conn.newsletterMetadata('invite', id, 'GUEST');
      const creationDate = new Date(data.creation_time * 1000).toLocaleDateString();
      const caption = zw + ` *CHANNEL INFO*\n\n` +
      `*ID:* ${data.id}\n` +
      `*Status:* ${data.state}\n` +
      `*Tanggal Dibuat:* ${creationDate}\n` +
      `*Nama:* ${data.name}\n` +
      `*Deskripsi:* ${data.description}\n` +
      `*Pengikut:* ${data.subscribers.toLocaleString().replace(/\,/, '.')}\n` +
      `*Verifikasi:* ${data.verification == 'UNVERIFIED' ? 'Tidak' : 'Iya'}`;
      conn.adReply(m.chat, caption, cover, m)
   }
}