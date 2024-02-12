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
         let content = await quoted.download();
         m.adReply(mess.wait, setting.thumbnail, m.chat);
         let data = await Format.HD(content);         
         conn.sendFile(m.chat, data, {
            caption: star + ' Berhasil Di Tingkatkan',
            quoted: m
         })
      } else {
         m.reply(`Balas Atau Kirim image dengan caption ${prefix+command}`)
      }
   },
   limit: 15,//banyakin limitnya ke enakan usernya nanti kalo limit kecil kan bisa beli premium usernya ke elu :)
   premium: false,
   disable: false
};
