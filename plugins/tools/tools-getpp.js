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
         const data = await conn.profilePictureUrl(m.quoted.sender, 'image').catch(() => 'https://qu.ax/KfPtl.jpeg')
         conn.sendFile(m.chat, data, '', m);
      } else if (text) {
         m.react('🕒')
         const num = `${text.replace("@", "").replace("-", "").replace("-", "").replace("+62 ", "62").trim()}@s.whatsapp.net`
         const data = await conn.profilePictureUrl(num, 'image').catch(() => 'https://qu.ax/KfPtl.jpeg')
         conn.sendFile(m.chat, data, '', m);
      } else if (!text || !m?.quoted?.sender) {
         return m.reply(`balas salah satu pesan dia jika ingin pp getpp dia atau tag atau masukan nomor nya \ncontoh: ${prefix+command} @tag\natau: ${prefix+command} 62xxxx`);
      }
   },
   limit: 2
}