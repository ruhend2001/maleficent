import { ttdl } from '../../lib/download.js'
export default {
   names: ['Downloader'],
   tags: ['tiktok', 'titit'],
   command: ['tt', 'tiktok', 'ttdl', 'titit', 'ttnowm'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Tiktok contoh\n${prefix+command}` + ' https://vt.tiktok.com/ZSYfBvx5d/')
      let { desc, avatar, name, like, comment, share, video } = await ttdl(text);
      m.adReply(loading, setting.thumbnail, m.chat);      
      let caption = `${star} 𝐓𝐈𝐊𝐓𝐎𝐊 ${star} \n`
      caption += `${setting.botName}\n`
      caption += `⭔ Name: ${name}\n`
      caption += `⭔ Description : ${desc}\n`
      caption += `⭔ Like: ${like}\n`
      caption += `⭔ Comment: ${comment}\n`
      caption += `⭔ Share: ${share}`
      m.adReply(name, avatar, m.chat).then(() => {
         conn.sendFile(m.chat, video, {
            caption: caption,
            quoted: m
         })
      })
   },
   limit: 3
};
