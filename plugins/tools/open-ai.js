import fetch from 'node-fetch'
import util from 'util';

export default {
   names: ['Tools'],
   tags: ['ai', 'chatgpt', 'openai'],
   command: ['ai', 'chatgpt', 'openai'],
   start: async (m, {
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`)
      await m.adReply('Menunggu Respon', setting.thumbnail, m.chat)
      let res = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`)
      let open = await res.json()
      let data = await open.data
      let ai = await util.format(data)
      await m.adReply(ai, setting.thumbnail, m.chat)
   },
   limit: 5,
   register: true
};