export default {
   names: ['Maker'],
   tags: ['attp', 'ttp'],
   command: ['attp', 'ttp'],
   start: async (m, {
      conn,
      prefix,
      text,
      command
   }) => {
      let pack = setting.botName
      let own = setting.footer
      if (!text) return m.reply(`Kirim perintah ${prefix+command} text\ncontoh: ${prefix+command} ${setting.botName}`)
      let media = 'https://vihangayt.me/maker/text2gif?q=' + text
      m.adReply(mess.wait, setting.thumbnail, m.chat)
      let buffer = await media
      conn.sendImageAsSticker(m.chat, buffer, m, {
         packname: pack,
         author: own
      })
   },
   limit: true
};