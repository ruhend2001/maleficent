const { ytmp4v4 } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['ytmp4'],
   command: ['ytmp4', 'ytv'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Masukan Link Youtubenya ${prefix+command} https://youtu.be/MvsAesQ-4zA`)
      let { title, video, thumbnail } = await ytmp4v4(text)     
      let caption = ` 📽 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐕𝐈𝐃𝐄𝐎\n`
      caption += `${title}`  
      let media = await Format.streamFile(conn, video, 'mp4', m);      
      conn.adReply(m.chat, caption, thumbnail || cover, m).then(() => {
         //conn.docFile(m.chat, media, `${title}~Ruhend-MD.mp4`, '', 'video/mp4', m);
         conn.sendFile(m.chat, video, {
            caption: caption,
            quoted: m
         })
      }) 
   },
   limit: 3,
   premium: false
};