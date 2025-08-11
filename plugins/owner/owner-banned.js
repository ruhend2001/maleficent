exports.default = {
   names: ['Owner'],
   tags: ['banned', 'ban'],
   command: ['banned', 'ban'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (!text) return m.reply(`Masukkan Nomor dan alasan nya Contoh: ${prefix+command} nomor(titik)alasan\nContoh: ${prefix+command} +62 878-7855-4275.karena dia toxic atau menghina bot\n\nlihat profile yang mau kamu banned dan salin nomornya terus tempel atau .ban @tag.alasan\n\ntitik setelah nomor atau tag`);
      const number = text.split(".")[0], reason = text.split(".")[1];
      if (!reason) return m.reply(`Masukan Alasannya \nContoh: ${prefix+command} nomor.alasan\nContoh: ${prefix+command} 62xxxxx.karena dia toxic atau menghina bot\n\ntitik setelah nomor atau tag`)
      const Number = number.replace(/[@+\s-]/g, '');
      const num_1 = m.jid(Number+'@lid')      
      const num = num_1.endsWith('net') ? num_1 : Number + '@s.whatsapp.net'      
      db.users[num].banned = true
      db.users[num].bannedReason = reason
      m.reply(`Nomor ${num.split('@')[0]} berhasil di banned\nSekarang Nomor Itu Tidak Bisa Menggunakan Bot Ini\n\nAlasan Di Banned:\n${reason}\n\nUntuk melihat daftar banned ketik .listbanned`);
   },   
   owner: true 
}