const fs = require ( 'fs')
const axios = require ('axios')
const fetch = require ('node-fetch')
const path = require ('path')
const { spawn, exec } = require ('child_process')
const FormData = require ("form-data")
const BodyForm = require ('form-data')
const cheerio = require ("cheerio")
const { sizeFormatter } = require ('human-readable')
const speed = require ('performance-now')
const os = require ('os')
const util = require ('util')
const chalk = require ('chalk')
//##
function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join('./tmp', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      fs.writeFileSync(tmp, buffer)      
      spawn('ffmpeg', [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            if (code !== 0) return reject(code)
            resolve(fs.readFileSync(out))                                       
          } catch (e) {
            reject(e)
            buffer = null            
          } finally {
            buffer = null            
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toAudio(buffer) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3',
    '-af', 'volume=1.5'
  ], 'mp4', 'opus')
}

function mp3(buffer) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3',
    '-af', 'volume=1.5'
  ], 'mp4', 'mp3')
}

/*
function mp3(conn, url, ext, m) {
   return new Promise(async (resolve, reject) => {
      let input = await streamFile(conn, url, ext, m);
      let output = `./tmp/${Date.now()}.mp3`
      await exec(`ffmpeg -i ${input} -af "volume=1.5" ${output}`, (error, stdout, stderr) => {     
         if (error) {
           reject(`Conversion Failed`);
         } else {       
           resolve(path.resolve(output));
         }
      });
   });
}
*/
function mp3Play(buffer) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3',
    '-af', 'volume=2.0'
  ], 'mp4', 'opus')
}

function mp3v2(conn, url, ext, m) {
   return new Promise(async (resolve, reject) => {
      let input = await streamFile(conn, url, ext, m);
      let output = `./tmp/${Date.now()}.mp3`
      await exec(`ffmpeg -i ${input} -af "volume=2.0" ${output}`, (error, stdout, stderr) => {     
         if (error) {
           reject(`Conversion Failed`);
         } else {       
           resolve(path.resolve(output));
         }
      });
   });
}


function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], 'mp4', 'mp4')
}

//bytesToSize
function bytesToSize (bytes, decimals = 2) {
   if (bytes === 0) return '0 Bytes';
   const k = 1024;
   const dm = decimals < 0 ? 0 : decimals;
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

//sleep
async function sleep (ms) {
   return await new Promise(resolve => setTimeout(resolve, ms));
}
//makeid
function makeid (length) {
   let result = '';
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
         charactersLength));
   }
   return result;
}
//getBuffer
async function getBuffer(url, options) {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return console.log(err)
	}
}
//
async function _axios(url, options) {
	try {
		options ? options : {}
		const res = await axios({
			method: 'GET',
			url: url,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
			},
			...options
		})
		return res.data
	} catch (err) {
		return err
	}
}


//Gettandom
function getRandom (ext) {
   return `${Date.now()}${ext}`
}

// SAVE
async function streamFile(conn, url, ext, m) {
   var path = `./tmp/${Date.now()}.${ext}`;
   try {
      var response = await fetch(url);
      var buffer = await response.buffer();
      await fs.writeFileSync(path, buffer);
      buffer = null
      let fileSize = fs.statSync(path).size / 1024 / 1024
      if (fileSize >= 512) return conn.sendMessage(m.chat, {
         text: `\n*File Lebih Dari Batas Yang Owner Kasih 512MB! File Yang Kamu Minta Sebesar ${fileSize}\nDownload Sendiri !*\n*Biasanya Sih Orang Orang Tolol Yang Nge Download File Atau Media Yang Ukurannya Gede Sengaja Lagi*\n*Pake Bot Gratis Tau Diri Lah Jangan Apa Apa Yang Ga Lu Butuhin Di Download Apalagi Filenya Gede Gede Tolol*\n`
      }, {
         quoted: m
      });
      return path;
   } catch (err) {
      return console.log(err)
   }
}

