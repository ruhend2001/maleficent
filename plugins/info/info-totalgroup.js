exports.default = {
   names: ['Info'],
   tags: ['totalgroup', 'totalgc', 'listpc', 'listgc'],
   command: ['totalgroup', 'totalgc', 'listpc', 'listgc'],
   start: async (m, {
      conn,
      store,
      Format     
   }) => {      
      const group = Object.keys(db.chats);
      await m.edReply('Collecting data...', 300)
      let count = 0;      
      let caption = '';
      for await (let i of group) {
         try {
            const accept = await conn.groupMetadata(i);
            if (!accept) continue
            count += 1;
         } catch (e) {
            delete db.chats[i]
            await Format.sleep(2000)
         }
      };      
      let teks_gc = `*Total Data Chat ${setting.botName}*\nTotal Group: ${count} group\n\n`            
      for await (let i of Object.keys(db.chats)) {
         const data = await conn.groupMetadata(i)
         const nama = data.subject
         teks_gc += `*ID:* ${i}\n*Name:* ${nama}\n\n`
      }
      const pc = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
      let teks_pc = `*List Personal Chat*\nTotal Chat : ${pc.length} Chat\n\n`
      for (let i of pc) {
         const pesan = (await store.chats.all().filter(v => v.id === i)[0]).unreadCount      
         const nama = store.messages[i].array[0].pushName
         teks_pc += `• *User :* @${i.split('@')[0]}\n*Number :* +${i.split('@')[0]}\n*Total Pesan :* ${pesan} pesan\n\n`
      }      
      caption += teks_gc
      caption += teks_pc
      conn.adReply(m.chat, caption.trim(), cover, m, {
         mentions: conn.parseMention(caption)
      });
   }
}