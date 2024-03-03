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
      if (!text) return m.reply(`Masukan Tiktok contoh\n${prefix+command}` + ' https://vt.tiktok.com/ZSFA2Bh4G/')
      let { title, name, username, published, like, comment, share, views, bookmark, video, duration } = await ttdl(text);
      let Tiktok = ` 𝐓𝐈𝐊𝐓𝐎𝐊\n`
      Tiktok += ` ⭔ Name : ${name}\n`
      Tiktok += ` ⭔ Judul : ${title}\n`
      Tiktok += ` ⭔ User Name : ${username}\n`
      Tiktok += ` ⭔ Published : ${published}\n`
      Tiktok += ` ⭔ Like : ${like}\n`
      Tiktok += ` ⭔ Comment : ${comment}\n`
      Tiktok += ` ⭔ Share : ${share}\n`
      Tiktok += ` ⭔ Views : ${views}\n`
      Tiktok += ` ⭔ Bookmark : ${bookmark}\n`
      Tiktok += ` ⭔ Duration : ${duration}`
      m.adReply(loading, setting.thumbnail, m.chat).then(() => {
         conn.sendFile(m.chat, video, {
            caption: Tiktok,
            quoted: m
         })
      })
   },
   limit: 5,
   premium: false
};
