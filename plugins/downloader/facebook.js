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
      if (!text) return m.reply(`Masukan link facebook nya! \nContoh: ${prefix+command} https://www.facebook.com/reel/3677168492551989?mibextid=rS40aB7S9Ucbxw6v`);
      let res = await igdl(text);
      m.adReply(loading, setting.thumbnail, m.chat);
      let result = res.data;
      let data;
      try {
         data = result.find(i => i.resolution === "720p (HD)");
         m.reply(`Data Found!`);       
      } catch {
         m.reply(`HD not found switch to SD`);
         data = result.find(i => i.resolution === "360p (SD)")
      }
      let video = data.url      
      conn.sendFile(m.chat, video, {
         caption: `𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊`,
         quoted: m
      });      
   },
   limit: 5,
   premium: false
};
