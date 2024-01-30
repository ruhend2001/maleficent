export default {
   names: ['Main Menu'],
   tags: ['statistic'],
   command: ['statistic', 'statistik', 'bandwith', 'net'],
   start: async (m, {
      conn,
      Format
   }) => {
      let { Upload, Download } = await Format.statistic();
      m.reply('Download: ' + Download + '\nUpload: ' + Upload);
   }
};