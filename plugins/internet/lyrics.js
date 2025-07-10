exports.default = {
   names: ['Internet'],
   tags: ['lirik', 'lyric'],
   command: ['lirik', 'lyric'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar kamu sayang`);
      m.react('🕒');
      const { title, album, thumb, lyrics } = await Format.Scraper.lyrics(text);
      m.reply(loading)
      const caption = `*Judul:* ${title}\n\n*Lirik:*\n${lyrics}\n`;
      conn.adReply(m.chat, caption, thumb || cover, m);
   },
   limit: true
}