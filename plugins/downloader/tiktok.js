import fetch from 'node-fetch';
export default {
   names: ['Downloader'],
   tags: ['tiktok', 'titit'],
   command: ['tt', 'tiktok', 'ttdl', 'titit', 'ttnowm'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      let res = await (await fetch(`https://vihangayt.me/download/tiktok?url=${text}`)).json();
      let data = res.data;
      let author = data.author;
      let name = data.author_name;
      let video = data.play_url;
      let desc = data.desc;
      let cover = data.cover;
      let caption = `*Judul :* ${desc}\n`
      caption += `*name :* ${name}\n`
      caption += `*author :* ${author}\n`
      m.adReply(caption, cover, m.chat).then(() => {
         conn.sendFile(m.chat, video, {
            caption: `𝐓𝐈𝐊𝐓𝐎𝐊\n${caption}`,
            quoted: m
         })
      })
   },
   limit: 3,
   premium: false
};
