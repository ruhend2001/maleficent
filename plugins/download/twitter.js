exports.default = {
   names: ['Downloader'],
   tags: ['twitter', 'twt'],
   command: ['twitter', 'twt'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} https://twitter.com/gofoodindonesia/status/1229369819511709697`);
      conn.adReply(m.chat, loading, cover, m);
      const data = await Format.Scraper.twitter(text);
      conn.sendFile(m.chat, data.url.hd || data.url.sd, data.title || '', m)
   },
   limit: 2
};