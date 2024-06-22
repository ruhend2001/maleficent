export default {
   names: ['Main Menu'],
   tags: ['listbanned', 'listban'],
   command: ['listbanned', 'listban'],
   start: async (m, {
      User
   }) => {
      let { bannedUsers } = await User.getBannedUser({ reasonMap: 'Alasan di banned' });
      let listBanned = await Promise.all(bannedUsers.map(bannedUser => `\n ${bannedUser}`))
      let text = `Berikut Adalah List Pengguna Terbanned ${setting.botName}\n`
      text += `${listBanned.join('\n')}`
      m.adReply(text, setting.thumbnail, m.chat);
   }
};
