export default {
   names: ['Downloader'],
   tags: ['googledrive'],
   command: ['gdrive', 'googledrive'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`Masukan Link Google Drove nya contoh ${prefix+command} https://drive.google.com/file/d/1BKaXs8uIt4_C_dEKUje-nn-XYYNOO07y/view?usp=drivesdk`)
      let res = await Format.gdrive(text);
      if (!res) throw res;
      let Drive = ` ${star} 𝐆𝐎𝐆𝐆𝐋𝐄 𝐃𝐑𝐈𝐕𝐄\n`
      Drive += ` ${java} Name: ${res.fileName}\n`
      Drive += ` ${java} Type: ${res.mimetype}\n`
      Drive += ` ${java} Size: ${res.fileSize}\n`
      m.adReply(Drive, setting.thumbnail, m.chat);
      conn.docUrl(m.chat, res.downloadUrl, res.fileName, '', res.mimetype, m);
   },
   limit: 20,
   premium: false
};