exports.default = {
   names: ['Info'],
   tags: ['ping', 'runtime'],
   command: ['ping', 'runtime', 'p'],
   start: async (m, {
      conn,
      Format
   }) => {
      let { latensi, oldd, neww, response, muptime } = await Format.System();
      let { Upload, Download } = await Format.statistic();
      let runtime = `⚡ Kecepatan TV : \n`
      runtime += `${latensi.toFixed(4)} _Second_\n`
      runtime += `${oldd - neww} _miliseconds_\n\n`
      runtime += `🌐 Statistic Usage Network Bot :\n📤  Upload: ${Upload}\n📥  Download: ${Download}\n\n`
      runtime += `🟢 Bot Aktif Selama :\n`
      runtime += `${muptime}\n`
      runtime += `${response}` 
      conn.reply(m.chat, runtime, m);
   }
}
