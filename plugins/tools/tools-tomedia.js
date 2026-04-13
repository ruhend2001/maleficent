exports.default = {
   names: ['Tools'],
   tags: ['tomedia'],
   command: ['tomedia'],
   start: async (m, {
      conn,
      prefix,
      command,
      mime,
      quoted
   }) => {
      if (m?.quoted?.fakeObj?.message?.documentMessage?.mtype === 'documentMessage') {
         m.reply(loading)
         const media = await quoted.download();
         conn.sendFile(m.chat, media, m?.quoted?.fakeObj?.message?.documentMessage?.fileName || '', m);
      } else if (m.mtype === 'documentMessage') {
         m.reply(loading)
         const media = await conn.download(quoted);
         conn.sendFile(m.chat, media, m?.body, m);
      } else {
         return m.reply(`Balas document Atau Kirim document Dengan Caption ${prefix+command} yang ingin di convert ke media`);
      }
   },
   limit: 2
}