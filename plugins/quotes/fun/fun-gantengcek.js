exports.default = {
   names: ['Fun'],
   tags: ['ganteng', 'gantengcek'],
   command: ['ganteng', 'gantengcek'],
   start: async (m, {
      conn
   }) => {      
      conn.reply(m.chat, `${pickRandom(ganteng)}`, m);
   }
};
const ganteng = [
   "📮Ganteng Level : 4%\n\nINI MUKA ATAU SAMPAH?!",
   "📮Ganteng Level : 7%\n\nSerius ya Bro,, Lu ampir mirip kayak Monyet!",
   "📮Ganteng Level : 12%\n\nMakin lama liat muka lo gw bisa muntah!",
   "📮Ganteng Level : 22%\n\nMungkin karna lo sering liat berbuat maksiat😂",
   "📮Ganteng Level : 27%\n\nKeknya bakal susah dapet jodoh lu,, berdoa aja",
   "📮Ganteng Level : 35%\n\nYang sabar ya ayang",
   "📮Ganteng Level : 41%\n\nSemoga diberkati mendapat jodoh",
   "📮Ganteng Level : 48%\n\nDijamin cewek susah deketin lo",
   "📮Ganteng Level : 56%\n\nLu Setengah Ganteng :v",
   "📮Ganteng Level : 64%\n\nCukuplah",
   "📮Ganteng Level : 71%\n\nLumayan Ganteng juga lu ya",
   "📮Ganteng Level : 1%\n\nAWOAKAK BURIQQQ!!!",
   "📮Ganteng Level : 1%\n\nAWOAKAK BURIQQQ!!!",
   "📮Ganteng Level : 3%\n\nAWOAKAK MENDKATI BURIQQQ!!!",
   "📮Ganteng Level : 1%\n\nAWOAKAK BURIQQQ!!!",
   "📮Ganteng Level : 77%\n\nGak akan Salah Lagi dah Om",
   "📮Ganteng Level : 83%\n\nDijamin Cewek gak akan kecewa Om",
   "📮Ganteng Level : 89%\n\nCewek2 pasti bakalan pingsan klo ngeliat lo!",
   "📮Ganteng Level : 94%\n\nAARRGGHHH!!!",
   "📮Ganteng Level : 100%\n\nLU EMANG COWOK TERGANTENG, KAYA PACARNYA ELAINA"
]