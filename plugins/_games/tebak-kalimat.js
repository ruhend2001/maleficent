let tebakkalimat = {}
let rewards = {
   limit: 20,
   uang: 50
}
let kal = Math.floor(Math.random() * 3);
let imat = ['Salah', 'Kurang Tepat ', 'Belum Benar '][kal];

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.tebakkalimat') && !m.isBaileys) {
         let jawaban = tebakkalimat[m.sender.split('@')[0]].trim();
         if (budy.toLowerCase() === jawaban) {
            await User.dbPlus(m.sender, rewards);
            m.adReply(`Jawaban Benar 🎉\nHadiah :\n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, setting.thumbnail, m.chat);
            delete tebakkalimat[m.sender.split('@')[0]]
         } else {
            m.adReply(imat, setting.thumbnail, m.chat)
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['tebakkalimat'],
   command: ['tebakkalimat'],
   start: async (m, {
      Format
   }) => {
      if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!");
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json');
      let result = anu[Math.floor(Math.random() * anu.length)]
      m.adReply(`Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 120 detik\nHadiah 🛍 \n+${rewards.limit} limit 🎟\n+${rewards.uang} uang 💰`, 'https://pomf2.lain.la/f/t76kidh.png', m.chat).then(() => {
         tebakkalimat[m.sender.split('@')[0]] = result.jawaban.toLowerCase().trim();console.log(tebakkalimat);
      })
      await Format.sleep(120000);
      if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) {
         m.adReply(`Waktu Habis\nJawaban:  ${tebakkalimat[m.sender.split('@')[0]]}\n`, setting.thumbnail, m.chat);
         delete tebakkalimat[m.sender.split('@')[0]]
      }
   }
};