const fs = require('fs');
const path = require('path');
const axios = require ('axios');
const fetch = require('node-fetch');
const { format } = require('util');
const { exec, execSync } = require('child_process');
module.exports = {
   start: async (m, { conn, prefix, command, text, mime, args, cmd, quoted, pushname, groupName, participants, groupAdmins, budy, isAdmins, isBotAdmins, isOwner, isPremium, store, time, body, Format}) => {
      if (value(budy, ['>', ')'])) {
         if (!isOwner || m.isBaileys) return         
         try {
            return await m.reply(format(await eval(`(async()=>{${budy.replace(/;/g, '').slice(2)}})()`)))
         } catch (e) {
            return await m.reply(format(e));
         }
      } else if (value(budy, ['=>', '->', '~>', '=)', '-)'])) {
         if (!isOwner || m.isBaileys) return
         try {
            return await m.reply(format(await eval(`(async()=> ${budy.replace(/;/g, '').slice(3)})()`)));
         } catch (e) {
            return await m.reply(format(e));
         }
      } else if (value(budy, ['$', '*'])) {
         if (!isOwner || m.isBaileys) return
         m.reply('> executing...')
         return await exec(budy.slice(1) || budy.slice(2), async (error, stdout) => {
            if (error) await m.reply(format(error).trim());
            if (stdout) await m.reply(format(stdout).trim());
         })
      }
   }
}