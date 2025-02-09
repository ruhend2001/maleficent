const { fbdl } = require('ruhend-scraper');
exports.default = {
   names: ['Downloader'],
   tags: ['facebook'],
   command: ['fb', 'facebook', 'fbdl'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan link facebook nya! \nContoh: ${prefix+command} https://www.facebook.com/reel/3677168492551989?mibextid=rS40aB7S9Ucbxw6v`);
      const { data: result } = await fbdl(text);
      const video = result.find(vid => vid.resolution === "720p (HD)") || result.find(vid => vid.resolution === "360p (SD)");
      conn.adReply(m.chat, loading, cover, m).then(() => {
         conn.sendFile(m.chat, video.url, {
            caption: `𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊`,
            quoted: m
         })
      })
   },
   limit: true,
   premium: false
}