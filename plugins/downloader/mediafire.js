export default {
   names: ['Downloader'],
   tags: ['mediafire'],
   command: ['mediafire', 'mf'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Contoh:\n${prefix+command} https://www.mediafire.com/file/96mscj81p92na3r/images+(35).jpeg/file`)
      let isLinks = text.match(/(?:https?:\/{2})?(?:w{3}\.)?mediafire(?:com)?\.(?:com|be)(?:\/www\?v=|\/)([^\s&]+)/)
      if (!isLinks) return m.reply('Link yang kamu berikan tidak valid')
      let emfi1 = await Format.mediafireDl(`${isLinks}`)
      m.adReply(mess.wait, setting.thumbnail, m.chat);
      if (emfi1[0].size.split('MB')[0] >= 128) return m.reply('File Melebihi Batas Dari 128MB\n\n' + JSON.stringify(emfi1, null, 2))
      let MediaFire = ` ${star} 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄\n\n`
      MediaFire += ` ${java} Nama : ${emfi1[0].nama}\n`
      MediaFire += ` ${java} Size : ${emfi1[0].size}\n`
      MediaFire += ` ${java} Type : ${emfi1[0].mime}\n\n`
      MediaFire += ` Mengirim file...`
      m.adReply(MediaFire, setting.thumbnail, m.chat);
      conn.docUrl(m.chat, emfi1[0].link, emfi1[0].nama, '', emfi1[0].mime, m);
   },
   limit: 15,
   premium: false
};