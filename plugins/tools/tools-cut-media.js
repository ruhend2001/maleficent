exports.default = {
   names: ['Tools'],
   tags: ['cutaudio', 'pangkasaudio', 'cutvideo', 'pangkasvideo'],
   command: ['cutaudio', 'pangkasaudio', 'cutvideo', 'pangkasvideo'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      quoted,
      mime,
      Format
   }) => {
      if (/cutaudio|pangkasaudio/.test(command)) {
         if (/audio|document/.test(mime) || m.mtype === 'audioMessage' || m.mtype === 'documentMessage') {
            const time_1 = text.split(' ')[0]
            if (!time_1) return m.reply(`contoh ${prefix+command} awal akhir\ncontoh ${prefix+command} 00:01 01:25\n\nsesuaikan saja waktunya perhatikan juga panjang waktu audionya\n\njika ingin jadi voice note tambahkan di belakang\n--vn atau --ptt\n\ncontoh\n${prefix+command} 00:01 01:25 --vn\natau\n${prefix+command} 00:01 01:25 --ptt`);
            const time_2 = text.split(' ')[1]
            if (!time_2) return m.reply(`contoh ${prefix+command} awal akhir\ncontoh ${prefix+command} 00:01 01:25\n\nsesuaikan saja waktunya perhatikan juga panjang waktu audionya\n\njika ingin jadi voice note tambahkan di belakang\n--vn atau --ptt\n\ncontoh\n${prefix+command} 00:01 01:25 --vn\natau\n${prefix+command} 00:01 01:25 --ptt`);
            m.reply('Tunggu Sedang Di Proses..');
            const audio = await conn.download(quoted);
            const data = await Format.crop_audio(audio, time_1, time_2);
            m.reply('Done')
            conn.sendFile(m.chat, data, '', m, {
               ptt: text.includes('--vn') || text.includes('--ptt') ? true : false
            })
         } else {
            return m.reply('Balas audio nya Mana ?')
         }
      } else if (/cutvideo|pangkasvideo/.test(command)) {
         if (/video|document/.test(mime) || m.mtype === 'videoMessage' || m.mtype === 'documentMessage') {
            const time_1 = text.split(' ')[0]
            if (!time_1) return m.reply(`contoh ${prefix+command} awal akhir\ncontoh ${prefix+command} 00:01 01:25\n\nsesuaikan saja waktunya perhatikan juga panjang waktu videonya`);
            const time_2 = text.split(' ')[1]
            if (!time_2) return m.reply(`contoh ${prefix+command} awal akhir\ncontoh ${prefix+command} 00:01 01:25\n\nsesuaikan saja waktunya perhatikan juga panjang waktu videonya`);
            m.reply('Tunggu Sedang Di Proses..');
            const video = await conn.download(quoted);
            const data = await Format.crop_video(video, time_1, time_2);
            m.reply('Done')
            conn.sendFile(m.chat, data, '', m)
         } else {
            return m.reply('Balas audio nya Mana ?')
         }
      }
   },
   limit: 2
};