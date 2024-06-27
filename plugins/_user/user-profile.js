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
      if (userData) {
         let Regtime = `${userData.registerTime === "" ? "" : '\n ‎ ‎ ‎ ‎ ‎ ‎ ' + userData.registerTime}`;
         let Profile = `👤 *User Profile* @${m.sender.split('@')[0]}\n\n`
         Profile += `🏷 Terdaftar: ${reg}\n`
         Profile += `🗓 Waktu Daftar:${Regtime}\n`
         Profile += `📌 Premium: ${prem}\n`
         Profile += `📍 Nama: ${userData.nama}\n`
         Profile += `💋 Umur: ${userData.umur}\n`
         Profile += `📎 Seri: ${userData.seri}\n`
         Profile += `🔖 Limit: ${limitUser}\n`
         Profile += `💰 Uang: ${userData.uang}\n`
         Profile += `🛍 Kupon: ${userData.kupon}\n`
         m.adsReply(Profile, picture, m.chat)
      } else {
         return m.reply('Profil tidak ditemukan');
      }
   }
};
