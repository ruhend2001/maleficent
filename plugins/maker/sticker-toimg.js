import fs from 'fs';
import { exec } from 'child_process';

export default {
   names: ['Maker'],
   tags: ['toimage'],
   command: ['toimg', 'toimage'],
   start: async (m, {
      conn,
      prefix,
      quoted,
      mime,
      command,
      Format
   }) => {
      if (!quoted) return m.reply('Reply Image');
      if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`);
      let media = await conn.downloadAndSaveMediaMessage(quoted);
      let ran = 'tmp/' + Format.getRandom('.png');
      m.adReply(mess.wait, setting.thumbnail, m.chat)
      await exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
         if (err) return m.reply(`${err}`);
         let buffer = await fs.readFileSync(ran);
         conn.sendFile(m.chat, buffer, {
            caption: "Berhasil Ke Image ✔",
            quoted: m
         })
      });
   },
   limit: true
};