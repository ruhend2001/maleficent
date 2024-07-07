import { exec } from 'child_process';
import util from 'util';
export default {
   names: ['Owner'],
   tags: ['cekupdate', 'update'],
   command: ['cekupdate', 'update'],
   start: async (m, {
      conn,
      Format
   }) => {
      m.reply('*Checking Update...*');
      exec('git stash', (err, stdout) => {
         if (err) {
           return conn.reply(m.chat, 'folder .git kamu tidak ada\nupdate sc dari repositori hanya berlaku untuk yang dari git clone\nkalo update modul itu sudah otomatis', m);
         };
         if (stdout) {
           return conn.reply(m.chat, util.format(stdout), m);
         };
      })
      await Format.sleep(2000);
      exec('git pull', (err, stdout) => {
         if (err) {
           return conn.reply(m.chat, 'folder .git kamu tidak ada\nupdate sc dari repositori hanya berlaku untuk yang dari git clone\nkalo update modul itu sudah otomatis', m);
         };
         if (stdout) {
           return conn.reply(m.chat, util.format(stdout), m);
         };
      })
   },
   owner: true
};