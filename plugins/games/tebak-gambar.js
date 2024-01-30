import fs from 'fs';
import { exec } from 'child_process';
let tebakgambar = {}
let rewards = {
   limit: 10,
   uang: 20
}
let mistaken = Math.floor(Math.random() * 3);
let message = ['💩 Salah', '🐽 Kurang Tepat', '🍌 Belum Benar'][mistaken];

export let m = {
   start: async (m, {
      budy,
      User
   }) => {
      if (tebakgambar.hasOwnProperty(m.sender.split('@')[0]) && budy && !m.isBaileys) {
         let jawaban = tebakgambar[m.sender.split('@')[0]]
         if (budy.toLowerCase() === jawaban) {
            m.adReply(`Benar 🌈\nkamu mendapatkan:\n+Limit ${rewards.limit}\n+Uang ${rewards.uang} `, setting.thumbnail, m.chat)
            User.dbPlus(m.sender, rewards);
            delete tebakgambar[m.sender.split('@')[0]];
         } else {
            m.adReply(message, setting.thumbnail, m.chat)
         }
      }
   }
};

export default {
   names: ['Games'],
   tags: ['tebakgambar'],
   command: ['tebakgambar'],
   start: async (m, {
      conn,
      prefix,
      Format
   }) => {
      if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Soal Yang Belum Diselesaikan!")
      let results = await Format._axios('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
      let result = results[Math.floor(Math.random() * results.length)];
      let ran = 'tmp/' + Format.getRandom('.png');
      await exec(`ffmpeg -i ${result.img} ${ran}`, async () => {
         let media = await fs.readFileSync(ran);
         conn.sendFile(m.chat, media, {
            caption: `Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${result.deskripsi}\nWaktu : 60 Detik\nHadiah 🎁 ${rewards.limit} limit dan ${rewards.uang} uang`,
            quoted: m
         }).then(() => {
            tebakgambar[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
         })
      });
      await Format.sleep(60000);
      if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) {
         console.log("Jawaban: " + result.jawaban)
         m.adReply(`Waktu Habis\nJawaban: ${tebakgambar[m.sender.split('@')[0]]}`, setting.thumbnail, m.chat)
         delete tebakgambar[m.sender.split('@')[0]]
      }
   }
};