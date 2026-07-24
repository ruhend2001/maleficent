exports.default = {
   names: ['Downloader'],
   tags: ['sfile'],
   command: ['sfile'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh: ${prefix+command} https://sfile.mobi/agJlyQTbq0T`);
      m.react('🍌')
      const data = await Scraper.sfile(text);
      const caption = `${head('*SFILE*')}\n` +
      `*Name:* ${data.title}\n` +
      `*Size:* ${data.size}\n` +
      `*Mimetype:* ${data.mime_type}\n` +
      `*Uploaded By:* ${data.author.name}\n` +
      `*Uploaded Date:* ${data.upload_date}\n` +
      `*Total Download:* ${data.downloads}` 
      conn.adReply(m.chat, caption, 'https://files.catbox.moe/wbgchw.jpg', m).then(() => {
         conn.sendFile(m.chat, data.direct_cdn_link, '', m, {
            document: true,
            fileName: data.title,
            mimetype: data.mime_type
         })
      })
   }
}