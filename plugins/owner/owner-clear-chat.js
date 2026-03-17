exports.default = {
   names: ['Owner'],
   tags: ['clearchat', 'hapuschat'],
   command: ['clearchat', 'hapuschat'],
   start: async (m, {
      conn
   }) => {
      m.reply(`membersihkan semua percakapan group\nMohon tunggu...`);
      const data = Object.keys(db.chats);
      const deletePromises = [];
      for await (let group of data) {
         if (group == 'community') continue
         await sleep(2000);
         deletePromises.push(conn.deleteMessage(m, group));
      };
      await Promise.all(deletePromises);
      m.reply("Semua pesan di group telah dihapus.");
   },
   owner: true,
   private: true
}