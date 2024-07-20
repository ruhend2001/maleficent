export default {
   names: ['User Menu'],
   tags: ['limit'],
   command: ['limit', 'ceklimit'],
   start: async (m, {
     User
   }) => {
      let limitUser = User.checkLimitUser(m.sender);
      if (m.isBaileys) return;
      if (limitUser !== undefined) {
         let Limit = `Kamu Memiliki ${limitUser} Limit Tersisya`
         m.adsReply(Limit, setting.thumbnail, m.chat)
      } else {
         m.reply('Limit kamu tidak ditemukan silahkan .daftar');
      }
   }
};