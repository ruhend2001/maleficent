import { exec } from 'child_process';
import util from 'util';
export default {
   names: ['Main Menu'],
   tags: ['speedtest'],
   command: ['speedtest', 'testspeed', 'tes', 'ot', 'speed'],
   start: async (m, {
      conn
   }) => {
      m.reply('*_Testing Speed..._*')
      await exec('python3 lib/speed.py', async (x, y) => {
         const result = await util.format(y)
         await conn.reply(m.chat, result, m)
      })
   }
};