let tebakkata = {}
let rewards = {
   limit: 20,
   uang: 40
}
let kat = Math.floor(Math.random() * 3);
let ta = ['Salah', 'Kurang Tepat', 'Belum Benar'][kat];

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (tebakkata.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebakkata') && !budy.includes('.teka') && !m.isBaileys) {
         let jawaban = tebakkata[m.sender.split('@')[0]]
         if (budy.toLowerCase() == jawaban) {
            User.dbPlus(m.sender, rewards);
            await m.adReply(`🎮 Tebak Kata 🎮\n\nJawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m.chat);
            delete tebakkata[m.sender.split('@')[0]]
         } else {
            m.adReply(ta, setting.thumbnail, m.chat);
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['tebakkata'],
   command: ['tebakkata', 'teka'],
   start: async (m, {
      Format
   }) => {
      if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Soal Yang Belum Diselesaikan!");
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json');
      let result = anu[Math.floor(Math.random() * anu.length)]
      m.adReply(`Silahkan Jawab Pertanyaan Berikut\n\n*${result.soal}*\n\nWaktu : 60 detik\nHadiah 🎁\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰 `, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGef6IGK44lqaIIcestqDIbS9jG9Bs7McYmQ&usqp=CAU', m.chat).then(() => {
         tebakkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase();console.log(tebakkata);
      })
      await Format.sleep(60000);
      if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) {
         m.adReply(`Waktu Habis\nJawaban:  ${tebakkata[m.sender.split('@')[0]]}\n`, setting.thumbnail, m.chat);
         delete tebakkata[m.sender.split('@')[0]]
      }
   }
};