//UPLOAD
function upload (input) {
   return new Promise(async (resolve, reject) => {
      const form = new BodyForm();
      form.append("files[]", fs.createReadStream(input));
      await axios({
      //https://pomf2.lain.la/upload.php
         url: "https://qu.ax/upload.php",         
         method: "POST",
         headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
            ...form.getHeaders()
         },
         data: form
      }).then((data) => {
         resolve(data.data.files[0]);
      }).catch((err) => reject(err));
   });
}

/*
function upload2(Path) {
   return new Promise(async (resolve, reject) => {
      if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
      try {
         const form = new BodyForm();
         form.append("file", fs.createReadStream(Path))
         const data = await axios({
            url: "https://telegra.ph/upload",
            method: "POST",
            headers: {
               ...form.getHeaders()
            },
            data: form
         })
         return resolve("https://telegra.ph" + data.data[0].src)
      } catch (err) {
         return reject(new Error(String(err)))
      }
   })
}
*/

async function upload2(file) {
  try {
     const execPromise = util.promisify(exec);
     const result = await execPromise(`curl -F "reqtype=fileupload" -F "userhash=5c0ac8ae529cdcc8dba7869d5" -F "fileToUpload=@${file}" https://catbox.moe/user/api.php`);
     return `${result.stdout}`
  } catch {
     throw 'moe currently is down'
  }
} 

