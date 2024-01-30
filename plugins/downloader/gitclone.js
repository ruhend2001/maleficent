import fetch from 'node-fetch'
export default {
   names: ['Downloader'],
   tags: ['gitclone'],
   command: ['git', 'gitclone'],
   start: async (m, {
      conn,
      text,
      args,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`link githubnya mana?\n*Contoh:*\n${prefix+command} https://github.com/ruhend2001/maleficent`)
      let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
      let linknya = text
      if (!regex1.test(linknya)) return m.reply('link salah!');
      let [, user, repo] = args[0].match(regex1) || []
      repo = repo.replace(/.git$/, '')
      let url = `https://api.github.com/repos/${user}/${repo}/zipball`
      let filename = (await fetch(url, {
         method: 'HEAD'
      })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
      m.adReply(`*Mohon tunggu*\n*sedang mengirim repository...*`, setting.thumbnail, m.chat)
      conn.sendMessage(m.chat, {
         document: {
            url: url
         },
         fileName: filename,
         mimetype: 'application/zip'
      }, {
         quoted: m
      }).catch((err) => m.reply('Maaf link github yang kamu berikan di private, dan tidak bisa di jadikan file'))
   },
   limit: true,
   premium: false
};