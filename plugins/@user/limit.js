exports.default = {
   names: ['User Menu'],
   tags: ['limit'],
   command: ['limit', 'ceklimit'],
   start: async (m, {
     conn,
     User
   }) => {
      let limitUser = User.checkLimitUser(m.sender);
      if (m.isBaileys) return;
      if (limitUser !== undefined) {
         let Limit = `Kamu Memiliki ${limitUser} Limit Tersisya`
         conn.adReply(m.chat, Limit, cover, m, {
            showAds: true
         })
      } else {
        return m.reply('Limit kamu tidak ditemukan silahkan .daftar');
      }
   }
};