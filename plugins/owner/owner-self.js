export default {
   names: ['Owner'],
   tags: ['self'],
   command: ['self', 'respon'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      User
   }) => {
      if (!text) return m.reply(`Masukkan Parameternya contoh ${prefix+command} on/off`);
      let change;
      if (text.toLowerCase() === "on") {
         change = {
            self: true
         };
         m.reply(`Mode self berhasil diaktifkan. Hanya aku, owner, dan premium yang dapat mengakses bot ini`);
      } else if (text.toLowerCase() === "off") {
         change = {
            self: false
         };
         m.reply(`Mode self berhasil dimatikan. Sekarang semua orang dapat mengakses bot ini`);
      } else {
         return m.reply(`Masukkan Parameter yang valid: on/off`);
      }
      User.changeSelf(change);
   },
   owner: true
};