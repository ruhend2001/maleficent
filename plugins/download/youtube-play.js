const search = require("yt-search");
const { ytmp3 } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['play', 'song', 'lagu'],
   command: ['play', 'song', 'lagu'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Masukan Lagu Yang Ingin Di Cari\ncontoh ${prefix+command} papinka sana sini aku rindu atau .play linknya https://youtu.be/A5Jj6Ib91zA`);
      let data = await search(text), res = data.all, url = data.videos[0], thumb = url.thumbnail, result = '';
      result += `🎧 〔 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐏𝐋𝐀𝐘 〕\n`
      result += `⭔ ID: ${url.videoId}\n`
      result += `⭔ URL: ${url.url}\n`
      result += `⭔ Title: ${url.title}\n`
      result += `⭔ Thumbnail: ${url.thumbnail}\n`
      result += `⭔ Durasi: ${url.timestamp}\n`
      result += `⭔ Views: ${url.views.toLocaleString()}\n`
      result += `⭔ Name Channel: ${url.author.name}\n`
      result += `⭔ URL Channel: ${url.author.url}\n\n`
      result += ` *Loading audio sedang dikirim...*`      
      conn.adReply(m.chat, result, thumb, m);
      const { audio } = await ytmp3(url.url);      
      const pretty = await Format.mp3Play(await BUFFER_URL(audio));
      conn.sendFile(m.chat, pretty, url.title, m, {
         mimetype: 'audio/mp4',
         fileName: url.title,
         contextInfo: {
            externalAdReply: {
               mediaType: 2,
               mediaUrl: url.url,
               title: url.title,
               body: setting.botName,
               sourceUrl: url.title,
               thumbnail: await BUFFER_URL(thumb)
            }
         }
      })
   },
   limit: 3
}