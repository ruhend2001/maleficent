const fs = require('fs');
exports.default = {
   names: ['Group'],
   tags: ['tagsw', 'tagstatusgrup'],
   command: ['tagsw', 'tagstatusgrup'],
   start: async (m, {
      conn,
      text,
      mime,
      quoted,
      Format
   }) => {
      await m.reply(loading)
      let options;
      if (/extended|conversation/.test(mime)) {
         options = {
            text: text ? text : m?.quoted ? m.quoted.text : m.text
         }
      } else if (/audio/.test(mime)) {
         options = {
            audio: await Format.mp3(await quoted.download()), ...opus
         }
      } else if (/video/.test(mime)) {
         const tmp = await conn.download(quoted);
         const video = await Format.chunks(tmp);
         for (let i = 0; i < video.length; i++) {
            const videoFile = await fs.promises.readFile(video[i]);
            options = {
               video: videoFile,
               caption: text ? text : m?.quoted ? m.quoted.text : m.text
            }
            await conn.sendTagStatusGroup(conn, m.chat, m, options);
         };
         return m.reply('Done');
      } else if (/image/.test(mime)) {
         options = {
            image: await toBuffer(await conn.download(quoted)),
            caption: text ? text : m?.quoted ? m.quoted.text : m.text
         }
      }
      await conn.sendTagStatusGroup(conn, m.chat, m, options);
      m.reply('Done');
   },
   premium: true
};