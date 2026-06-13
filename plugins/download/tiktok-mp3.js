const { ttdl } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['ttmp3'],
   command: ['ttmp3', 'tiktokmp3'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan link tiktok nya! \nContoh: ${prefix + command} https://vt.tiktok.com/ZSNYfYdLj`);
      conn.adReply(m.chat, loading, cover, m);
      const { music } = await ttdl(text);
      conn.sendFile(m.chat, music, '', m);
   },
   limit: true
};
