import { download } from '../../lib/download.js';
export default {
   names: ['Downloader'],
   tags: ['apk'],
   command: ['apk', 'apkdl'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Apk yang ingin di cari contoh ${prefix+command} facebook lite`);
      if (m.isBaileys) return
      let res = await download(text)
      await m.adReply(mess.wait, setting.thumbnail, m.chat)      
      let icon = await res.icon
      let paket = await res.package
      let size = await res.size
      let nama = await res.name
      let up = await res.lastup
      let file = await res.dllink
      let Apk = `*𝐀𝐏𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃*\n`
      Apk += ` ${java} ${paket}\n`
      Apk += ` ${java} ${size}\n\n`
      Apk += ` ${java} Nama : ${nama}\n`
      Apk += ` ${java} Update : ${up}\n`
      Apk += ` ${java} Nama Paket : ${paket}\n`
      Apk += ` ${java} Size : ${size}\n`
      Apk += `*Sending File...*`
      m.adsReply(Apk, icon, m.chat)
      conn.sendMessage(m.chat, {
         document: {
            url: file
         },
         fileName: nama + '.apk',
         mimetype: 'application/vnd.android.package-archive'
      }, {
         quoted: m
      })
   },
   limit: 10,
   premium: false
};