exports.default = {
   tags: 'owner',
   help: ['out', 'keluar', 'outgc', 'listgc', 'syncgc', 'fixgc', 'outall'],
   command: ['out', 'keluar', 'outgc', 'listgc', 'syncgc', 'fixgc', 'outall', 'outgcall'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (command === 'outgc' || command === 'listgc' || command === 'syncgc' || command === 'fixgc') {
         return await Utils.leaveGroup(m, conn, prefix, command, text)
      } else if (command === 'out' || command === 'keluar') {
         const target = text ? text : m.chat
         await m.reply('Bye Bitch')
         await conn.group.leaveGroup([target])
         delete db.chats[target]
         if (db.chats.community && db.chats.community[target]) delete db.chats.community[target]
      } else if (command === 'outall' || command === 'outgcall') {
         let count = 0
         let gagal = 0
         for await (let i of Object.keys(db.chats)) {
            if (!i.endsWith('@g.us')) continue
            try {
               await conn.group.leaveGroup([i])
               delete db.chats[i]
               if (db.chats.community && db.chats.community[i]) delete db.chats.community[i]
               count++
               await sleep(1000)
            } catch (e) {
               gagal++
               console.log('[OUTALL] gagal keluar dari', i, '-', e.message)
            }
         }
         return m.reply(`✅ Berhasil keluar dari ${count} grup.${gagal ? `\n❌ Gagal ${gagal} grup (cek log).` : ''}`)
      }
   },
   owner: true
}