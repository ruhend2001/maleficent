export default {
   names: ['Owner'],
   tags: ['addlimit'],
   command: ['addlimit', 'tambahlimit'],
   start: async (m, {
      text,
      prefix,
      User,
      command
   }) => {
      if (!text) return m.reply(`Masukkan nilai limitnya. Contoh: ${prefix+command} nomor limit\nContoh: ${prefix+command} 62xxxxx 25`);
      let [number, limit] = text.split(" ");
      let num = number + "@s.whatsapp.net";
      User.addLimitUser(num, limit);
      m.reply(`Berhasil Menambahkan ${limit} Limit Ke ${num}`);
   },
   owner: true
};