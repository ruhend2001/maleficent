const { backupMongo, restoreMongo } = require('../../lib/src/cloud/mongo-db.js');
const { backupGithub, restoreGithub } = require('../../lib/src/cloud/github-db.js');
const { format }  = require('util');
exports.default = {
   names: ['Owner'],
   tags: ['backup', 'restore'],
   command: ['backup', 'restore'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      if (!text) return m.reply(`masukan cloud penyimpanan database nya\ncontoh: ${prefix + command} mongo\n\nsaat ini hanya terdapat 2 penyimpanan database cloud\n(mongo dan github)\n\npilih salah satunya saja yang mau kamu backup atau restore`);
      if (!['github', 'mongo'].includes(text)) return m.reply('hanya mongo dan github saja yang tersedia');
      if (command == 'backup' && text == 'mongo') {
         m.reply('Tunggu sedang backup monggo...');
         const response = await backupMongo(global.db);
         return m.reply(response)         
      } else if (command == 'restore' && text == 'mongo') {
         m.reply('Tunggu sedang restore monggo...');
         const response = await restoreMongo();
         return await m.reply(response.log + '\nRestarting...'), reset()    
      } else if (command == 'backup' && text == 'github') {
         m.reply('Tunggu sedang backup to gitHub...');
         const response = await backupGithub();         
         if (!response.status) m.reply('Gagal Backup Database')
         return await m.reply(response)
      } else if (command == 'restore' && text == 'github') {
         m.reply('Tunggu sedang restore from github...');
         const response = await restoreGithub();
         if (!response.status) m.reply('Gagal Restore Database')
         await m.reply(response)
         if (response.status) return await m.reply('Restarting...'), reset();      
      } 
   },
   owner: true
}