//webp2mp4File
function webp2mp4File (path) {
   return new Promise(async (resolve, reject) => {
      const form = new BodyForm()
      form.append('new-image-url', '')
      form.append('new-image', fs.createReadStream(path))
      await axios({
         method: 'post',
         url: 'https://ezgif.com/webp-to-mp4',
         data: form,
         headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`
         }
      }).then(async ({
         data
      }) => {
         const bodyFormThen = new BodyForm()
         const $ = await cheerio.load(data)
         const file = $('input[name="file"]').attr('value')
         bodyFormThen.append('file', file)
         bodyFormThen.append('convert', "Convert WebP to MP4!")
         await axios({
            method: 'post',
            url: 'https://ezgif.com/webp-to-mp4/' + file,
            data: bodyFormThen,
            headers: {
               'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
            }
         }).then(async ({
            data
         }) => {
            const $ = await cheerio.load(data)
            const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
            resolve({
               status: true,
               message: "Module Fixed By Ruhend",
               result: result
            })
         }).catch(reject)
      }).catch(reject)
   })
}

//GOOGLE DRIVE
let formatSize = sizeFormatter({
	std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})

async function gdrive (url) {
	let id
	if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL'
	id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
	if (!id) throw 'ID Not Found'
	let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
		method: 'post',
		headers: {
			'accept-encoding': 'gzip, deflate, br',
			'content-length': 0,
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'origin': 'https://drive.google.com',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
			'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
			'x-drive-first-party': 'DriveWebUi',
			'x-json-requested': 'true' 
		}
	})
	let { fileName, sizeBytes, downloadUrl } =  JSON.parse((await res.text()).slice(4))
	if (!downloadUrl) throw 'Link Download Limit!'
	let data = await fetch(downloadUrl)
	if (data.status !== 200) throw data.statusText
	return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
}


async function HD (urlPath) {   
    return await new Promise(async (resolve, reject) => {
        let buffer,
            Form = new FormData(),
            scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + "enhance";
        Form.append("model_version", 1, {
            "Content-Transfer-Encoding": "binary",
            contentType: "multipart/form-data; charset=uttf-8",
        });
        Form.append("image", Buffer.from(urlPath), {
            filename: "enhance_image_body.jpg",
            contentType: "image/jpeg",
        });
        Form.submit({
                url: scheme,
                host: "inferenceengine" + ".vyro" + ".ai",
                path: "/" + "enhance",
                protocol: "https:",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
                    Connection: "Keep-Alive",
                    "Accept-Encoding": "gzip",
                },
            },
            function(err, res) {
                if (err) reject();
                let data = [];
                res
                    .on("data", function(chunk, resp) {
                        data.push(chunk);
                    })
                    .on("end", () => {
                        resolve(Buffer.concat(data));
                    });
                res.on("error", (e) => {
                    reject();
                });
            }
        );
    });
}
//HD2

async function HD2 (content){
  return await new Promise(async (resolve, reject) => {
   let ran = './tmp/' + Date.now() + '.png'
   await exec(`ffmpeg -i ${content} -vf unsharp=5:5:1.0:5:5:0.0 ${ran}`, (error, stdout, stderr) => {     
      if (error) {
        //reject(`Gagal Membuat HD`);
        reject(error)
      } else {       
        resolve(path.resolve(ran));
      }
    });
  });
}


//net
async function statistic () {
   let res = require("node-os-utils");
   let ind = 0;
   let out = 0;
   let data = await res.netstat.stats();
   for (let i of data) {
      ind += parseInt(i.inputBytes) / (1024 * 1024);
      out += parseInt(i.outputBytes) / (1024 * 1024);
   }
   let D = (ind >= 1024) ? (ind / 1024).toFixed(2) + ' GB' : ind.toFixed(2) + ' MB';
   let U = (out >= 1024) ? (out / 1024).toFixed(2) + ' GB' : out.toFixed(2) + ' MB';
   return {
      Upload: U,
      Download: D
   }
}
//MENU

async function Plugins(header, middle, pointer, bottom, prefix, options = {}) {
   let menu = 'format menu lama telah usang silahkan copy plugins menu baru di https://github.com/ruhend2001/maleficent/blob/master/plugins/main/menu.js \nlalu perbarui ke menu lama saat ini\natau git clone ulang atau download script nya ulang\n\n'
   menu += 'the old menu format is deprecated please copy the new menu plugins at https://github.com/ruhend2001/maleficent/blob/master/plugins/main/menu.js \nthen update to the current old menu\nor re git clone or re download the script'
   return { menu }   
}
//menu new
async function Menu(header, middle, pointer, bottom, prefix, options) {
   let { left, right, bigHeader, text, header_sub, select, type } = options;  
   let le = left || '';
   let ri = right || '';
   let LP = logo_premium || 'Ⓟ';
   let LL = logo_limit || 'Ⓛ';
   let menus = new Map();   
   let dir = path.join(__dirname, '../../../plugins');
   await readFiles(dir);
   async function readFiles(dir) {
      let files = await fs.promises.readdir(dir);
      for (let file of files) {
         let filePath = path.join(dir, file);
         let stat = await fs.promises.stat(filePath);
         if (stat.isDirectory()) {
            await readFiles(filePath);
         } else if (stat.isFile() && file.endsWith('.js')) {
            const plugin = await require(filePath); // load the plugin
            if (plugin.default) { // check if there's a default export
               let {
                  names,
                  tags,
                  limit,
                  premium
               } = plugin.default;

               if (Array.isArray(names)) {
                  for (const name of names) {
                     if (!menus.has(name)) {
                        menus.set(name, new Set()); // Use a Set to avoid duplicates
                     }
                     if (Array.isArray(tags)) {
                        for (let tag of tags) {
                           let modifiedTag = tag;
                           if (premium) {
                              modifiedTag += ` ${LP}`; // tambah simbol premium
                           } else if (limit) {
                              modifiedTag += ` ${LL}`; // tambah simbol limit
                           }
                           menus.get(name).add(modifiedTag); // add modified tags to the menu
                        }
                     }
                  }
               }
            }
         }
      }
   }
   if (type === 2) {   
      const printSubMenu = (text, type) => {
         if (text === 'all') {
            let menu_all = '';
            for (let [menuName, menuTags] of menus) {
               let _mn = bigHeader ? menuName.toUpperCase() : menuName;
               let mn = ` *${_mn}* `;
               menu_all += `${header}${le}${mn}${ri}\n`;
               menu_all += `${middle + pointer}${prefix}${[...menuTags].join(`\n${middle + pointer}${prefix}`)}\n${bottom}\n`;
            }
            return `${menu_all}`;
         } else {
            // Tambahkan menu "all" di atas menu lainnya
            let formattedMenus = [`${middle}${pointer}${prefix}menu all`]; // Menambahkan MENU ALL
            formattedMenus.push(...[...menus].map(([name]) => {
               return `${middle}${pointer}${prefix}menu ${name.toLowerCase()}`;
            }));

            // Jika text tidak diberikan, kembalikan semua submenu
            if (!text || text === 'menu') return `${header + le} *${header_sub}* ${ri}\n${formattedMenus.join('\n')}\n${bottom}`;

            // Cari menu yang cocok
            let matchedMenus = [...menus].filter(([name]) => name.toLowerCase().includes(text.toLowerCase()));
            if (matchedMenus.length > 0) {
               let res = `${header}${le} *${text.toUpperCase()}* ${ri}\n`;
               matchedMenus.forEach(([menuName, menuTags]) => {
                  let formattedMenuName = bigHeader ? menuName.toUpperCase() : menuName;

                  // Ubah bagian ini untuk menambahkan middle, pointer, dan prefix pada menuTags
                  let formattedTags = [...menuTags].map(tag => `${middle}${pointer}${prefix}${tag}`);
                  res += `${formattedTags.join('\n')}\n`;
               });
               res += bottom // + '\n';
               return res;
            }
         }
         // Jika tidak ada menu yang cocok
         let no_menu = `menu ${text} tidak ditemukan. Silakan coba lagi❗\n\n`;
         no_menu += `${text} menu not found.\nPlease try again❗`;
         return no_menu;
      };
      let result = await printSubMenu(text);
      let menu = await result.replace(/['‘’]+/g, '');
      return menu
   } else if (type === 1) {   
      let menu_all = '';
      for (let [menuName, menuTags] of menus) {
         let _mn = bigHeader ? menuName.toUpperCase() : menuName;
         let mn = ` *${_mn}* `;
         menu_all += `${header}${le}${mn}${ri}\n`;
         menu_all += `${middle + pointer}${prefix}${[...menuTags].join(`\n${middle + pointer}${prefix}`)}\n${bottom}\n`;
      }
      return `${menu_all}`;
   } else if (type === 3) {      
      let sections = [];
      await readFiles3(dir);
      async function readFiles3(dir) {
      let files = await fs.promises.readdir(dir);
      for (let file of files) {
         let filePath = path.join(dir, file);
         let stat = await fs.promises.stat(filePath);
         if (stat.isDirectory()) {
            await readFiles3(filePath);
         } else if (stat.isFile() && file.endsWith('.js')) {
            const plugin = await require(filePath); // load the plugin
            if (plugin.default) { // check if there's a default export
               let {
                  names,
                  tags,
                  limit,
                  premium
               } = plugin.default;

               if (Array.isArray(names)) {
                  for (const name of names) {
                     if (!menus.has(name)) {
                        menus.set(name, new Set()); // Use a Set to avoid duplicates
                     }
                     // Add tags to the menu
                     if (Array.isArray(tags)) {
                        for (let tag of tags) {
                           let modifiedTag = tag;
                           if (premium) {
                              modifiedTag += ` ${logo_premium || 'Ⓟ'}`; // tambah simbol premium
                           } else if (limit) {
                              modifiedTag += ` ${logo_limit || 'Ⓛ'}`; // tambah simbol limit
                           }
                           menus.get(name).add(modifiedTag); // add modified tags to the menu
                        }
                     }
                     // Tambahkan ke sections (format id)
                     let formattedName = bigHeader ? name.toUpperCase() : name;
                     // Pastikan tidak menambahkan duplicate ke sections
                     if (!sections.some(section => section.title === formattedName)) {
                        sections.push({
                           title: formattedName,
                           id: `${prefix}menu ${name.toLowerCase()}`, // Format id
                        });
                     }
                  }
               }
            }
         }
      }
   }

   // Menambahkan menu "all" di atas kategori lainnya
   sections.unshift({
      title: 'All Menu',
      id: `${prefix}menu all`
   });

   // Prepare listMessage
   let message = {
      title: select || 'Select Here',
      sections: [{
         title: header_sub || 'List Menu',
         rows: sections
      }]
   };
   const printSubMenu = (text) => {
      if (text === 'all') {
         let menu_all = '';
         for (let [menuName, menuTags] of menus) {
            let _mn = bigHeader ? menuName.toUpperCase() : menuName;
            let mn = ` *${_mn}* `;
            menu_all += `${header}${le}${mn}${ri}\n`;
            menu_all += `${middle + pointer}${prefix}${[...menuTags].join(`\n${middle + pointer}${prefix}`)}\n${bottom}\n`;
         }
         return `${menu_all}`;
      } else {
         // Tambahkan menu "all" di atas menu lainnya
         let formattedMenus = [`${middle}${pointer}${prefix}menu all`]; // Menambahkan MENU ALL
         formattedMenus.push(...[...menus].map(([name]) => {
            return `${middle}${pointer}${prefix}menu ${name.toLowerCase()}`;
         }));

         // Jika text tidak diberikan, kembalikan semua submenu
         if (!text || text === 'menu') return `${header + le} *${header_sub}* ${ri}\n${formattedMenus.join('\n')}\n${bottom}`;

         // Cari menu yang cocok
         let matchedMenus = [...menus].filter(([name]) => name.toLowerCase().includes(text.toLowerCase()));
         if (matchedMenus.length > 0) {
            let res = `${header}${le} *${text.toUpperCase()}* ${ri}\n`;
            matchedMenus.forEach(([menuName, menuTags]) => {
               let formattedMenuName = bigHeader ? menuName.toUpperCase() : menuName;

               // Ubah bagian ini untuk menambahkan middle, pointer, dan prefix pada menuTags
               let formattedTags = [...menuTags].map(tag => `${middle}${pointer}${prefix}${tag}`);
               res += `${formattedTags.join('\n')}\n`;
            });
            res += bottom // + '\n';
            return res;
         }
      }
      // Jika tidak ada menu yang cocok
      let no_menu = `menu ${text} tidak ditemukan. Silakan coba lagi❗\n\n`;
      no_menu += `${text} menu not found.\nPlease try again❗`;
      return no_menu;
   };
   let result = await printSubMenu(text);
   let menu = await result.replace(/['‘’]+/g, '');
   // Mengembalikan listMessage
   return {
      menu,
      message
   }
   }
}
//###
async function command_plugins() {
   const pluginsDir = path.join(__dirname, '../../../plugins');
   let commands = [];

   // Fungsi rekursif untuk membaca seluruh file di folder plugins dan sub-foldernya
   const readPlugins = async (dir) => {
      const files = fs.readdirSync(dir);

      // Gunakan Promise.all untuk menangani file yang dibaca secara asinkron
      const promises = files.map(async (file) => {
         const filePath = path.join(dir, file);
         const stat = fs.statSync(filePath);

         if (stat.isDirectory()) {
            // Jika folder, lakukan rekursif
            return readPlugins(filePath);
         } else if (filePath.endsWith('.js')) {
            // Jika file JavaScript, import modulnya
            const plugins = await require(filePath)
            const plugin = plugins.default;
            if (plugin) {
               let cmd = plugin.command
               // Gabungkan array command dari file plugin
               commands = commands.concat(cmd);
              // console.log(commands)
            }
         }
      });

      await Promise.all(promises);
   };

   await readPlugins(pluginsDir);
   return commands;
};
function levenshteinDistance(str1, str2) {
   const track = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

   for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
   }
   for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
   }

   for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
         const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
         track[j][i] = Math.min(
            track[j][i - 1] + 1, // deletion
            track[j - 1][i] + 1, // insertion
            track[j - 1][i - 1] + indicator, // substitution
         );
      }
   }

   return track[str2.length][str1.length];
};
function command_mean(inputCommand, availableCommands) {
   let closestCommand = null;
   let closestDistance = Infinity;

   availableCommands.forEach((command) => {
      const distance = levenshteinDistance(inputCommand, command);
      if (distance < closestDistance) {
         closestDistance = distance;
         closestCommand = command;
      }
   });
   // Beri saran jika jarak di bawah ambang batas (misal 3)
   return closestDistance <= 3 ? closestCommand : null;
}
      
//PING      
async function System () {
var ses = () => {
  return new Promise(async (resolve, reject) => {
      await exec('du -h sessions', (err, out) => {   
         resolve(out)   
      })
   })
}
var sessions = await ses().then((v) => {
   return v.replace('sessions', '').trim() + 'B' || ''
})


      var _muptime;
      if (process.send) {
         process.send('uptime');
         _muptime = await new Promise(resolve => {
            process.once('message', resolve);
            setTimeout(resolve, 1000);
         }) * 1000;
      }
      var muptime = clockString(_muptime);
      var muptimee = seconds(process.uptime());
      var formatp = sizeFormatter({
         std: 'JEDEC',
         decimalPlaces: 2,
         keepTrailingZeroes: false,
         render: (literal, symbol) => `${literal} ${symbol}B`,
      });
      var used = process.memoryUsage();
      var cpus = os.cpus().map(cpu => {
         cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
         return cpu;
      });
      var cpu = cpus.reduce((last, cpu, _, {
         length
      }) => {
         last.total += cpu.total;
         last.speed += cpu.speed / length;
         last.times.user += cpu.times.user;
         last.times.nice += cpu.times.nice;
         last.times.sys += cpu.times.sys;
         last.times.idle += cpu.times.idle;
         last.times.irq += cpu.times.irq;
         return last;
      }, {
         speed: 0,
         total: 0,
         times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
         }
      });
      var timestamp = speed();
      var latensi = speed() - timestamp;
      var neww = performance.now();
      var oldd = performance.now();
      var response = `
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${formatp(used[key])}`).join('\n')}
${cpus[0] ? `
_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')} _CPU Core(s) Usage (${cpus.length} Core CPU)_ ${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
    `.trim();
   return {
      response,
      latensi,
      neww,
      oldd,
      muptime,
      sessions
   }
}

function clockString(ms) {
   let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
   let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
   let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
   let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
   return [`${d}`, ' Hari ☀\n', `${h}`, ' Jam ⏰\n', `${m}`, ' Menit 🕰\n', `${s}`, ' Detik ⏳\n'].map(v => v.toString().padStart(2, 0)).join('')
}

function seconds(seconds) {
   seconds = Number(seconds);
   var d = Math.floor(seconds / (3600 * 24));
   var h = Math.floor(seconds % (3600 * 24) / 3600);
   var m = Math.floor(seconds % 3600 / 60);
   var s = Math.floor(seconds % 60);
   var dDisplay = d > 0 ? d + (d == 1 ? " Hari " : " Hari ") : "";
   var hDisplay = h > 0 ? h + (h == 1 ? " Jam " : " Jam ") : "";
   var mDisplay = m > 0 ? m + (m == 1 ? " Menit " : " Menit ") : "";
   var sDisplay = s > 0 ? s + (s == 1 ? " Detik " : " Detik ") : "";
   return dDisplay + hDisplay + mDisplay + sDisplay;
}
//ai


function generateRandomIP() {
    const octet = () => Math.floor(Math.random() * 254);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
}
/*
async function GPT(o) {
 try {
   const endpoint = `https://api.cafirexos.com/api/chatgpt?text=${o}`;
   const res = await fetch(endpoint, {
        headers: {
            "X-Forwarded-For": generateRandomIP(),
            'Custom-Port': '443'
        }
    });
   const data = await res.json();
   const p = data.resultado
   return p
 } catch {
   throw 'Response Failed!'
  }
}
*/
function getTotalJsFiles(dir) {
    let totalJsFiles = 0;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            totalJsFiles += getTotalJsFiles(filePath);
        } else if (file.endsWith('.js')) {
            totalJsFiles++;
        }
    });

    return totalJsFiles;
}

