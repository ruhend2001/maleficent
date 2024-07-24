exports.default = {
   names: ['Owner'],
   tags: ['addowner', 'delowner'],
   command: ['addowner', 'addown', 'delowner', 'delown'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (/addowner|addown/.test(command)) {
         if (!text) return m.reply(`Masukkan Nomornya contoh\n${prefix+command} 62xxxx`);
         await User.addOwner(text);         
         m.reply(`Sukses Menambahkan ${text} sebagai owner`);
      } else if (/delowner|delown/.test(command)) {
         if (!text) return m.reply(`Masukkan Nomor yang ingin dihapus dari daftar owner.`);
         await User.removeOwner(m, text);        
      }
   },
   owner: true
};