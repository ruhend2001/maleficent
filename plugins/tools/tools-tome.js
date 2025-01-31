const { downloadContentFromMessage } = require('@adiwajshing/baileys');
exports.default = {
   names: ['Owner'],
   tags: ['tome', 'rvome', '👍'],
   command: ['tome', 'rvome', '👍'],
   start: async (m, {
      conn
   }) => {
      if (!m.quoted) return m.reply('Balas pesan 1x lihatnya');      
      const type = Object.keys(m.quoted.message)[0];
      const q = m.quoted.message[type];
      const caption = q.caption || ''
      const media = await downloadContentFromMessage(q, type === 'imageMessage' ? 'image' : 'video' || type === 'audioMessage' ? 'audio' : 'audio') 
      let buffer = Buffer.from([])
      for await (const chunk of media) {
         buffer = Buffer.concat([buffer, chunk])
      };
      conn.sendFile(`${setting.contact}@s.whatsapp.net`, buffer, { ptt: true, caption: caption + `*From:* @${m.quoted.sender.split('@')[0]}\n*Waktu:* ${waktu.tanggal} ${waktu.time} `, mentions: [m?.quoted?.sender], quoted: m }).then(() => m.react('✅'));
   },
   owner: true
}