const { download } = require('../../lib/src/apk/apk.js');
exports.default = {
   names: ['Downloader'],
   tags: ['apk'],
   command: ['apk', 'apkdl'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan apk yang ingin di cari contoh ${prefix+command} facebook lite`);
      m.reply(loading);
      const res = await download(text), icon = res.icon, paket = res.package, size = res.size, nama = res.name, up = res.lastup, file = res.dllink;
      let caption = ` 𝐀𝐏𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃\n`      
      caption += ` ${java} Nama : ${nama}\n`
      caption += ` ${java} Update : ${up}\n`
      caption += ` ${java} Nama Paket : ${paket}\n`
      caption += ` ${java} Size : ${size}\n\n`
      caption += ` *Sending File...*`
      conn.sendFile(m.chat, icon, caption, m).then(() => {
         conn.sendFile(m.chat, file, '', m, {
            document: true,
            fileName: nama + '.apk', 
            mimetype: 'application/vnd.android.package-archive'
         })
      })
   },
   limit: 3,
   premium: false
};
