const fs = require('fs');
exports.default = {
   names: ['Owner'],
   tags: ['upsw', 'uploadsw'],
   command: ['upsw', 'uploadsw'],
   start: async (m, {
      conn,
      text,
      mime,
      quoted
   }) => {
      let contacts = {}
      try {
         const data = await fs.promises.readFile('./lib/contact.json', 'utf8')
         contacts = JSON.parse(data)
      } catch (e) {}
      if (Object.keys(contacts).length === 0) {
         try {
            if (db.contacts && Object.keys(db.contacts).length > 0) {
               contacts = db.contacts
            }
         } catch (e) {}
      }
      if (Object.keys(contacts).length === 0) throw 'Tidak ada kontak yang ditemukan, tidak bisa mengirim status!'
      const statusJidList = Object.keys(contacts).map(v => `${v}@s.whatsapp.net`)
      if (/image|video|audio/.test(mime)) {
         const media = await quoted.download()
         if (/audio/.test(mime)) {
            m.reply(loading)
            return await conn.sendStatusAudio(media, statusJidList), m.reply('Done')
         } else {
            m.reply(loading)
            const mediaType = /image/.test(mime) ? 'image' : 'video'
            return await conn.sendStatusImageOrVideo(text, quoted, media, mediaType, statusJidList), m.reply('Done')
         }
      } else {
         if (!text) throw 'Textnya mana?'
         m.reply(loading)
         return await conn.sendStatusText(text, statusJidList), m.reply('Done')
      }
   },
   owner: true
}