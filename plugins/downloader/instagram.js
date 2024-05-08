import { igdl } from '../../lib/download.js';
export default {
   names: ['Downloader'],
   tags: ['instagram'],
   command: ['instagram', 'ig', 'igdl', 'instegrem', 'insta'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan agram contoh ${prefix+command} https://www.instagram.com/p/C1Ck8sENM94/?igsh=amY1ajd4Nm1vMTBw`);
      let res = await igdl(text);
      m.adReply(loading, setting.thumbnail, m.chat);
      let data = await res.data;
      for (let i = 0; i < data.length; i++) {
         let media = data[i];
         conn.sendFile(m.chat, media.url, {
            quoted: m
         });
      }
   },
   limit: 5,
   premium: false
}
