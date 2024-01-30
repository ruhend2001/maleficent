import fs from 'fs';
export default {
   names: ['Tools'],
   tags: ['tourl', 'upload'],
   command: ['tourl', 'upload'],
   start: async (m, {
      conn,
      prefix,
      command,
      mime,
      quoted,
      Format
   }) => {
      if (!mime && !quoted) return
      if (/webp/.test(mime) || m.mtype === 'stickerMessage') {
         let media = await conn.downloadAndSaveMediaMessage(quoted)
         m.reply(mess.wait);
         let buffer_up = fs.readFileSync(media);
         let rand2 = 'tmp/' + Format.getRandom('.webp');
         fs.writeFileSync(`./${rand2}`, buffer_up);
         let { name, url, size } = await Format.upload(rand2);
         let sizeNy = Format.bytesToSize(size);
         let Upload = `UPLOAD SUKSES\n*Url :* ${url}\n`
         Upload += `${java} *Name :* ${name}\n`
         Upload += `${java} *Size :* ${sizeNy}\n`
         Upload += `${java} *Type:* Sticker`
         m.adReply(Upload, setting.thumbnail, m.chat)
      } else if (/image/.test(mime) || m.mtype === 'imageMessage' ||
         /audio/.test(mime) || m.mtype === 'audioMessage' ||
         /video/.test(mime) || m.mtype === 'videoMessage') {
         let mediaType;
         let fileExt;
         if (/image/.test(mime) || m.mtype === 'imageMessage') {
            mediaType = 'image';
            fileExt = '.jpeg';
         } else if (/audio/.test(mime) || m.mtype === 'audioMessage') {
            mediaType = 'audio';
            fileExt = '.mp3';
         } else if (/video/.test(mime) || m.mtype === 'videoMessage') {
            mediaType = 'video';
            fileExt = '.mp4';
         }
         let media = await conn.downloadAndSaveMediaMessage(quoted)
         m.reply(mess.wait);
         let buffer_up = fs.readFileSync(media);
         let rand2 = 'tmp/' + Format.getRandom(`${fileExt}`);
         fs.writeFileSync(`./${rand2}`, buffer_up);
         let { name, url, size } = await Format.upload(rand2);
         let sizeNy = Format.bytesToSize(size);
         let Upload = `UPLOAD SUKSES\n`
         Upload += `${java} *Url :* ${url}\n`
         Upload += `${java} *Name :* ${name}\n`
         Upload += `${java} *Size :* ${sizeNy}\n`
         Upload += `${java} *Type:* ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`
         m.adReply(Upload, setting.thumbnail, m.chat)
      } else {
         return m.reply('Balas Media Atau Kirim Media Dengan Caption .tourl atau .upload')
      }
   },
   limit: 15,
   register: true,
   premium: false
};