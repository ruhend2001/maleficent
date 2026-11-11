const search = require('yt-search');
const fetch = require('node-fetch');
exports.default = {
   tags: 'download',
   help: ['play', 'lagu'],
   command: ['play', 'lagu'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Lagu Yang Ingin Di Cari\ncontoh ${prefix+command} papinka sana sini aku rindu atau .play linknya https://youtu.be/A5Jj6Ib91zA`);
      m.react('⏳')
      let data = await search(text)      
      const url = data.videos[0]
      const link = url.url
      const thumb = `https://i.ytimg.com/vi/${url.videoId}/0.jpg`
      let result = '';
      result += `🎧 〔 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐏𝐋𝐀𝐘 〕\n`
      result += `*⭔ Title:* ${url.title}\n`
      result += `*⭔ Durasi:* ${url.timestamp}\n`
      result += `*⭔ Views:* ${url.views.toLocaleString()}\n`
      result += `*⭔ Name Channel:* ${url.author.name}\n`
      result += `*⭔ Channel:* ${url.author.url}\n`
      result += `*⭔ URL Video:* ${url.url}\n\n`
      result += ` *Loading audio sedang dikirim...*`
      conn.adReply(m.chat, result, thumb ?? cover, m)
      const res = await fetchJSON(`https://ruhend-api.mywire.org/api/ytmp3?url=${link}&key=${key}`)
      if (!res?.data) throw res
      const media = await Utils.mp3Play(await toBuffer(res.data.link));     
      if (res.data.link) m.react('✅')      
      await conn.sendFile(m.chat, media, url.title, m, { ptt: true })
   },
   limit: 2
}