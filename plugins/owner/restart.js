exports.default = {
   names: ['Owner'],
   tags: ['restart'],
   command: ['restart', 'reset', 'reboot', 'rb'],
   start: async (m) => {
      await m.reply(`Merestart bot . . .`), await sleep(1000), reset();
   },
   owner: true
};