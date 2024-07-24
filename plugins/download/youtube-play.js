const fetch = require('node-fetch');
const { ytmp4, ytsearch } = require('ruhend-scraper');
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
      if (!text) return m.reply(`Masukan Lagu Yang Ingin Di Cari\ncontoh ${prefix+command} papinka sana sini aku rindu atau .play linknya https://youtu.be/uNkO9WWIzHE`);
      let vid = (await ytsearch(text)).video[0]
      let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid;
      m.reply(title);
      if (!vid) return m.reply('Tidak di temukan, coba untuk membalikkan judul dan author nya')
      let url = 'http://youtu.be/' + videoId;
      let play = `🎧 〔 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐏𝐋𝐀𝐘 〕\n`
      play += ` ${javi} *Data Di Temukan*\n`
      play += ` ⬡ Judul: ${title}\n`
      play += ` ⬡ Durasi: ${durationH}\n`
      play += ` ⬡ Views: ${viewH}\n`
      play += ` ⬡ Upload: ${publishedTime}\n`
      play += ` ⬡ Link: ${url}\n\n`
      play += ` *Loading audio sedang dikirim...*`      
      let { video } = await ytmp4(url);      
      let audio = await Format.mp3v2(conn, video, 'mp4', m);
      conn.adReply(m.chat, play, thumbnail, m).then(async () => {
         conn.sendFile(m.chat, audio, {
            mimetype: 'audio/mp4',
            fileName: title,
            quoted: m,
            contextInfo: {
               externalAdReply: {
                  mediaType: 2,
                  mediaUrl: url,
                  title: title,
                  body: setting.botName,
                  sourceUrl: url,
                  thumbnail: await (await fetch(thumbnail)).buffer()
               }
            }
         })          
      })
   },
   limit: 3,
   premium: false
}
