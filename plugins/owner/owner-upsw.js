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
      const contacts = Object.keys(db.contacts);
      if (Object.keys(db.contacts) < 1) throw 'Tidak Ada Kontak Yang Temukan, Tidak Bisa Mengirim Status!'                        
      const statusJidList = Object.keys(db.contacts)      
      if (/image|video|audio/.test(mime)) {                  
         const media = await quoted.download();                
         if (/audio/.test(mime)) {
            m.reply(loading)  
            return await conn.sendStatusAudio(media, statusJidList), m.reply('Done')
         } else {
            m.reply(loading)
            const media_2 = /image/.test(mime) ? 'image' : 'video';           
            return await conn.sendStatusImageOrVideo(text, quoted, media, media_2, statusJidList), m.reply('Done')
         }
      } else {  
         if (!text) throw 'textnya mana?' 
         m.reply(loading)      
         return await conn.sendStatusText(text, statusJidList), m.reply('Done')
      }               
   },
   owner: true
}