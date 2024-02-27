import { igdl } from '../../lib/download.js';
export default {
   names: ['Downloader'],
   tags: ['facebook'],
   command: ['fb', 'facebook', 'fbdl'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan link facebook nya! \nContoh: ${prefix+command} https://www.facebook.com/100070546388418/posts/pfbid0279knMA1reA28n52rKTDmDW1wMa88afUHZMGNapEUJQ1bRbQcYMfBaeHz4nhhzNTUl/`);
      let res = await igdl(text);
      m.adReply(loading, setting.thumbnail, m.chat);
      let data = await res.data;
      for (let media of data) {
         conn.sendFile(m.chat, media.url, {
            caption: `𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊`,
            quoted: m
         });
      }
   },
   limit: 7,
   premium: false
};
