exports.default = {
   names: ['User Menu'],
   tags: ['unreg'],
   command: ['unreg'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      User
   }) => {
      if (!User.checkRegisteredUser(m.sender)) return m.reply(`Kamu Belum Terdaftar Ketik .daftar`);
      if (!text) return m.reply(`Masukan nomor sn nya untuk melihat sn silahkan ketik .sn atau .ceksn\ncontoh ${prefix+command} sn `);
      let serial = User.getProfileData(m.sender).seri;
      if (text == serial) {
         await User.unregistering({ id: m.sender });
         conn.adReply(m.chat, `Kamu Berhasil Keluar Dari Data Base Semua Data Kamu Kereset Ulang Ketik .me`, cover, m);
      } else {
         return m.reply(`serial number kamu salah masukan dengan benar ketik .sn`);
      }
   }
};
