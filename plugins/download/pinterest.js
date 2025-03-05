exports.default = {
   names: ['Downloader'],
   tags: ['pinterest'],
   command: ['pinterest', 'pin'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh: ${prefix+command} Input Query`)
      const images = await Format.Scraper.pinterest(text);      
      if (images.length == 0) return m.reply('Not Found / Error');
      conn.adReply(m.chat, loading, cover, m);
      let pinterest = `${javi} 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓\n`
      pinterest += `${java} Result From ${text}\n\n1. Lanjut\n2. Stop`;
      conn.sendFile(m.chat, pickRandom(images), pinterest.trim(), m).then(() =>  {
         const event = db.users[m.sender].event_cmd
         event.pinterest = {
            status: true,
            search: text
         }
      })
   },
   limit: 2,
   premium: false
};
