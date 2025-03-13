const { Akinator } = require('nator-aki');
exports.default = {
   names: ['Games'],
   tags: ['aki', 'akinator'],
   command: ['aki', 'akinator'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => Format.akinator_cmd(Akinator, m, conn, text, prefix, command)
}