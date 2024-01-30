import { ttdl } from '../../lib/download.js';
export default {
   names: ['Downloader'],
   tags: ['ttmp3'],
   command: ['ttmp3', 'tiktokmp3'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan link tiktok nya! \nContoh: ${prefix + command} https://vt.tiktok.com/ZSNYfYdLj`);
      m.adReply(mess.wait, setting.thumbnail, m.chat)
      let { audio } = await ttdl(text);
      conn.sendFile(m.chat, audio, {
         mimetype: 'audio/mp4',
         ptt: true,
         quoted: m
      });
   },
   limit: true
};