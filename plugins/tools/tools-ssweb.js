exports.default = {
   names: ['Tools'],
   tags: ['ssweb'],
   command: ['ssweb'],
   start: async (m, {
      conn,
      text,
      prefix,
      command     
   }) => {
      if (!text) return m.reply('Masukan link atau url yang mau di screenshot webnya\ncontoh: ' + prefix + command + ' ' + link_group);
      await conn.sendFile(m.chat, await BUFFER_URL('https://image.thum.io/get/width/1900/crop/1000/fullpage/' + text), text, m);
   },
   limit: 2
}