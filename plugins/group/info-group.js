export default {
   names: ['Group Menu'],
   tags: ['infogc', 'infogroup'],
   command: ['infogc', 'infogroup'],
   start: async (m, {
      conn,
      groupName,
      participants,
      groupAdmins
   }) => {
      let Info = ` ${javi} *INFO GROUP*\n`
      Info += ` • *ID:* ${m.chat}\n`
      Info += ` • *Nama Grup:* ${groupName}\n`
      Info += ` • *Total Member:* ${participants.length}\n`
      Info += ` • *Total Admin:* ${groupAdmins.length}`
      m.reply(Info);
   },
   group: true
};