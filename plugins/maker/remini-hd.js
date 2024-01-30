export default {
   names: ['Maker'],
   tags: ['remini', 'hd'],
   command: ['remini', 'hd', 'hdr'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      mime,
      quoted,
      Format
   }) => {
      if (/image/.test(mime) || m.mtype === 'imageMessage') {
         if (!quoted) return m.reply(`Balas Atau Kirim image dengan caption ${prefix + command}`)
         m.react('🕒', m.chat);
         let content = await conn.downloadAndSaveMediaMessage(quoted);
         m.adReply(mess.wait, setting.thumbnail, m.chat);
         let res = await Format.upload2(content);
         let data = await Format.HD(res);         
         conn.sendFile(m.chat, data, {
            caption: star + ' Berhasil Di Tingkatkan',
            quoted: m
         })
      } else {
         m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}`)
      }
   },
   limit: 15,
   premium: false,
   disable: false
};