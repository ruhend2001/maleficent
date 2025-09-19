exports.default = {
   names: ['Downloader'],
   tags: ['googledrive'],
   command: ['gdrive', 'googledrive', 'drive'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Link Google Drove nya contoh ${prefix+command} https://drive.google.com/file/d/1BKaXs8uIt4_C_dEKUje-nn-XYYNOO07y/view?usp=drivesdk`)
      m.react('🕒')
      const res = await Scraper.gdrive(text);
      if (!res) throw res      
      const drive = ` ${star} 𝐆𝐎𝐆𝐆𝐋𝐄 𝐃𝐑𝐈𝐕𝐄\n` +
      ` ${java} Name: ${res.fileName}\n` +
      ` ${java} Type: ${res.mimetype}\n` +
      ` ${java} Size: ${res.fileSize}`
      conn.adReply(m.chat, drive, cover, m).then(() => {
         conn.sendFile(m.chat, res.downloadUrl, '', m, {
            document: true,
            fileName: res.fileName,
            mimetype: res.mimetype
         })
      })
   },
   limit: 5,
   premium: false
};