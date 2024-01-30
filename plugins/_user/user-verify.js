export default {
   names: ['User Menu'],
   tags: ['daftar'],
   command: ['daftar', 'verify', 'v'],
   start: async (m, {
      text,
      prefix,
      command,
      User,
      Format
   }) => {
      if (User.checkRegisteredUser(m.sender)) return m.reply(mess.registered);
      let nama = text.split(".")[0];
      let umur = text.split(".")[1];
      let sender = m.sender;
      if (!nama || !umur) {
         return m.reply(`Akses ditolak! Masukkan nama dan umur yang benar. \ncontoh ${prefix+command} nadia omara.100`);
      }
      let sn = Format.makeid(10);
      let user = {
         id: sender,
         registered: true,
         nama: nama,
         umur: umur,
         seri: sn
      };
      await User.registering(user);
      await User.addLimitUser(m.sender, 15);
      await Format.sleep(2500)
      let Verify = `Berhasil Daftar √\n\n`
      Verify += ` Nama: ${nama}\n`
      Verify += ` Umur: ${umur}\n`
      Verify += ` Serial Number: ${user.seri}\n\n`
      Verify += ` kamu mendapatkan 15 limit\n`
      Verify += ` setelah mendaftar\n`
      Verify += ` silahkan Ketik .menu`
      m.adReply(Verify, setting.thumbnail, m.chat)
   }
};