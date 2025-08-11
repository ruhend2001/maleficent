exports.default = {
   names: ['Owner'],
   tags: ['addprem'],
   command: ['addpremium', 'addprem'],
   start: async (m, {
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukkan / Tag Nomornya\ncontoh: ${prefix + command} nomor.waktu sampainya\ncontoh: ${prefix + command} 62xxxxx.10 juli 2090\ntitik setelah nomor`);
      const parts = text.split("."), numberPart = parts[0].trim(), time = parts[1] ? parts[1].trim() : '';
      if (!time) return m.reply(`Masukan waktu premium nya \nContoh: ${prefix + command} nomor.tanggal\nContoh: ${prefix + command} 62xxxxx.10 juli 2090\nAtau \nContoh: ${prefix + command} @tag.10 juli 2090`);
      const Number = numberPart.replace(/[@+\s-]/g, '');
      if (!Number || isNaN(Number)) return m.reply(`Nomor tidak valid. Silakan masukkan nomor tanpa karakter yang tidak diinginkan.`);
      const num_1 = m.jid(Number+'@lid')      
      const num = num_1.endsWith('net') ? num_1 : Number + '@s.whatsapp.net'
      db.users[num].premium = true
      db.users[num].premiumTime = time
      db.users[num].limit += 1000
      m.reply(`Nomor ${num.split('@')[0]} menjadi premium dan mendapatkan bonus utama limit 1000`);
   },
   owner: true
}