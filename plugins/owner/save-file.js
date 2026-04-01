const fs = require('fs');
const assert = require('assert');
const syntaxError = require('syntax-error');
exports.default = {
   names: ['Owner'],
   tags: ['simpan', 'addplugin'],
   command: ['sf', 'simpan', 'addplugin'],
   start: async (m, {
      text,
      prefix,
      command
   }) => {
      if (!m.quoted) return m.reply(`Balas Pesan Kode / Plugins yang mau disimpan\ncontoh ${prefix + command} plugins/cinta.js atau file yang ingin kamu save`);
      if (!text) return m.reply(`Pastikan jalur folder / file tujuan Kode tersebut ada dan tepat !\ncontoh: ${prefix + command} plugins/main/cinta.js\nintinya jalur file kode yang ingin disimpan\n\njika ingin simpan selain file plugins tidak masalah bisa juga, yang penting jalur tepat dan pastinya berupa .js atau .json\ncontoh ${prefix+command} filesaya.js atau ${prefix+command} lib/filesaya.json seperti itu`);
      const path = `${text.trim()}`;
      const code = m.quoted.text;
      try {
         JSON.parse(code);
         fs.writeFileSync(path, JSON.parse(JSON.stringify(code, 0, 3)));
         return m.reply(`tersimpan di ${path}`);
      } catch {
         const error = await syntaxError(code, {
            sourceType: 'commonjs'
         });
         if (error) {
            await m.reply('❗ Tidak dapat menyimpan kode, terdapat kesalahan sintaks.');
            throw assert.ok(error.length < 1, code + '\n' + error);
         };
         fs.writeFileSync(path, code);
         return m.reply(`Tersimpan di ${path}`);
      }
   },
   owner: true
};