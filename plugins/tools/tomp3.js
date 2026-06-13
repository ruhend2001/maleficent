exports.default = {
   names: ['Tools'],
   tags: ['toaudio'],
   command: ['tomp3', 'toaudio', 'toptt', 'tovn'],
   start: async (m, {
      conn,
      prefix,
      command,
      mime,
      quoted,
      Format
   }) => {
      if (/audio|video|document/.test(mime) || m.mtype === 'videoMessage' || m.mtype === 'documentMessage' || m.mtype === 'audioMessage') {        
         m.reply(loading)
         const media = await quoted.download();
         const audio = await Format.mp3(media);
         if (/toptt|tovn/.test(command)) return conn.sendFile(m.chat, audio, '', m, { ...opus });
         else return conn.sendFile(m.chat, audio, '', m);
      } else {
         return m.reply(`reply balas audio, video, atau dokumen dengan pesan ${prefix+command}`)
      }
   },
   limit: true
}