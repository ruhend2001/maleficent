## Maleficent Bot

<p align="center">
<img src="https://files.catbox.moe/ku30iz.jpeg" alt="Maleficent Bot-Md" width="500"/><br>

this script will be continuously update to ensure it remains optimized<br>
script ini akan terus di update ya untuk memastikan tetap optimal<br>
if you wanna use input number to get pairing code use npm start<br>
or node index.js --pairing<br><br>
If you want to get the paring, setting code directly in the botNumber section first<br>
dan jangan lupa masukin ownerNumber nya biar nanti gampang edit edit lewat bot<br>

Bagaimana menambah fitur atau plugin baru?<br>
How to add features or new plugins?<br>
pastikan kalian edit kode atau plugins dengan hati hatinya agar tidak error karna sc ini awal tidak ada eror dan pasti nya sudah di cek copy atau ambil saja saja plugins lain yang sudah ada sebagai contoh<br><br>
```ts
exports.default = {
   names: ['Tittle'],
   tags: ['title'], 
   command: ['title'],
   start: async (m, {
      conn,
      text,
      prefix,
      command
   }) => {
      //kode kamu or your code
   },
   limit: true
}
```
names: ['Tittle']<br>
Judul Kategori yang akan di tampikan di menu<br>
<br>
tags: ['title']<br>
perintah yang akan tampil di menu<br>
<br>
command: ['title']<br>
perintah untuk menjalankan plugins plugins nya<br>
<br>
limit: true<br>
true = 1 atau bisa kasih nilai angka<br>
<br>
premium: false<br>
true jika ingin plugins fiturnya hanya bida di akses premium user<br>
<br>
owner: false<br>
true hanya dapat di akses owner<br>
<br>
admin: false<br>
true hanya dapat di akses admin<br>
<br>
group: false<br>
true hanya dapat di akses dalam group saja<br>
<br>
private: false<br>
true hanya dapat di akses di chat pribadi<br>
<br>
disable: false<br> 
true jika tidak ingin di akses siapapun dan selanjut ada pada contoh plugins lain<br>
<br>
untuk menjalankan langsung tanpa command atau event message

```ts
module.exports = {
   start: async (m, {
      conn,
      budy,
      Format
   }) => {
       //your kode or kode kamu
   }
};
```

next learn by yourself follow plugins that they were already<br>
selanjutnya pelajari oleh kamu sendiri ikuti plugin yang sudah ada<br>

support termux, vps, panel , panel butut bisa minimal ram 500MB<br>

# support termux
<br><br>
* use yarn to install on termux<br>
<img src="https://small.fileditchstuff.me/s12/NDEKXREcgEIHqhGXvtd.jpg" alt="Maleficent Bot-Md" width="500"/>
<br>
<br>

# support with node 18
<img src="https://small.fileditchstuff.me/s12/PvybFjPSFPHQExNAGAo.jpg" alt="Maleficent Bot-Md" width="500"/>
<br>


# Requirements
* [Node.js](https://nodejs.org/en/)
* [FFmpeg and Image magic](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2020-12-08-13-03/ffmpeg-n4.3.1-26-gca55240b8c-win64-gpl-4.3.zip) (for sticker command)