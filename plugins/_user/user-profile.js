export default {
   names: ['User Menu'],
   tags: ['profile', 'balance'],
   command: ['profile', 'my', 'me', 'balance', 'profil'],
   start: async (m, {
      conn,
      User
   }) => {
      let isPremium = User.checkPremiumUser(m.sender);
      let picture = await User.profilePicture(conn, m);
      let prem = isPremium ? 'Aktif' : 'Tidak';
      let isRegister = User.checkRegisteredUser(m.sender);
      let reg = isRegister ? 'Sudah Daftar' : 'Belum Daftar';
      let limitUser = User.checkLimitUser(m.sender);
      let userData = User.getProfileData(m.sender);
      if (!m.fromMe && userData) {
         let Profile = `👤 *Profile*\n\n`
         Profile += `🏷 Terdaftar: ${reg}\n`
         Profile += `📌 Premium: ${prem}\n`
         Profile += `📍 Nama: ${userData.nama}\n`
         Profile += `💋 Umur: ${userData.umur}\n`
         Profile += `📎 Seri: ${userData.seri}\n`
         Profile += `🔖 Limit: ${limitUser}\n`
         Profile += `💰 Uang: ${userData.uang}\n`
         Profile += `🛍 Kupon: ${userData.kupon}\n`
         m.adsReply(Profile, picture, m.chat)
      } else {
         if (!m.fromMe) {
            m.reply('Profil tidak ditemukan');
         }
      }
   }
};