async function totalFitur() {
    const dirPath = './plugins'; // Ganti dengan path folder plugins Anda

    const totalJsFiles = await getTotalJsFiles(dirPath);

    return totalJsFiles;
}


//############

function Logger (m, { conn, colors, time, chalk, pushname, groupName, body }) {
   conn.sendPresenceUpdate('unavailable', m.chat);
   //typing group
   if (setting.typing_group && m.isGroup) conn.sendPresenceUpdate('composing', m.chat);
   //typing group      
   if (setting.typing_private && !m.isGroup) conn.sendPresenceUpdate('composing', m.chat);
  
   //recordinggroup   
   if (setting.recording_group && m.isGroup) conn.sendPresenceUpdate('recording', m.chat);   
   //recordingprivate  
   if (setting.recording_private && !m.isGroup) conn.sendPresenceUpdate('recording', m.chat);   
      
   //readGroup
   if (setting.read_group && m.isGroup) conn.readMessages([m.key])
   //readPrivats
   if (setting.read_private && !m.isGroup) conn.readMessages([m.key])
   
   let gambar = m.mtype === 'imageMessage';
   let stiker = m.mtype === 'stickerMessage';
   let audio = m.mtype === 'audioMessage';
   let video = m.mtype === 'videoMessage';
   let doc = m.mtype === 'documentMessage';
   if (m.isGroup) {
      console.log(colors.green.bold("Group") + colors.yellow.bold(` ${time}`) + " - " + chalk.yellowBright(`${m.chat}`));
      console.log(chalk.black.bgWhite(`${groupName}`));
      console.log(chalk.white.bgBlue(pushname.trim()) + " - " + chalk.yellowBright(`${m.sender.split('@')[0]}`));      
      console.log(chalk.white.bold(body));      
      if (gambar || audio || stiker || video || doc ) {                  
         console.log(chalk.white.bold(`${gambar ? "Image Message 📸 " : ''}${audio && gambar ? ', ' : ''}${audio ? "Audio Message 🎤" : ''}${(gambar || audio) && stiker ? ', ' : ''}${stiker ? "Sticker Message 🎨 " : ''}${(gambar || audio || stiker) && video ? ', ' : ''}${video ? "Video Message 📽 " : ''}${(gambar || audio || stiker || video) && doc ? ', ' : ''}${doc ? "Dokumen Message 📑 " : ''}`));
      };
   } else if (!m.isGroup) {
      console.log(colors.green.bold("Private") + colors.yellow.bold(` ${time} `))//+ ` ${colors.blue(m.chat.split('@')[0])}`)
      console.log(chalk.black.bgBlue(`${pushname.trim()}`) + " - " +  chalk.yellowBright(`${m.chat.split('@')[0]}`))//+ colors.white(" [") + colors.blue(`+${m.chat.split('@')[0]}`) + colors.white("]"));      
      console.log(chalk.white.bold(body));
      if (gambar || audio || stiker || video || doc) {
         console.log(chalk.white.bold(`${gambar ? "Image Message 📸 " : ''}${audio && gambar ? ', ' : ''}${audio ? "Audio Message 🎤" : ''}${(gambar || audio) && stiker ? ', ' : ''}${stiker ? "Sticker Message 🎨 " : ''}${(gambar || audio || stiker) && video ? ', ' : ''}${video ? "Video Message 📽 " : ''}${(gambar || audio || stiker || video) && doc ? ', ' : ''}${doc ? "Dokumen Message 📑 " : ''}`));
      };
   }
}

const scraper = {
     attp: async (text) => {
        return await (await fetch(`https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=world-cup-2014-logo&doScale=true&type=Pattern&scaleWidth=500&scaleHeight=350&fontname=bangers&backgroundColor=%23000000&text=${text}`)).buffer();
     }
}
//####
module.exports = {
   command_plugins,
   command_mean,
   Logger,
   toAudio,
   mp3,
   mp3Play,
   mp3v2,
   toVideo,
   bytesToSize,
   sleep,
   makeid,
   getBuffer,
   _axios,
   totalFitur,
   getRandom,
   streamFile,
   upload,
   upload2,
   webp2mp4File,
   gdrive,   
   HD,
   HD2,
   statistic,
   Plugins,
   Menu,
   System,
   scraper
   //gpt3,
  // GPT
   //AI,
   //attp,
}

