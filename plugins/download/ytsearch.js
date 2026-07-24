const search = require("yt-search");
exports.default = {
   names: ['Downloader'],
   tags: ['ytsearch'],
   command: ['ytsearch', 'yts'], 
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Info Yang Ingin Di Cari\ncontoh ${prefix+command} laila canggung`);
      let caption = '', thumb = "https://qu.ax/OcWmv.jpeg", data = await (await search(text)).all;
      data.forEach(v => caption += `\n\n⭔ ID : ${v.videoId}\n⭔ Title : ${v.title}\n⭔ Views : ${v.views}\n⭔ Duration : ${v.timestamp}\n⭔ Upload At : ${v.ago}\n⭔ Url : ${v.url}\n─────────────────`);
      conn.adReply(m.chat, loading, cover, m).then(() => {
         conn.adReply(m.chat, `*${zw} 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐒𝐄𝐀𝐑𝐂𝐇*` + caption, thumb, m, {
            showAds: true
         })
      })
   },
   limit: true
};