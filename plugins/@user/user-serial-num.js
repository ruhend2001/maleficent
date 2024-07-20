export default {
   names: ['User Menu'],
   tags: ['ceksn'],
   command: ['sn', 'ceksn'],
   start: async (m, {
     User
   }) => {
      let Serial = User.getProfileData(m.sender).seri;
      if (Serial !== "") {
         await Promise.all([await m.adReply(`itu adalah serial number kamu silahkan salin`, setting.thumbnail, m.chat), await m.reply(Serial)])
      } else {
         m.reply('nomor sn kamu tidak ditemukan silahkan .daftar');
      }
   }
};