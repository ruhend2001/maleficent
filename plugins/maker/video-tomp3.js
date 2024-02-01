export default {
   names: ['Maker'],
   tags: ['toaudio'],
   command: ['tomp3', 'toaudio'],
   start: async (m, {
      conn,
      prefix,
      command,
      args,
      mime,
      quoted,
      Format
   }) => {
      if (/audio|video/.test(mime) || m.mtype === 'videoMessage' || m.mtype === 'documentMessage' || m.mtype === 'audioMessage') {
         if (!quoted) return
         let buffer = await quoted.download();
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         let audio = await Format.toAudio(buffer).catch(e => { 
            return m.reply('terjadi kesalah mungkin videonya jelek atau mungkin durasi video mungkin terlalu pendek dan panjang\n' + 'status code: '+ String(e))
            console.error(e)
         });
         conn.sendFile(m.chat, audio, {
            mimetype: 'audio/mp4',
            ptt: true,
            quoted: m
         })
      } else {
         m.reply(`reply video atau kirim video dengan pesan ${prefix+command}`)
      }
   },
   limit: true
};
