const search = require("yt-search");
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
      m.react('🎧')
      let data = await search(text), res = data.all, url = data.videos[0], link = url.url, thumb = `https://i.ytimg.com/vi/${url.videoId}/0.jpg`, result = '';
      result += `🎧 〔 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐏𝐋𝐀𝐘 〕\n`      
      result += `*⭔ Title:* ${url.title}\n`
      result += `*⭔ Durasi:* ${url.timestamp}\n`
      result += `*⭔ Views:* ${url.views.toLocaleString()}\n`
      result += `*⭔ Name Channel:* ${url.author.name}\n`
      result += `*⭔ Channel:* ${url.author.url}\n`
      result += `*⭔ URL Video:* ${url.url}\n\n`
      result += ` *Loading audio sedang dikirim...*`
      conn.adReply(m.chat, result, thumb || cover, m);
      const audio = await Scraper.ocean(link, 'mp3').catch(async () => await Scraper.ocean(link, 'mp4', 144)).catch(async () => await Scraper.ocean(link, 'mp4', 240)).catch(async () => await Scraper.ocean(link, 'mp4', 360)).catch(async () => await Scraper.ocean(link, 'mp4', 480)).catch(async () => await Scraper.ocean(link, 'mp4', 720));
      const pretty = await Format.mp3Play(audio.media);      
      conn.sendFile(m.chat, pretty, url.title, m, {
         contextInfo: {
            externalAdReply: {
               mediaType: 2,
               mediaUrl: link,
               title: url.title,
               body: setting.botName,
               sourceUrl: url.title,
               thumbnail: await toBuffer(thumb)
            }
         }
      })
   },
   limit: 3
}