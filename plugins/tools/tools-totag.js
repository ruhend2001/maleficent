exports.default = {
   names: ['Tools'],
   tags: ['totag'],
   command: ['totag'],
   start: async (m, {
      conn,
      mime,
      quoted,
      participants
   }) => {
      const members = participants.map(i => i.id);
      if (/audio|video|image|document|sticker/.test(mime)) {
         const media = await quoted.download();
         conn.sendFile(m.chat, media, quoted.text ? quoted.text : '', m, {
            ptt: quoted.ptt ? true : false,
            mentions: members
         });
      } else {
         m.reply(quoted.text, {
            mentions: members
         })
      }
   },
   admin: true,
   group: true
}