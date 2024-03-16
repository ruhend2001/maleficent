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
      if (!text) return m.reply(`Masukan Tiktok contoh\n${prefix+command}` + ' https://vt.tiktok.com/ZSFynAYGJ/')
      let { TiktokDownloader } = await import("@tobyg74/tiktok-api-dl");
      return await TiktokDownloader(text, {
         version: "v3"
      }).then((data) => {        
         let author = data.result.author.nickname;
         let picture = data.result.author.avatar;
         let desc = data.result.desc;
         let video = data.result.video1;
         m.adReply(loading, picture, m.chat);
         let Tiktok = ` 𝐓𝐈𝐊𝐓𝐎𝐊\n`
         Tiktok += ` ⭔ Name : ${author}\n`
         Tiktok += ` ⭔ Judul : ${desc}`      
         conn.sendFile(m.chat, video, {
            caption : Tiktok,
            quoted : m
         })
      })
   },
   limit: 5,
   premium: false
};
