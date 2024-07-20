let tebakbendera = {}
let rewards = {
   limit: 25,
   uang: 50
}

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (tebakbendera.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebakbendera') && !m.isBaileys) {
         let jawaban = tebakbendera[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            User.dbPlus(m.sender, rewards);
            await m.adReply(`🎮 Tebak Bendera \n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m.chat);
            delete tebakbendera[m.sender.split('@')[0]]
         } else {
            m.adReply('Salah', setting.thumbnail, m.chat);
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['tebakbendera'],
   command: ['tebakbendera'],
   start: async (m, {
      conn,
      Format
   }) => {
      if (tebakbendera.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Soal Yang Belum Diselesaikan!");
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json');
      let result = anu[Math.floor(Math.random() * anu.length)]
      conn.sendFile(m.chat, result.img , {
         caption : `*Silahkan Jawab Pertanyaan Berikut*\nWaktu : 1 menit\n\nHadiah 🎁\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰 `,
         quoted : m
      }).then(() => {
         tebakbendera[m.sender.split('@')[0]] = result.name.toLowerCase();console.log(tebakbendera);
      })
      await Format.sleep(60000);
      if (tebakbendera.hasOwnProperty(m.sender.split('@')[0])) {
         m.adReply(`Waktu Habis\nJawaban:  ${tebakbendera[m.sender.split('@')[0]]}\n`, result.img, m.chat);
         delete tebakbendera[m.sender.split('@')[0]]
      }
   }
};