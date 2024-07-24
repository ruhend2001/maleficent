/**
 * pada plugin kasih premium atau tidak bebas suka suka engkau, mau bikin fitur plugin baru dan kasih premium: true 
 * true = premium (fitur hanya untuk user yang berstatus premium)
 * false = tidak (fitur itu bisa di gunakan untuk semua)
 */
exports.default = {
   names: ['Main Menu'],
   tags: ['infopremium', 'listpremium'],
   command: ['infopremium', 'listpremium', 'listprem'],
   start: async (m, {
      conn,
      User
   }) => {
      let { premiumUsers } = await User.getPremiumUser();
      let listPremium = await Promise.all(premiumUsers.map(premiumUser => ` \n${premiumUser}`))
      let text = `Berikut Adalah List Premium ${setting.botName}\n`
      text += `${listPremium.join('\n')}`
      conn.adReply(m.chat, text, cover, m);     
   }
};
