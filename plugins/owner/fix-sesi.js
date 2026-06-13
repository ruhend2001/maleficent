exports.default = {
   names: ['Owner'],
   tags: ['fixsesi', 'clearsesi'],
   command: ['fixsesi', 'fixsessi', 'clearsesi', 'clearsessi'],
   start: async (m, {
      conn,
      Format
   }) => {           
      await m.reply(`Done sessions fixed rebooting...`);
      await sleep(2000), await Format.fix_sessions(), process.send('reset');
   },
   owner: true
}