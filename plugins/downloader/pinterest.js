import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { lookup } from 'mime-types'
import { URL_REGEX } from '@adiwajshing/baileys'

export default {
   names: ['Downloader'],
   tags: ['pinterest'],
   command: ['pinterest', 'pin'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      text = text.endsWith('SMH') ? text.replace('SMH', '') : text
      if (!text) return m.reply(`contoh: ${prefix+command} Input Query / Pinterest Url`)
      let res = await pinterest(text)
      m.adReply(loading, setting.thumbnail, m.chat)
      let mime = await lookup(res)
      m.adReply(mess.wait, setting.thumbnail, m.chat)
      let Pinterest = ` ${javi} 𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓\n`
      Pinterest += ` ${java} Result From ${text}` 
      text.match(URL_REGEX) ?
         conn.sendMessage(m.chat, {
            [mime.split('/')[0]]: {
               url: res
            },
            caption: `Succes Download: ${await shortUrl(res)}`
         }, {
            quoted: m
         }) :    
         conn.sendFile(m.chat, res, {
            caption: Pinterest,
            quoted: m
         })
   },
   limit: 5,
   premium: false
};

async function shortUrl(url) {
   return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}

async function pinterest(query) {
   if (query.match(URL_REGEX)) {
      let res = await fetch('https://www.expertsphp.com/facebook-video-downloader.php', {
         method: 'post',
         body: new URLSearchParams(Object.entries({
            url: query
         }))
      })
      let $ = await cheerio.load(await res.text())
      let data = $('table[class="table table-condensed table-striped table-bordered"]').find('a').attr('href')
      if (!data) throw 'Can\'t download post :/'
      return data
   } else {
      let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
      let json = await res.json()
      let data = json.resource_response.data.results
      if (!data.length) throw `Query "${query}" not found :/`
      return data[~~(Math.random() * (data.length))].images.orig.url
   }
}