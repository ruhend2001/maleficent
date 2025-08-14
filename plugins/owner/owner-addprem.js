exports.default = {
   names: ['Owner'],
   tags: ['addprem'],
   command: ['addpremium', 'addprem'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukkan / Tag Nomornya\ncontoh: ${prefix + command} nomor.waktu sampainya\ncontoh: ${prefix + command} 62xxxxx.10 juli 2090\ntitik setelah nomor`);
      const parts = text.split("."), numberPart = parts[0].trim(), time = parts[1] ? parts[1].trim() : '';
      if (!time) return m.reply(`Masukan waktu premium nya \nContoh: ${prefix + command} nomor.tanggal\nContoh: ${prefix + command} 62xxxxx.10 juli 2090\nAtau \nContoh: ${prefix + command} @tag.10 juli 2090`);
      const Number = conn.decodeNum(numberPart);
      if (!Number || isNaN(Number)) return m.reply(`Nomor tidak valid. Silakan masukkan nomor tanpa karakter yang tidak diinginkan.`);
      const num = m.isLid ? Number + '@lid' : Number + '@s.whatsapp.net'
      if (!db.users[num]) throw 'Nomor tidak ada dalam database coba untuk addprem dari grup dan setidaknya dia chat agar database dia masuk'
      db.users[num].premium = true
      db.users[num].premiumTime = time
      db.users[num].limit += 1000
      m.reply(`Nomor ${num.split('@')[0]} menjadi premium dan mendapatkan bonus utama limit 1000`);
   },
   owner: true
}