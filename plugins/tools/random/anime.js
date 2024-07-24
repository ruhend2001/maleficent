//tambahin ajh bang kalo kurang :)
const fetch = require('node-fetch');
exports.default = {
   names: ['Anime'],
   tags: ['hentai', 'megumin', 'yuki', 'waifu', 'neko', 'naruto'],
   command: ['hentai', 'megumin', 'yuki', 'waifu', 'neko', 'naruto'],
   start: async (m, {
      conn,
      command
   }) => {
      if (command == 'hentai') {
         const res = await fetch('https://drive.google.com/uc?id=1-FGwrwHP9fLf-PPBAxVtOhIEYvfuzgcL&export=download')
         const data = await res.json()
         conn.adReply(m.chat, loading, cover, m)
         const hentai = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, hentai, {
            caption: `𝐇𝐄𝐍𝐓𝐀𝐈`,
            quoted: m
         })
      } else if (command == 'megumin') {
         const res = await fetch('https://drive.google.com/uc?id=1-QoFF28Xyb37OW_JF5GiQU9TAJWlso0J&export=download')
         const data = await res.json()
         conn.adReply(m.chat, loading, cover, m)
         const megumin = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, megumin, {
            caption: `𝐌𝐄𝐆𝐔𝐌𝐈𝐍`,
            quoted: m
         })
      } else if (command == 'yuki') {
         const res = await fetch('https://drive.google.com/uc?id=1-V3d-yrPHT_3qNTewqL5dxunLQjT4Wqs&export=download')
         const data = await res.json()
         conn.adReply(m.chat, loading, cover, m)
         const yuki = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, yuki, {
            caption: `𝐘𝐔𝐊𝐈`,
            quoted: m
         })
      } else if (command == 'waifu') {
         const res = await fetch('https://drive.google.com/uc?id=1-SiJuum6JwYBeWUHZju6jn6qdXpvRacy&export=download')
         const data = await res.json()
         conn.adReply(m.chat, loading, cover, m)
         const waifu = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, waifu, {
            caption: `𝐖𝐀𝐈𝐅𝐈`,
            quoted: m
         })
      } else if (command == 'neko') {
         const res = await fetch('https://drive.google.com/uc?id=1-SdFeEMuyJxmVJsmTIDbEz6TrLLe86Oz&export=download')
         const data = await res.json()
         conn.adReply(m.chat, loading, cover, m)
         const neko = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, neko, {
            caption: `𝐍𝐄𝐊𝐎`,
            quoted: m
         })
      } else if (command == 'naruto') {
         const res = await fetch('https://drive.google.com/uc?id=1-XX8xG9_4rWIo3j7zTB3KWlDz4gknTlS&export=download')
         const data = await res.json()
         conn.adReply(m.chat, loading, cover, m)
         const naruto = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, naruto, {
            caption: `𝐍𝐀𝐑𝐔𝐓𝐎`,
            quoted: m
         })
      }
   },
   limit: 2,
   register: true,
   premium: false,
   group: false,
   private: false
};