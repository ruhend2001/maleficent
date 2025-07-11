exports.default = {
   names: ['Info'],
   tags: ['totalgroup', 'totalgc', 'listpc', 'listgc'],
   command: ['totalgroup', 'totalgc', 'listpc', 'listgc'],
   start: async (m, {
      conn,
      text,
      store,
      Format,
      isOwner
   }) => {  
      m.reply(`Obtaining data please wait \n${text.includes('--desc') ? '' : 'use --desc to see description (optional)'}\nMaybe this takes a long time ...`);
      let group = Object.keys(db.chats);      
      let count = 0;      
      let caption = '';
      for await (let i of group) {
         try {            
            if (i === 'community') continue
            const accept = await conn.groupMetadata(i);
            if (!accept) continue
            count += 1            
         } catch {
            if (i !== 'community') delete db.chats[i]
            await Format.sleep(5000)       
         }
      };      
      let teks_gc = `*Total Data Chat ${setting.botName}*\nTotal Group: ${count} group\n\n`            
      for await (let i of Object.keys(db.chats)) {
         if (i === 'community') continue  
         const data = await conn.groupMetadata(i)    
         const nama = data.subject
         const desc = data.desc || 'No Description'
         teks_gc += `*ID:* ${i}\n*Name:* ${nama}\n${text.includes('--desc') && isOwner ? `*Description:* ${desc}` : ''}\n\n`         
      };
      const pc = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
      let teks_pc = `*List Personal Chat*\nTotal Chat : ${pc.length} Chat\n\n`
      for (let i of pc) {
         const pesan = (await store.chats.all().filter(v => v.id === i)[0]).unreadCount
         const nama = store.messages[i].array[0].pushName
         teks_pc += `*User :* @${i.split('@')[0]}\n*Number :* +${i.split('@')[0]}\n*Total Pesan :* ${pesan + pesan} pesan\n\n`
      }      
      caption += teks_gc
      caption += teks_pc
      conn.adReply(m.chat, caption.trim(), cover, m, {
         mentions: conn.parseMention(caption)
      });
   }
}