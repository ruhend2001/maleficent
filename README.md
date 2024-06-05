## Maleficent Bot

<p align="center">
<img src="https://files.catbox.moe/ku30iz.jpeg" alt="Maleficent Bot-Md" width="500"/>

 Bagaimana mnambah fitur atau plugin baru?<br>
How to add features or new plugins?<br>
pastikan kalian edit kode atau plugins dengan hati hatinya agar tidak error karna sc ini awal tidak ada eror dan pasti nya sudah di cek copy atau ambil saja saja plugins lain<br>

```ts
export default {
   names: ['Tittle'],
   tags: ['title'], 
   command: ['title'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      User,
      Format
   }) => {
      //kode kamu or your code
   },
   limit: true
}
```
names: ['Tittle']<br>
//Judul Kategori yang akan di tampikan di menu<br>
tags: ['title']<br>
//perintah yang akan tampil di menu<br>
command: ['title']<br>
//perintah untuk menjalankan plugins plugins nya<br>
limit: true<br>
//true = 1 atau bisa kasih nilai angka<br>
premium: false<br>
//true jika ingin plugins fiturnya hanya bida di akses premium user<br>
owner: false<br>
//true hanya dapat di akses owner<br>
admin: false<br>
// true hanya dapat di akses admin<br>
group: false<br>
// true hanya dapat di akses dalam group saja<br>
private: false<br>
// true hanya dapat di akses di chat pribadi<br>
disable: false<br> 
// true jika tidak ingin di akses siapapun dan selanjut ada pada contoh plugins lain<br>

untuk menjalankan langsung tanpa command atau event message

```ts
export let m = {
   start: async (m, {
      conn,
      budy,
      User,
      Format
   }) => {
       //your kode or kode kamu
   }
};
```

next learn by yourself follow plugins that they were already<br>
selanjutnya pelajari oleh kamu sendiri ikuti plugin yang sudah ada<br>
## Bugs and Request Fitur
* Jika kamu menemukan bug bisa lapor ke owner dan juga request fitur atau bantuan lain
* Info Lebih Lanjut, Chat [Owner-Maleficent](https://wa.me/6283112005221)

# Requirements
* [Node.js](https://nodejs.org/en/)
* [FFmpeg and Image magic](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2020-12-08-13-03/ffmpeg-n4.3.1-26-gca55240b8c-win64-gpl-4.3.zip) (for sticker command)
