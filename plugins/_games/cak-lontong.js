let caklontong = {}
let caklontong_desk = {}
let rewards = {
   limit: 15,
   uang: 25
}
let lon = Math.floor(Math.random() * 3);
let te = ['❎ Salah', '😵 Kurang Tepat', '😪 Belum Benar'][lon];

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (caklontong.hasOwnProperty(m.sender.split('@')[0]) && budy && !budy.includes('.cak') && !budy.includes('.caklontong') && !m.isBaileys) {
         let jawaban = caklontong[m.sender.split('@')[0]]
         let deskripsi = caklontong_desk[m.sender.split('@')[0]]
         if (budy.toLowerCase() === jawaban) {
            await m.adReply(`Jawaban Benar 🎉 \n*${deskripsi}* \nKamu mendapatkan:\n+ ${rewards.limit} limit 🎟\n+ ${rewards.uang} uang 💰`, setting.thumbnail, m.chat)
            User.dbPlus(m.sender, rewards);           
            delete caklontong[m.sender.split('@')[0]]
            delete caklontong_desk[m.sender.split('@')[0]]
         } else m.adReply(te, setting.thumbnail, m.chat);     
      }
   }
};

export default {
   names: ['Games'],
   tags: ['caklontong'],
   command: ['caklontong', 'cak'],
   start: async (m, {
      Format
   }) => {
      if (caklontong.hasOwnProperty(m.sender.split('@')[0])) return m.adReply("Masih Ada Sesi Yang Belum Diselesaikan!", "https://storage.nu.or.id/storage/post/1_1/mid/1486390526589884fe840b9.jpg", m.chat);console.log(caklontong);console.log(caklontong_desk);
      let anu = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json');
      let result = anu[Math.floor(Math.random() * anu.length)]
      m.adReply(`Jawablah Pertanyaan Berikut :\n\n\n*${result.soal}*\n\n\nWaktu : 60 detik\n🎁 Hadiah\n+${rewards.limit} Limit 🎟\n+${rewards.uang} Uang 💰`, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhjq_8cvfICed0NWLYemchaBqC9QN8RjbGg&usqp=CAU', m.chat).then(() => {
         caklontong[m.sender.split('@')[0]] = result.jawaban.toLowerCase();console.log(caklontong);
         caklontong_desk[m.sender.split('@')[0]] = result.deskripsi;console.log(caklontong_desk);                  
      }) 
      await Format.sleep(60000);     
      if (caklontong.hasOwnProperty(m.sender.split('@')[0])) {      
         m.adReply(`Waktu Habis\nJawaban: ${caklontong[m.sender.split('@')[0]]}\nDeskripsi : ${caklontong_desk[m.sender.split('@')[0]]}`, setting.thumbnail, m.chat);         
         delete caklontong[m.sender.split('@')[0]]
         delete caklontong_desk[m.sender.split('@')[0]]            
      }
   }
}