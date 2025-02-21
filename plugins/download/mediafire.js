exports.default = {
   names: ['Downloader'],
   tags: ['mediafire'],
   command: ['mediafire', 'mf'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Contoh:\n${prefix+command} https://www.mediafire.com/file/96mscj81p92na3r/images+(35).jpeg/file`);
      const data = (await JSON_URL(`https://malik-jmk.us.kg/api/download/mediafire/v4?url=${text}`)).result;     
      let mediaFire = ` ${zw} 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄\n\n`
      mediaFire += ` Nama : ${data.name}\n`
      mediaFire += ` Size : ${data.size}\n`
      mediaFire += ` Type : ${data.type}\n\n`
      mediaFire += ` Sending File...\n`
      conn.adReply(m.chat, mediaFire, cover, m).then(() => {
         conn.sendFile(m.chat, data.link, '', m, {
            document: true,
            fileName: data.name + '.bin',
            mimetype: 'application/bin'
         })
      })
   },
   limit: true,
   premium: false
};