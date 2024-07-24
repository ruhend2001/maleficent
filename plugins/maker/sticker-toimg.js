const fs = require('fs');
const { exec } = require('child_process');
exports.default = {
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
      if (!/webp/.test(mime)) return m.reply(`balas stiker dengan caption *${prefix + command}*`);
      let media = await conn.downloadAndSaveMediaMessage(quoted);
      let ran = `tmp/${Date.now()}.png`;
      conn.adReply(m.chat, loading, cover, m);
      await exec(`ffmpeg -i ${media} ${ran}`, (err) => {
         if (err) return m.reply(`${err}`);
         let buffer = fs.readFileSync(ran);
         conn.sendFile(m.chat, buffer, {
            caption: "Berhasil Ke Image ✔",
            quoted: m
         })
      })
   },
   limit: true
};