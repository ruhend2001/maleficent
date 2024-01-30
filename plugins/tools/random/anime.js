import fetch from 'node-fetch'
export default {
   names: ['Anime'],
   tags: ['hentai', 'megumin', 'yuki', 'waifu', 'neko', 'naruto'],
   command: ['hentai', 'megumin', 'yuki', 'waifu', 'neko', 'naruto'],
   start: async (m, {
      conn,
      command
   }) => {
      if (command == 'hentai') {
         let res = await fetch('https://drive.google.com/uc?id=1-FGwrwHP9fLf-PPBAxVtOhIEYvfuzgcL&export=download')
         let data = await res.json()
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         let hentai = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, hentai, {
            caption: `𝐇𝐄𝐍𝐓𝐀𝐈`,
            quoted: m
         })
      } else if (command == 'megumin') {
         let res = await fetch('https://drive.google.com/uc?id=1-QoFF28Xyb37OW_JF5GiQU9TAJWlso0J&export=download')
         let data = await res.json()
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         let megumin = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, megumin, {
            caption: `𝐌𝐄𝐆𝐔𝐌𝐈𝐍`,
            quoted: m
         })
      } else if (command == 'yuki') {
         let res = await fetch('https://drive.google.com/uc?id=1-V3d-yrPHT_3qNTewqL5dxunLQjT4Wqs&export=download')
         let data = await res.json()
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         let yuki = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, yuki, {
            caption: `𝐘𝐔𝐊𝐈`,
            quoted: m
         })
      } else if (command == 'waifu') {
         let res = await fetch('https://drive.google.com/uc?id=1-SiJuum6JwYBeWUHZju6jn6qdXpvRacy&export=download')
         let data = await res.json()
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         let waifu = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, waifu, {
            caption: `𝐖𝐀𝐈𝐅𝐈`,
            quoted: m
         })
      } else if (command == 'neko') {
         let res = await fetch('https://drive.google.com/uc?id=1-SdFeEMuyJxmVJsmTIDbEz6TrLLe86Oz&export=download')
         let data = await res.json()
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         let neko = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, neko, {
            caption: `𝐍𝐄𝐊𝐎`,
            quoted: m
         })
      } else if (command == 'naruto') {
         let res = await fetch('https://drive.google.com/uc?id=1-XX8xG9_4rWIo3j7zTB3KWlDz4gknTlS&export=download')
         let data = await res.json()
         m.adReply(mess.wait, setting.thumbnail, m.chat)
         let naruto = data[Math.floor(Math.random() * data.length)]
         conn.sendFile(m.chat, naruto, {
            caption: `𝐍𝐀𝐑𝐔𝐓𝐎`,
            quoted: m
         })
      }
   },
   limit: 5,
   register: true,
   premium: false,
   group: false,
   private: false
};