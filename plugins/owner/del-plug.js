exports.default = {
   names: ['Owner'],
   tags: ['deleteplugin', 'dp'],
   command: ['deleteplugin', 'dp'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Masukan nama file yang mau di hapus!\ncontoh: ${prefix+command} cinta.js`);
      const data = await Format.deletePlugins(text)
      if (data.msg) return m.reply(`File ${data.file} Berhasil Di Hapus`);
      else return m.reply(`Tidak ada file plugin dengan nama: ${text}\n\nPastikan nama sesuai dan ada file plugin nya jangan lupa tambahkan akhiran .js`);
   },
   owner: true
}