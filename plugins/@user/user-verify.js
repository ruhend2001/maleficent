exports.default = {
   names: ['User Menu'],
   tags: ['daftar'],
   command: ['daftar', 'verify', 'v', 'register', 'reg'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (db.users[m.sender].registered) return m.reply(`❗Kamu Sudah Daftar`);
      const nama = text.split(".")[0];
      const umur = text.split(".")[1];
      const sender = m.sender;
      if (!nama || !umur) return m.reply(`*Masukkan nama dan umur yang benar*\n*contoh* *${prefix+command}* *nadia.50*`);
      const sn = Format.makeid(10);
      const date = `${waktu.tanggal} ${waktu.time} ${waktu.suasana}`;
      let user = db.users[m.sender]      
      user.registered = true
      user.registeredTime = date
      user.name = nama
      user.umur = umur
      user.seri = sn           
      user.limit += 10   
      let verified = `Berhasil Daftar √\n\n`
      verified += `Nama: ${nama}\n`
      verified += `Umur: ${umur}\n`
      verified += `Serial Number: ${sn}\n\n`
      verified += `kamu mendapatkan 10 limit\n`
      verified += `setelah mendaftar\n`
      verified += `silahkan Ketik .meni`
      conn.adReply(m.chat, verified, cover, m)
   }
};