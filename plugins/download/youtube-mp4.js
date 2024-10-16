/**
  * kalo fitur downloader ytmp4 ytmp3 itu ada bacaan forbidden berarti ip address kamu di block cloudflare 
  * biasanya itu kamu gunain panel atau vps digital ocean ( selain itu yang lain aman)
  * solusi ? lewat API ajah 😂 Bisa kan
  * cari website API yang bagus
 **/
const { ytmp4 } = require('ruhend-scraper');
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
      let { title, video, quality, size, thumbnail } = await ytmp4(text)     
      m.react('⏳')
      let caption = `📽 𝐘𝐎𝐔𝐓𝐔𝐁𝐄\n`
      caption += `⭔ *Title:* ${title}\n`
      caption += `⭔ *Quality:* ${quality}\n`
      caption += `⭔ *Size:* ${size}`
      conn.adReply(m.chat, title, thumbnail || cover, m).then(() => {
         conn.sendFile(m.chat, video, {
            caption: caption,
            quoted: m
         })
      }) 
   },
   limit: 3,
   premium: false
}