import fetch from 'node-fetch'
import { ytmp4, ytmp3v2, ytsearch } from '../../lib/download.js'
export default {
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
      m.reply(loading);
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
      m.adsReply(play, thumbnail, m.chat)
      let { audio } = await ytmp3v2(url);
      let { video } = await ytmp4(url);
      let audi0; let progress;
      try { audi0 = await Format.getBuffer(audio); progress = 'V1'; } catch { audi0 = await Format.getBuffer(video); progress = 'V2'; }
      let data = await Format.mp3v2(audi0);
      if (data) {
         return conn.sendFile(m.chat, data, {
            mimetype: 'audio/mp4',
            ptt: true,
            fileName: title,
            quoted: m,
            contextInfo: {
               externalAdReply: {
                  mediaType: 2,
                  mediaUrl: url,
                  title: title,
                  body: setting.botName + ` ${progress}`,
                  sourceUrl: url,
                  thumbnail: await (await fetch(thumbnail)).buffer()
               }
            }
         })
      }
   },
   limit: 5,
   premium: false
}
