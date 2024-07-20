export default {
   names: ['User Menu'],
   tags: ['unreg'],
   command: ['unreg'],
   start: async (m, {
      text,
      prefix,
      command,
      User,
      Format
   }) => {
      if (!User.checkRegisteredUser(m.sender)) return m.reply(`Kamu Belum Terdaftar Ketik .daftar`);
      if (!text) return m.reply(`Masukan nomor sn nya untuk melihat sn silahkan ketik .sn atau .ceksn\ncontoh ${prefix+command} sn `);
      let serial = User.getProfileData(m.sender).seri;
      if (text == serial) {
         User.unregistering({ id: m.sender });
         await Format.sleep(1000);
         m.adReply(`Kamu Berhasil Keluar Dari Data Base Semua Data Kamu Kereset Ulang Ketik .me`, setting.thumbnail, m.chat);
      } else {
         return m.reply(`serial number kamu salah masukan dengan benar ketik .sn`);
      }
   }
};
