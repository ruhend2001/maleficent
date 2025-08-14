exports.default = {
   names: ['Owner'],
   tags: ['addlimit'],
   command: ['addlimit', 'tambahlimit'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukkan/ tag nomor dan limitnya \natau tag yang mau di tambahkan limit dan masukan limitnya \nContoh: ${prefix + command} nomor limit\nContoh: ${prefix + command} 62xxxxx 25 \nAtau\nContoh: ${prefix + command} @tag 25`);
      const parts = text.split(" "), limit = parts.pop(), number = parts.join(" "); 
      if (!limit || isNaN(limit)) return m.reply(`Masukan limitnya berupa angka \nContoh: ${prefix + command} nomor(spasi)limit\nContoh: ${prefix + command} 62xxxxx 25\nAtau \nContoh: ${prefix + command} @tag 25`);
      const Number = conn.decodeNum(number)
      const num = m.isLid ? Number + '@lid' : Number + '@s.whatsapp.net'
      if (!db.users[num]) return m.reply(`Pengguna dengan nomor ${num} tidak ditemukan dalam database. Pastikan nomor sudah terdaftar.`);
      db.users[num].limit += parseInt(limit);
      m.reply(`Berhasil Menambahkan ${limit} Limit Ke ${num.split('@')[0]}`);
   },
   owner: true
};