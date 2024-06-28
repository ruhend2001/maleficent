export default {
   names: ['User Menu'],
   tags: ['profile', 'balance'],
   command: ['profile', 'my', 'me', 'balance', 'profil'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      User
   }) => {
      let isPremium = User.checkPremiumUser(m.sender);
      let picture = await User.profilePicture(conn, m);
      let prem = isPremium ? 'Aktif' : 'Tidak';
      let isRegister = User.checkRegisteredUser(m.sender);
      let reg = isRegister ? 'Sudah Daftar' : 'Belum Daftar';
      let limitUser = User.checkLimitUser(m.sender);
      let userData = User.getProfileData(m.sender);
      let tag = text.match(/@/g);
      let numTag = text.replace('@', '').replace(prefix, '').replace(command, '').trim();
      let mention = `${numTag}@s.whatsapp.net`
      let pictureTag = await conn.profilePictureUrl(mention, 'image').catch(_ => setting.thumbnail);
      let userTag = await User.getProfileData(mention);
      let isRegisterTag = User.checkRegisteredUser(mention);
      let limitUserTag = User.checkLimitUser(mention);
      let regTag = isRegisterTag ? 'Sudah Daftar' : 'Belum Daftar';
      let isPremiumTag = User.checkPremiumUser(mention);
      let premTag = isPremiumTag ? 'Aktif' : 'Tidak';
      if (tag) {
         try {
            let _regtime = `${userTag.registerTime === "" ? "" : '\n ‎ ‎ ‎ ‎ ‎ ‎ ' + userTag.registerTime}`;
            let Other = `👤 *User Profile* @${numTag}\n`
            Other += `🏷 Terdaftar: ${regTag}\n`
            Other += `🗓 Waktu Daftar:${_regtime}\n`
            Other += `📌 Premium: ${premTag}\n`
            Other += `📍 Nama: ${userTag.nama}\n`
            Other += `💋 Umur: ${userTag.umur}\n`
            Other += `📎 Seri: ${userTag.seri}\n`
            Other += `🔖 Limit: ${limitUserTag}\n`
            Other += `💰 Uang: ${userTag.uang}\n`
            Other += `🛍 Kupon: ${userTag.kupon}\n`
            m.adsReply(Other, pictureTag, m.chat, {
               mentions: mention
            });
         } catch {
            return m.reply('Profile Not Active');
         }
      } else if (!tag) {
         let Regtime = `${userData.registerTime === "" ? "" : '\n ‎ ‎ ‎ ‎ ‎ ‎ ' + userData.registerTime}`;
         let Profile = `👤 *User Profile* @${m.sender.split('@')[0]}\n`
         Profile += `🏷 Terdaftar: ${reg}\n`
         Profile += `🗓 Waktu Daftar:${Regtime}\n`
         Profile += `📌 Premium: ${prem}\n`
         Profile += `📍 Nama: ${userData.nama}\n`
         Profile += `💋 Umur: ${userData.umur}\n`
         Profile += `📎 Seri: ${userData.seri}\n`
         Profile += `🔖 Limit: ${limitUser}\n`
         Profile += `💰 Uang: ${userData.uang}\n`
         Profile += `🛍 Kupon: ${userData.kupon}\n`
         m.adsReply(Profile, picture, m.chat);
      }
   }
};
