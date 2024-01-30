import { ytsearch } from '../../lib/download.js'
export default {
   names: ['Downloader'],
   tags: ['ytsearch'],
   command: ['ytsearch', 'yts'], 
   start: async (m, {
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`Masukan Info Yang Ingin Di Cari\ncontoh ${prefix+command} laila canggung`);
      let { video, channel } = await ytsearch(text)
      //m.image(imgload, loading)
      m.adReply(mess.wait, setting.thumbnail, m.chat)
      let teks = [...video, ...
         channel
      ].map(v => {
         switch (v.type) {
            case 'video':
               return `
      ${javi} *${v.title}* 
      ${java} *${v.url}*
      ${java} Duration: ${v.durationH}
      ${java} Uploaded ${v.publishedTime}
      ${java} ${v.view} views`.trim()
            case 'channel':
               return `
      ╭──────━• *CHANNEL*
      │🎀 *${v.channelName}* 
      │🔗 *${v.url}*
      │📛 _${v.subscriberH} Subscriber_
      │🎥 ${v.videoCount} video
      ┗──────━•`.trim()
         }
      }).filter(v => v).join(
         '\n\n─────────────━─────────────\n\n'
      )
      m.adReply(`\n*Salin link youtube nya*\n*terus ketik .ytmp3 linknya*\n*Kalo Mau videonya ketik .ytmp4 linknya*\n\n\n${javi} 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐒𝐄𝐀𝐑𝐂𝐇 ${javi} \n\n` + teks, setting.thumbnail, m.chat)
   },
   limit: true
};