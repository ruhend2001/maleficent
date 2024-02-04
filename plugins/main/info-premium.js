export default {
   names: ['Main Menu'],
   tags: ['infopremium', 'listpremium'],
   command: ['infopremium', 'listpremium', 'listprem'],
   start: async (m, {
      User
   }) => {
      let { premiumUsers } = await User.getPremiumUser();
      let listPremium = await Promise.all(premiumUsers.map(premiumUser => ` \n${premiumUser}`))
      let text = `Berikut Adalah List Premium ${setting.botName}\n`
      text += `${listPremium.join('\n')}`
      m.adReply(text, setting.thumbnail, m.chat);
   }
};