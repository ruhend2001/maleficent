const fs = require('fs')
const { exec } = require('child_process')
const { ttdl } = require('ruhend-scraper');
exports.default = {
   start: async (m, {
      conn
   }) => {
      if (db.settings?.auto_down && !m.isBot) {
         const fbLink = m.text?.match(/(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg)\/[^\s]+/)?.[0];
         if (fbLink) {
            if (withPrefix(m.text, 'fb|facebook|fbdl')) return
            if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
            m.react('🕒');
            const res = await fetchJSON(`https://ruhend-api.mywire.org/api/fbdl?url=${fbLink}&key=${key}`)
            if (!res.data) throw res
            await conn.sendFile(m.chat, res.data.video.hd || res.data.video.sd, 'Facebook', m)
            db.users[m.sender].limit -= 3
            m.reply(limit_message.replace('%limit', 3))
         }
         const igLink = m.text?.match(/(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/)?.[0]
         if (igLink) {
            if (withPrefix(m.text, 'ig|instagram|insta|igdl')) return
            if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
            m.react('🕘')
            const res = await fetchJSON(`https://ruhend-api.mywire.org/api/igdl?url=${igLink}&key=${key}`)
            if (!res?.data?.status) throw res
            const data = res.data.media
            for await (let v of data) {
               const mime = (await fromBuffer(await toBuffer(v))).mime
               if (/video/.test(mime)) {
                  await conn.sendFile(m.chat, v, '', m);
               } else {
                  const buffer = await toBuffer(v)
                  const inputPath = `tmp/${Date.now()}.webp`;
                  await fs.promises.writeFile(inputPath, buffer)
                  const outPath = `tmp/${Date.now() + 2}.jpg`;
                  await fs.promises.writeFile(outPath, buffer)
                  await new Promise(async (resolve, reject) => {
                     await exec(`ffmpeg -i ${inputPath} ${outPath} -y`, (err) => {
                        if (err) reject(err);
                        else resolve();
                     })
                  })
                  await conn.sendFile(m.chat, outPath, '', m);
               }
            }
            db.users[m.sender].limit -= 3
            m.reply(limit_message.replace('%limit', 3));
         }
         const ttLink = /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g;
         if (ttLink.test(m.text)) {
            if (withPrefix(m.text, 'tt|tiktok|ttdl')) return
            if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
            const tiktokLinks = m.text?.match(ttLink);
            for (let tiktokLink of tiktokLinks) {
               m.react('🕒');
               const { title, author, username, published, like, comment, share, views, bookmark, video, cover: picture, music } = await ttdl(tiktokLink);
               let caption = `𝐓𝐈𝐊𝐓𝐎𝐊\n`
               caption += `⭔ *Author:* ${author}\n`
               caption += `⭔ *Username:* ${username}\n`
               caption += `⭔ *Published:* ${published}\n`
               caption += `⭔ *Like:* ${like}\n`
               caption += `⭔ *Comment:* ${comment}\n`
               caption += `⭔ *Views:* ${views}\n`
               caption += `⭔ *Bookmark:* ${bookmark}\n`
               caption += `⭔ *Description:* ${title}\n`
               caption += `${setting.botName}`
               const mime = (await fromBuffer(await toBuffer(video))).mime
               if (/video/.test(mime)) {
                  await conn.sendFile(m.chat, video, caption, m);
               } else {
                  const slides = (await fetchJSON(`https://api.siputzx.my.id/api/d/tiktok/v2?url=${m.text}`)).data.slides;
                  const urls = Object.keys(slides).filter(key => !isNaN(key)).map(key => slides[key].url);
                  for await (let v of urls) {
                     const buffer = await toBuffer(v)
                     const inputPath = `tmp/${Date.now()}.jpg`;
                     await fs.promises.writeFile(inputPath, buffer)
                     const outPath = `tmp/${Date.now() + 2}.jpg`;
                     await fs.promises.writeFile(outPath, buffer)
                     await new Promise(async (resolve, reject) => {
                        await exec(`ffmpeg -i ${inputPath} ${outPath} -y`, (err) => {
                           if (err) reject(err);
                           else resolve();
                        })
                     })
                     await conn.sendFile(m.chat, outPath, '', m)
                  }
                  await conn.sendFile(m.chat, await Utils.mp3Play(await toBuffer(video)), '', m, {
                     ptt: true
                  })
               }
               db.users[m.sender].limit -= 3
               m.reply(limit_message.replace('%limit', 3));
            }
         }
         const linksRegex = /(http(?:s)?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/g;
         const shortsRegex = /(http(?:s)?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^\s&]+)/g;
         const linkMatch = m.text?.match(linksRegex) || m.text?.match(shortsRegex);
         if (linkMatch) {
            if (withPrefix(m.text, 'yt|ytv|yta|ytmp3|ytmp4|play|ytmp4doc|ytvdoc')) return
            if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
            m.react('⏰');
            const res = await fetchJSON(`https://ruhend-api.mywire.org/api/ytmp4?url=${linkMatch[0]}&quality=720&key=${key}`)
            if (!res?.data) throw res
            const caption = '*YOUTUBE*\n\n' +
               `*${res.data.title}*\n` +
               `*${res.data.description}*\n\n` +
               `*Loading video sedang di kirim*`;
            await conn.adReply(m.chat, caption, res.data.thumbnail, m);
            await conn.sendFile(m.chat, res.data.link, '', m, {
               asDocument: true,
               fileName: `${res.data.title}-${res.data.quality || ''}~Ruhend-MD.mp4`,
               mimetype: 'video/mp4'
            })
            db.users[m.sender].limit -= 3;
            m.reply(limit_message.replace('%limit', 3));
         }
      }
   }
}