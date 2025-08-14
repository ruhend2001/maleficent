exports.default = {
   names: ['Tools'],
   tags: ['getpp'],
   command: ['getpp'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (m?.quoted?.sender) {
         m.react('🕒')
         const data = await conn.profilePictureUrl(m.quoted.sender, 'image').catch(() => 'https://files.catbox.moe/a9911x.jpg')
         conn.sendFile(m.chat, data, '', m);
      } else if (text) {
         m.react('🕒')
         const num = conn.decodeNum(text)
         const number = m.isLid ? num + '@lid' : num + '@s.whatsapp.net';
         const data = await conn.profilePictureUrl(number, 'image').catch(() => 'https://files.catbox.moe/a9911x.jpg')
         conn.sendFile(m.chat, data, '', m);
      } else if (!text || !m?.quoted?.sender) {
         return m.reply(`balas salah satu pesan dia jika ingin pp getpp dia atau tag atau masukan nomor nya \ncontoh: ${prefix+command} @tag\natau: ${prefix+command} 62xxxx`);
      }
   },
   limit: 2
}