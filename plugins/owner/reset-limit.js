exports.default = {
   names: ['Owner'],
   tags: ['resetlimit'],
   command: ['resetlimit'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      User
   }) => {
      if (!text) return m.reply(`Masukan Nilai Limit Yang Ingin Di Reset Ke Semua Pengguna\ncontoh ${prefix+command} 25`);
      await User.resetLimits(text);
      let caption = `Berhasil Mereset Limit\n${text} Per User`;
      conn.adReply(m.chat, caption, cover, m);
   },
   owner: true
};