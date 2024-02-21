let tekateki = {}
let rewards = {
   limit: 15,
   uang: 30
}

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (tekateki.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tekateki') && !m.isBaileys) {
         let jawaban = tekateki[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            User.dbPlus(m.sender, rewards);
            await m.adReply(`Teka Teki 🎮\n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m.chat);
            delete tekateki[m.sender.split('@')[0]]
         } else {
            m.reply('salah');
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['tekateki'],
   command: ['tekateki'],
   start: async (m, {
      Format
   }) => {
      if (tekateki.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Soal Yang Belum Diselesaikan!");
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json');
      let result = anu[Math.floor(Math.random() * anu.length)]
      m.adReply(`Silahkan Jawab Pertanyaan Berikut\n\n*${result.soal}*\n\nWaktu : 60 detik\nHadiah 🎁\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰 `, 'https://www.my.wislah.com/wp-content/uploads/2023/08/Senarai-Teka-Teki.png', m.chat).then(() => {
         tekateki[m.sender.split('@')[0]] = result.jawaban.toLowerCase();console.log(tekateki);
      })
      await Format.sleep(60000);
      if (tekateki.hasOwnProperty(m.sender.split('@')[0])) {
         m.adReply(`Waktu Habis\nJawaban:  ${tekateki[m.sender.split('@')[0]]}\n`, setting.thumbnail, m.chat);
         delete tekateki[m.sender.split('@')[0]];console.log(tekateki);
      }
   }
};