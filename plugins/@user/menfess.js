exports.default = {
   names: ['User Menu'],
   tags: ['menfess', 'mfs', 'tutupmenfess', 'akhirimenfess', 'menfessclose'],
   command: ['menfess', 'mfs', 'tutupmenfess', 'akhirimenfess', 'menfessclose'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (command == 'menfess' || command == 'mfs') {
         if (!text) throw `*Cara penggunaan :*\n\n${prefix + command} nomor penerima|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:*\n${prefix + command} ${m.sender.split`@`[0]}|${setting.botName}|Halo`;
         const menfess = global.db.menfess
         let [jid, name, pesan] = text.split('|');
         if ((!jid || !name || !pesan)) throw `*Cara penggunaan :*\n\n${prefix + command} nomor penerima|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:*\n${prefix + command} ${m.sender.split`@`[0]}|${setting.botName}|Halo.`;
         jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
         const data = (await conn.onWhatsApp(jid))[0] || {};
         if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';
         if (jid == m.sender) throw 'tidak bisa mengirim pesan menfess ke diri sendiri.'
         const id = + new Date
         const txt = `*Hai Kak*\n*@${data.jid.split('@')[0]}*\n*Kenalin Aku ${setting.botName} Robot Whatsap*\n*Disini Aku Berperan Sebagai Tukang Pos* , *kamu menerima pesan nih*.\n\n*Dari:* ${name}\n*Pesan:* ${pesan}\n\nMau balas pesan ini kak? bisa kak. kamu tinggal ketik pesan kamu nanti aku sampaikan ke *${name}*.`.trim();
         if (m.isBaileys) return
         await conn.sendMessage(data.jid, {
            text: txt,
            mentions: [data.jid]
         }, {
            quoted: fake_wa,
            ...conn_bind
         }).then(async () => {
            if (m.isBaileys) return
            await m.reply('Berhasil mengirim pesan menfess.')
            menfess[id] = {
               ID: id,
               status: true,
               dari: m.sender,
               penerima: data.jid,
               firstNameChat: name,
               pesan: [{
                  waktu: `${waktu.tanggal} ${waktu.time}`,
                  nama: m.pushName,
                  number: `${m.sender.split('@')[0]}`,
                  pesan: pesan
               }]                                
            }
            return !0
         })
      } else if (command == 'menfessclose' || command == 'tutupmenfess' || command == 'akhirimenfess') {
         const menfess = global.db.menfess
         const mf = Object.values(menfess).find(v => v.status === true && v.dari == m.sender);
         if (mf) {
            delete menfess[mf.ID]
            await m.reply('Sukses Menutup Sesi Menfess').then(async () => {
               await conn.sendMessage(mf.penerima, {
                  text: 'Pengirim Telah Mengakhiri Sesi Menfess',
                  mentions: [mf.penerima]
               }, {
                  quoted: fake_wa,
                  ...conn_bind
               })
            })
         } else {
            return m.reply('Tidak Ada Sesi Menfess Saat InI')
         }
      }
   },
   private: true
}
