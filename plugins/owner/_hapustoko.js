exports.default = {
   names: ['Owner'],
   tags: ['hapustoko', 'deltoko'],
   command: ['hapustoko', 'deltoko'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (!text) return m.reply(`Masukkan nama toko yang ingin dihapus.\nContoh: ${prefix + command} nama toko\n\nDaftar toko yang ada:\n1. toko1\n2. toko2\ndan seterusnya`)
      let toko = text.trim();
      await User.removeToko(toko);
      m.reply(`Berhasil menghapus dagangan yang ada di ${toko}`);
   },
   owner: true
};
