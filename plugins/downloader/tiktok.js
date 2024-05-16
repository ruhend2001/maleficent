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
      if (!text) return m.reply(`Masukan Tiktok contoh\n${prefix+command}` + ' https://vt.tiktok.com/ZSFW35yJk/')
      let { title, name, username, published, like, comment, share, views, bookmark, video, duration } = await ttdl(text);
      m.adReply(loading, setting.thumbnail, m.chat);
      let b1 = ['🎧 Audio', '.ttmp3 ' + text]
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
      conn.sendButton(m.chat, video, Tiktok, b1, m)
   },
   limit: 5,
   premium: false
}
