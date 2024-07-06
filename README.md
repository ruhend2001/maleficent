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
<br>
tags: ['title']<br>
//perintah yang akan tampil di menu<br>
<br>
command: ['title']<br>
//perintah untuk menjalankan plugins plugins nya<br>
<br>
limit: true<br>
//true = 1 atau bisa kasih nilai angka<br>
<br>
premium: false<br>
//true jika ingin plugins fiturnya hanya bida di akses premium user<br>
<br>
owner: false<br>
//true hanya dapat di akses owner<br>
<br>
admin: false<br>
// true hanya dapat di akses admin<br>
<br>
group: false<br>
// true hanya dapat di akses dalam group saja<br>
<br>
private: false<br>
// true hanya dapat di akses di chat pribadi<br>
<br>
disable: false<br> 
// true jika tidak ingin di akses siapapun dan selanjut ada pada contoh plugins lain<br>
<br>
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

support termux, vps, panel , panel butut bisa minimal ram 500MB<br>

# support npm i 
<br> 
* termux must main directory $HOME <br>
* if u wanna run in /sdcard. don't move or copy to /sdcard before install node_modules<br>
* zip after node_modules installed. 
just google how to zip and copy file in termux <br>
* make it easy 

<img src="https://small.fileditchstuff.me/s12/NDEKXREcgEIHqhGXvtd.jpg" alt="Maleficent Bot-Md" width="500"/>
<br>
<br>

# support yarn
<img src="https://small.fileditchstuff.me/s12/PvybFjPSFPHQExNAGAo.jpg" alt="Maleficent Bot-Md" width="500"/>
<br>


# Requirements
* [Node.js](https://nodejs.org/en/)
* [FFmpeg and Image magic](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2020-12-08-13-03/ffmpeg-n4.3.1-26-gca55240b8c-win64-gpl-4.3.zip) (for sticker command)
