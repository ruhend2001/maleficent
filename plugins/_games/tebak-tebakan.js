let tebaktebakan = {}
let rewards = {
   limit: 10,
   uang: 35
}

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebaktebakan') && !budy.includes('.tebakan') && !m.isBaileys) {
         let jawaban = tebaktebakan[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            User.dbPlus(m.sender, rewards);
            await m.adReply(`Tebak Tebakan 🎮\n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m.chat);
            delete tebaktebakan[m.sender.split('@')[0]]
         } else {
            m.adReply('salah', setting.thumbnail, m.chat);
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['tebaktebakan'],
   command: ['tebaktebakan', 'tebakan'],
   start: async (m, {
      Format
   }) => {
      if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Soal Yang Belum Diselesaikan!");
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json');
      let result = anu[Math.floor(Math.random() * anu.length)]
      m.adReply(`Silahkan Jawab Pertanyaan Berikut\n\n*${result.soal}*\n\nWaktu : 60 detik\nHadiah 🎁\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰 `, 'https://play-lh.googleusercontent.com/nfT7BqjO4xJiKTdZC7m3Lh7peoTyedG_7ZApHpMa64yoxhQsQ2kzltxwEC2lLaxhUg', m.chat).then(() => {
         tebaktebakan[m.sender.split('@')[0]] = result.jawaban.toLowerCase();console.log(tebaktebakan);
      })
      await Format.sleep(60000);
      if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) {
         m.adReply(`Waktu Habis\nJawaban:  ${tebaktebakan[m.sender.split('@')[0]]}\n`, setting.thumbnail, m.chat);
         delete tebaktebakan[m.sender.split('@')[0]];console.log(tebaktebakan);
      }
   }
};