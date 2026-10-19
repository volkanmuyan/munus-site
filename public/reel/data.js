/* ===== Content for /reel and /reel/<slug>: edit here =====
   WORK: one entry per project. Its page lives at /reel/<slug>.
     title, line (one sentence), client (agency or institution), year, by (who from munus), role, tags,
     media: an image ("/work/01.webp") or a video ("/work/01.mp4"); empty shows a placeholder,
     brief / idea / result: a short paragraph each,
     stats: a few numbers from the result, e.g. {n:'2.4M',label:'views'},
     gallery: more images or videos, same rules as media (empty strings show placeholders),
     credits: who did what.
   Text in [square brackets] is a placeholder. */
var NUMBERS=[
  {n:0,suffix:'+',label:'years of experience, combined'},  // TODO
  {n:0,suffix:'+',label:'projects delivered'},              // TODO
  {n:0,suffix:'',label:'agencies and institutions'}         // TODO
];

function placeholderProject(n,tag){
  return {
    slug:'project-0'+n,title:'Project name',line:'One sentence on the idea, and what changed because of it.',
    client:'Agency or institution',year:'20XX',by:'Name Surname',role:'Role on the project',tags:[tag],media:'',
    brief:'[The brief] What the client needed, and why it mattered. Two or three sentences are enough.',
    idea:'[The idea] The thinking behind the work: the insight, the concept and how it came to life.',
    result:'[The result] What happened next. Numbers, coverage, awards, or what changed for the client.',
    stats:[{n:'00',label:'[result]'},{n:'00',label:'[result]'},{n:'00',label:'[result]'}],
    gallery:['','','',''],
    credits:[{name:'Name Surname',role:'Role'},{name:'Name Surname',role:'Role'}]
  };
}
var WORK=[
  placeholderProject(1,'brand & marketing'),
  placeholderProject(2,'creative & content'),
  placeholderProject(3,'events & experiences'),
  placeholderProject(4,'corporate & public affairs'),
  placeholderProject(5,'intelligence & research'),
  placeholderProject(6,'advisory')
];

/* Logos are white-on-transparent files in /logos, shown in one colour. h: optical height in px. */
var PLACES=[
  {name:'Oracle',logo:'/logos/oracle.svg',h:22},
  {name:'Koç',logo:'/logos/koc.png',h:46},
  {name:'TikTok',logo:'/logos/tiktok.svg',h:34},
  {name:'Uludağ Enerji',logo:'/logos/uludag-enerji.png',h:42},
  {name:'Astor',logo:'/logos/astor.png',h:34},
  {name:'TÜREB',logo:'/logos/tureb.png',h:46,label:'TÜREB'},
  {name:'TÜREK',logo:'/logos/turek.svg',h:48},
  {name:'ALÇIDER',logo:'/logos/alcider.png',h:44},
  {name:'ELDER',logo:'/logos/elder.svg',h:44}
];

var PEOPLE=[
  {name:'Name Surname',role:'brand & marketing',prev:'Previously: Role at Organisation',yrs:'00 yrs',img:'/team/01.webp'},
  {name:'Name Surname',role:'creative & content',prev:'Previously: Role at Organisation',yrs:'00 yrs',img:'/team/02.webp'},
  {name:'Name Surname',role:'corporate & public affairs',prev:'Previously: Role at Organisation',yrs:'00 yrs',img:'/team/03.webp'},
  {name:'Name Surname',role:'intelligence & research',prev:'Previously: Role at Organisation',yrs:'00 yrs',img:'/team/04.webp'}
];
/* ===== end of content ===== */
