const { ttdl } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['tiktok', 'titit'],
   command: ['tt', 'tiktok', 'ttdl', 'titit', 'ttnowm'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Tiktok contoh\n${prefix+command} ` + 'https://vt.tiktok.com/ZSYfBvx5d/')
      if (text.includes('Postingan ini dibagikan via TikTok Lite.')) return m.reply('Salin Link Nya Ajh Bisa Ga Sih');      
      const { title, author, username, published, like, comment, share, views, bookmark, video, cover: picture, music } = await ttdl(text);      
      await conn.adReply(m.chat, username, cover, m);
      let caption = `${head("𝐓𝐈𝐊𝐓𝐎𝐊")} \n`
      caption += `⭔ *Author:* ${author}\n`
      caption += `⭔ *Username:* ${username}\n`      
      caption += `⭔ *Published:* ${published}\n`
      caption += `⭔ *Like:* ${like}\n`
      caption += `⭔ *Comment:* ${comment}\n`
      caption += `⭔ *Views:* ${views}\n`
      caption += `⭔ *Bookmark:* ${bookmark}\n`
      caption += `⭔ *Description:* ${title}\n`
      caption += `${zw} ${namebot}\n ${wm}`
      conn.sendFile(m.chat, video, caption, m)
   },
   limit: 2
}
