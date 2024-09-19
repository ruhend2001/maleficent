exports.default = {
   names: ['Info'],
   tags: ['fitur', 'totalfitur'],
   command: ['fitur', 'totalfitur'],
   start: async (m, {
      conn,
      Format
   }) => {
      const fitur = await Format.totalFitur();
      const caption = `Total fitur ${setting.botName} saat ini adalah ${fitur} fitur`;
      conn.adReply(m.chat, caption, cover, m);
   }
}