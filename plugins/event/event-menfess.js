module.exports = {
   start: async (m, {
      conn,
      budy,
      prefix,
      command
   }) => {
      const menfess = global.db.menfess
      const mf = Object.values(menfess).find(v => v.status === true && v.penerima == m.sender)
      const mf_from = Object.values(menfess).find(v => v.status === true && v.dari == m.sender)
      if (mf && !m.isBaileys) {
         if (budy === '' || m.text === '') return false
         const text = `Hai kak @${mf.dari.split('@')[0]}, kamu menerima balasan nih.\ndari: @${mf.penerima.split('@')[0]}\nPesan balasannya:\n${m.text}\n\n> kamu bisa langsung balas`.trim();
         await conn.sendMessage(mf.dari, {
            text: text,
            mentions: [mf.dari, mf.penerima]
         }, {
            quoted: fake_wa,
            ...conn_bind
         }).then(async () => {
            if (m.isBaileys || m.isGroup) {
               return false
            } else {
               const pesan = {
                  waktu: `${waktu.tanggal} ${waktu.time}`,
                  nama: m.pushName,
                  number: `${mf.penerima.split('@')[0]}`,
                  pesan: m.text
               }            
               mf.pesan.push(pesan)         
               return await conn.reply(m.chat, 'Berhasil mengirim balasan.', m)
            }
         })
      } else if (mf_from && !m.isBaileys) {
         if (command == 'menfessclose' || command == 'tutupmenfess' || command == 'akhirimenfess') return false
         if (budy === '' || m.text === '') return false
         const text = `Hai kak @${mf_from.penerima.split('@')[0]}, kamu menerima balasan nih.\n\nPesan balasannya:\n${m.text}\n\n> kamu bisa langsung balas`.trim();
         await conn.sendMessage(mf_from.penerima, {
            text: text,
            mentions: [mf_from.penerima]
         }, {
            quoted: fake_wa,
            ...conn_bind
         }).then(async () => {
            if (m.isBaileys || m.isGroup) {
               return false
            } else {
               const pesan = {
                  waktu: `${waktu.tanggal} ${waktu.time}`,
                  nama: m.pushName,
                  number: `${mf_from.dari.split('@')[0]}`,
                  pesan: m.text                  
               }               
               mf_from.pesan.push(pesan)              
               return await conn.reply(m.chat, 'Berhasil mengirim balasan.\n\n> jika serasa menfess sudah atau cukup kamu dapat mengakhiri memfess dengan mengetik .menfessclose atau .tutupmenfess', m)
            }
         })
      }
   }
}