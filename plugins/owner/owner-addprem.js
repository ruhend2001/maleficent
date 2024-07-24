exports.default = {
   names: ['Owner'],
   tags: ['addprem'],
   command: ['addpremium', 'addprem'],
   start: async (m, {
      text,
      prefix,
      User,
      command    
   }) => {
      if (!text) return m.reply(`Masukkan Nomornya. Contoh: ${prefix+command} nomor\nContoh: ${prefix+command} 62xxxxx`);
      let _user = `${text.replace("@", "")}`
      let user = `${_user}@s.whatsapp.net`
      User.addPremiumUser(user, true);
      User.dbPlus(user, {
         limit: 1000//tergantung kamu mau kasih limit berapa untik user premium sesuaikan saja atau .addlimit @tag 1000
      })
      m.reply(`Nomor ${user} menjadi premium dan mendapatkan limit 1000`);
   },
   owner: true
};