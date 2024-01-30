export default {
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
      let usernya = `${text}@s.whatsapp.net`
      User.addPremiumUser(usernya, true);
      User.dbPlus(usernya, {
         limit: 1000//tergantung kamu mau kasih limit berapa untik user premium sesuaikan saja
      })
      m.reply(`Nomor ${usernya} menjadi premium dan mendapatkan limit 1000`);
   },
   owner: true
};