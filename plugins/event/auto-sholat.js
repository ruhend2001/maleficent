let running = false
module.exports = {
   start: async (m, { 
      conn, 
      budy, 
      Format
   }) => {      
      const time = waktu.time;
      const prayerTimes = {
         '04:37': 'subuh',
         '12:04': 'zuhur',
         '15:13': 'ashar',
         '18:12': 'maghrib',
         '19:23': 'isya'
      };
      if (prayerTimes[time] && !running && !m.isBaileys) {
         const caption = `Hai Ka @${m.sender.split("@")[0]} waktu ${prayerTimes[time]} telah tiba silahkan ambil air wudhu dan segera laksanakan sholat`;
         conn.reply(m.chat, caption, m, { mentions: [m.sender] }), running = true 
         await Format.sleep(60000).then(() => running = false, console.log(running));
      }
   }   
}