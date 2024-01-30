export default {
   names: ['Group Menu'],
   tags: ['linkgc', 'link', 'linkgroup'],
   command: ['linkgc', 'link', 'linkgroup'],
   start: async (m, {
      conn,
      groupName
   }) => {
      let url = await conn.groupInviteCode(m.chat)
      if (!url) return
      if (url) {
         url = 'https://chat.whatsapp.com/' + url;
         m.reply(`Link Group ${groupName}\n${url}`);
      }
   },
   group: true
};