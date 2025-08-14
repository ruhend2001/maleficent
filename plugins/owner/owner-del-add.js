exports.default = {
   names: ['Owner'],
   tags: ['addowner', 'delowner'],
   command: ['addowner', 'addown', 'delowner', 'delown'],
   start: async (m, {
      text,
      prefix,
      command
   }) => {
      if (/addowner|addown/.test(command)) {
         if (!text) return m.reply(`Masukkan Nomornya atau ID nya contoh\n${prefix+command} 62xxxx atau tag nomornya \n\nketik .getlid atau balas .getlid ke pesan dia untuk mendapatkan ID whatsapp jika gagal atau belum terdeteksi sebagai owner!`);
         const num = `${text.replace(/[@+\s-]/g, '').trim()}`;
         setting.ownerNumber.push(num);
         save_setting()
         m.reply(`Sukses Menambahkan ${num} sebagai owner`);
      } else if (/delowner|delown/.test(command)) {
         if (!text) return m.reply(`Masukkan Nomor yang ingin dihapus dari daftar owner.`);
         const num = `${text.replace(/[@+\s-]/g, '').trim()}`;
         const index = setting.ownerNumber.indexOf(num);
         if (index !== -1) {
            setting.ownerNumber.splice(index, 1);
            save_setting()
            m.reply(`Nomor ${text.replace('@', '')} berhasil dihapus dari daftar owner.`);
         } else {
            return m.reply(`Nomor ${text} tidak ditemukan dalam daftar owner.`);
         }
      }
   },
   owner: true
}