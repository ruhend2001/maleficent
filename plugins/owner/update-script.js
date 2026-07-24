exports.default = {
   names: ['Owner'],
   tags: ['update', 'updatesc', 'updatescript'],
   command: ['updatesc', 'updatescript', 'update'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`apa kamu yakin ingin update script?\n\n- update ini akan memperbarui script lama ini dengan yang terbaru.\n- beberapa file yg sudah kamu buat atau edit mungkin akan menjadi default script bawaan (default).\n- update ini tidak akan menghapus database dan configurasi kamu\n\nsetuju dan lanjut ketik ${prefix+command} yes`);
      if (text == 'y' || text == 'yes') {
         m.reply(`tunggu sedang backup script saat ini terlebih dahulu . . .`);
         const data = await Format.backup_script();
         await conn.sendFile(m.sender, data, 'ini file backup script sekarang jika ada file yg sudah kamu buat atau edit kamu bisa ambil dan restore lagi', m, {
            document: true,
            fileName: 'script_backup_old.zip',
            mimetype: 'application/zip'
         })
         await sleep(2000);
         m.reply('updating script .  .  .');
         const update = await Format.update_script();
         if (update) return await m.reply('update script selesai rebooting . . .'), await sleep(1000), reset();
      }
   },
   owner: true
}