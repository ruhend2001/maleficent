const search = require("yt-search");
const savetube = require('../../lib/src/scraper/savetube.js');
const ocean = require('../../lib/src/scraper/ocean.js');
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
      let data = await search(text), res = data.all, url = data.videos[0], link = url.url, thumb = `https://i.ytimg.com/vi/${url.videoId}/0.jpg`, result = '';
      result += `🎧 〔 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐏𝐋𝐀𝐘 〕\n`      
      result += `*⭔ Title:* ${url.title}\n`
      result += `*⭔ Durasi:* ${url.timestamp}\n`
      result += `*⭔ Views:* ${url.views.toLocaleString()}\n`
      result += `*⭔ Name Channel:* ${url.author.name}\n`
      result += `*⭔ Channel:* ${url.author.url}\n`
      result += `*⭔ URL Video:* ${url.url}\n\n`
      result += ` *Loading audio sedang dikirim...*`
      const audio = await savetube.download(link, '144').catch(async () => await ocean(link, 'mp3'));
      conn.adReply(m.chat, result, audio?.result?.thumbnail || audio?.thumbnail || cover, m);
      const pretty = await Format.mp3Play(await toBuffer(audio?.result?.download || audio?.link));      
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
   limit: 2
}