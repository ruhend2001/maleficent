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
      var contacts
      try {
         if (db.contacts.length === 0) {
            contacts = {}
         } else {
            contacts = db.contacts
         }
      } catch (e) {
         console.log('Error accessing db.contacts:', e);
      };
      if (Object.keys(contacts).length === 0) {
         try {
            const data = await fs.promises.readFile('./lib/contacts.json', 'utf8');
            contacts = JSON.parse(data);
         } catch (e) {
            console.error('Error reading contacts.json:', e);
            throw 'Tidak ada kontak yang ditemukan, tidak bisa mengirim status!';
         }
      };
      const contactKeys = Object.keys(contacts);
      if (contactKeys.length === 0) throw 'Tidak ada kontak yang ditemukan, tidak bisa mengirim status!';
      const statusJidList = contactKeys.map(v => `${v}@s.whatsapp.net`);
      if (/image|video|audio/.test(mime)) {
         const media = await quoted.download();
         if (/audio/.test(mime)) {
            m.reply(loading);
            return await conn.sendStatusAudio(media, statusJidList), m.reply('Done');
         } else {
            m.reply(loading);
            const mediaType = /image/.test(mime) ? 'image' : 'video';
            return await conn.sendStatusImageOrVideo(text, quoted, media, mediaType, statusJidList), m.reply('Done');
         }
      } else {
         if (!text) throw 'Textnya mana?';
         m.reply(loading);
         return await conn.sendStatusText(text, statusJidList), m.reply('Done');
      }
   },
   owner: true
};