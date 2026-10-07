const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const screens = { title:'#titleScreen', creator:'#creatorScreen', draw:'#drawScreen', game:'#gameScreen' };
function show(k){ $$('.screen').forEach(x=>x.classList.remove('active')); $(screens[k]).classList.add('active'); }

$('#startBtn').onclick = ()=>show('creator');
$$('[data-back]').forEach(b=> b.onclick = ()=> show(b.dataset.back));

const cats = ['body','skin','face','eyes','brows','mouth','ears','hair','hat','armor','boots','weapon'];
const data = {
  body:[
    ['Compact','compact','#59637d'],['Lean','lean','#5e6880'],['Athletic','athletic','#59637d'],['Broad','broad','#59637d'],['Tall','tall','#59637d'],['Titan','titan','#59637d']
  ],
  skin:[
    ['Warm','#e4a17a'],['Light','#f0c3a7'],['Deep','#8b533d'],['Dark','#563429'],['Ash','#aaa7a5'],['Lava','#e8623a'],['Moon','#f4efe9'],['Olive','#c59a73']
  ],
  face:[
    ['Soft','soft','#eee'],['Sharp','sharp','#eee'],['Round','round','#eee'],['Hero','hero','#eee'],['Demon','demon','#eee'],['Heart','heart','#eee'],['Mask','mask','#eee']
  ],
  eyes:[
    ['Classic','classic','#3ca6ff'],['Big Blue','big','#2d86ff'],['Fierce Red','fierce','#ff3f52'],['Gold Cat','cat','#ffd83e'],['Emerald','classic','#68e26a'],['Void','void','#2c2541'],['Sleepy','sleepy','#7fb7ff'],['Anime Pink','big','#ff6fe8']
  ],
  brows:[
    ['Soft','soft','#4b2418'],['Straight','straight','#442015'],['Fierce','fierce','#442015'],['Arched','arched','#442015'],['Thick','thick','#2f180f'],['Sleepy','sleepy','#442015'],['Villain','villain','#2d130c']
  ],
  mouth:[
    ['Smile','smile','#7d342f'],['Smirk','smirk','#7d342f'],['Flat','flat','#7d342f'],['Open','open','#9b2d30'],['Fang','fang','#8b2c2c'],['Tiny','tiny','#7d342f'],['Grim','grim','#7d342f']
  ],
  ears:[
    ['Human','human','#eee'],['Pointed','pointed','#eee'],['Elf','elf','#eee'],['Round','round','#eee'],['Demon','demon','#eee'],['Fin','fin','#eee'],['Hidden','hidden','#eee']
  ],
  hair:[
    ['None','none','#20212d'],['Spiky','spiky','#1f2230'],['Wild','wild','#ff5b27'],['Long','long','#202338'],['Mohawk','mohawk','#6c4cff'],['Flame','flame','#ff7b22'],['White','cap','#eee'],['Blue','cap','#1f6fff'],['Bob','bob','#30243e'],['Twin Tails','twins','#da4b78'],['Crown Braid','braid','#a77b2b']
  ],
  hat:[
    ['None','none','#222'],['Headband','headband','#e33'],['Crown','crown','#ffd23f'],['Horns','horns','#3a2117'],['Tech Halo','halo','#58f3ff'],['Hood','hood','#2b243b'],['Cap','cap','#274969'],['Oni Mask','oni','#d8433e']
  ],
  armor:[
    ['Street','street','#39475d'],['Samurai','samurai','#a5332e'],['Tech','tech','#275d70'],['Bone','bone','#d8d0b8'],['Lava','lava','#7f2d1c'],['Royal','royal','#593b7b'],['Hunter','hunter','#4a5130'],['Coat','coat','#243042'],['Mech','mech','#57606b']
  ],
  boots:[
    ['Combat','combat','#202331'],['Stompers','stomp','#592819'],['Rockets','rocket','#2d5970'],['Claws','claw','#473226'],['Anime','anime','#7a2b30'],['Runners','run','#4b5870'],['Hooves','hoof','#51362b']
  ],
  weapon:[
    ['Sword','sword','#dfe5ee'],['Axe','axe','#cfd7df'],['Hammer','hammer','#6f7581'],['Spear','spear','#d4dbe5'],['Katana','katana','#dce8f8'],['Blaster','blaster','#43e4ff'],['Scythe','scythe','#c9d3dd'],['Claws','claws','#f0ede8']
  ]
};

let sel = {body:2,skin:0,face:3,eyes:0,brows:0,mouth:0,ears:0,hair:0,hat:0,armor:2,boots:0,weapon:0}, cat='body';
const catsEl = $('#cats');

cats.forEach(c=>{
  let b = document.createElement('button');
  b.textContent = c.toUpperCase();
  b.onclick = ()=>{ cat=c; renderOpts(); };
  catsEl.appendChild(b);
});

function itemName(x){ return x[0]; }
function itemVal(x){ return x[1]; }
function itemColor(x){ return x[2] || x[1]; }

function renderOpts(){
  [...catsEl.children].forEach((b,i)=> b.classList.toggle('active', cats[i]===cat));
  $('#optionTitle').textContent = cat.toUpperCase();
  let q = $('#search').value.toLowerCase();
  let g = $('#optionGrid');
  g.innerHTML = '';
  data[cat].forEach((o,i)=>{
    if(!itemName(o).toLowerCase().includes(q)) return;
    let b = document.createElement('button');
    b.className = 'opt' + (sel[cat]===i ? ' active' : '');
    b.innerHTML = `<div class="swatch" style="background:${itemColor(o)}"></div><b>${itemName(o)}</b><small>${cat}</small>`;
    b.onclick = ()=>{ sel[cat]=i; renderOpts(); renderAvatar(); };
    g.appendChild(b);
  });
}
$('#search').oninput = renderOpts;

function setMany(selector, obj){ $$(selector).forEach(el => Object.assign(el.style,obj)); }
function resetHair(){
  const hb=$('#hairBack'), hf=$('#hairFront');
  Object.assign(hb.style,{display:'block',left:'49px',top:'37px',width:'122px',height:'145px',borderRadius:'50% 50% 40% 40%',clipPath:'none'});
  Object.assign(hf.style,{display:'block',left:'55px',top:'41px',width:'112px',height:'60px',clipPath:'polygon(0 0,100% 0,92% 65%,75% 38%,61% 74%,47% 41%,30% 76%,17% 44%,0 71%)',borderRadius:'0'});
}
function resetHat(){
  Object.assign($('#hat').style,{background:'transparent',border:'0',borderRadius:'0',clipPath:'none',height:'45px',top:'13px',left:'47px',width:'126px',display:'block',boxShadow:'none'});
}
function renderWeaponPreview(type){
  const pw = $('#previewWeapon');
  const hw = $('#heldWeapon');
  Object.assign(pw.style,{display:'block',width:'20px',height:'155px',background:'linear-gradient(90deg,#777,#f4f4f4,#999)',borderRadius:'10px',transform:'rotate(18deg)',clipPath:'none'});
  Object.assign(hw.style,{width:'28px',height:'210px',background:'linear-gradient(90deg,#777,#f4f4f4,#999)',borderRadius:'10px',clipPath:'none'});

  if(type==='axe'){
    pw.style.width='24px'; pw.style.background='#7c6240';
    pw.style.boxShadow='inset 0 0 0 999px rgba(0,0,0,0)';
    pw.style.clipPath='polygon(40% 0,60% 0,60% 62%,100% 62%,100% 78%,60% 78%,60% 100%,40% 100%,40% 78%,0 78%,0 62%,40% 62%)';
    hw.style.width='32px'; hw.style.background='#7c6240'; hw.style.clipPath='polygon(40% 0,60% 0,60% 62%,100% 62%,100% 78%,60% 78%,60% 100%,40% 100%,40% 78%,0 78%,0 62%,40% 62%)';
  }else if(type==='hammer'){
    pw.style.width='34px'; pw.style.background='#6f7581'; pw.style.clipPath='polygon(20% 0,80% 0,80% 23%,58% 23%,58% 100%,42% 100%,42% 23%,20% 23%)';
    hw.style.width='44px'; hw.style.background='#6f7581'; hw.style.clipPath='polygon(20% 0,80% 0,80% 23%,58% 23%,58% 100%,42% 100%,42% 23%,20% 23%)';
  }else if(type==='spear'){
    pw.style.width='14px'; pw.style.background='linear-gradient(90deg,#916636,#f0e0b8,#916636)'; pw.style.clipPath='polygon(50% 0,100% 12%,60% 23%,60% 100%,40% 100%,40% 23%,0 12%)';
    hw.style.width='16px'; hw.style.background='linear-gradient(90deg,#916636,#f0e0b8,#916636)'; hw.style.clipPath='polygon(50% 0,100% 12%,60% 23%,60% 100%,40% 100%,40% 23%,0 12%)';
  }else if(type==='katana'){
    pw.style.width='16px'; pw.style.background='linear-gradient(90deg,#1f1f1f,#fefefe,#a8b7cf)'; pw.style.clipPath='polygon(45% 0,100% 8%,56% 100%,44% 100%,0 8%)';
    hw.style.width='20px'; hw.style.background='linear-gradient(90deg,#1f1f1f,#fefefe,#a8b7cf)'; hw.style.clipPath='polygon(45% 0,100% 8%,56% 100%,44% 100%,0 8%)';
  }else if(type==='blaster'){
    pw.style.width='34px'; pw.style.background='#43e4ff'; pw.style.clipPath='polygon(0 18%,75% 18%,75% 0,100% 0,100% 34%,75% 34%,75% 72%,48% 72%,48% 100%,24% 100%,24% 72%,0 72%)';
    hw.style.width='48px'; hw.style.background='#43e4ff'; hw.style.clipPath='polygon(0 18%,75% 18%,75% 0,100% 0,100% 34%,75% 34%,75% 72%,48% 72%,48% 100%,24% 100%,24% 72%,0 72%)';
  }else if(type==='scythe'){
    pw.style.width='26px'; pw.style.background='linear-gradient(90deg,#7a562d,#cfdae2,#7a562d)'; pw.style.clipPath='polygon(46% 0,60% 0,60% 74%,100% 74%,82% 48%,100% 22%,54% 22%,54% 100%,46% 100%)';
    hw.style.width='34px'; hw.style.background='linear-gradient(90deg,#7a562d,#cfdae2,#7a562d)'; hw.style.clipPath='polygon(46% 0,60% 0,60% 74%,100% 74%,82% 48%,100% 22%,54% 22%,54% 100%,46% 100%)';
  }else if(type==='claws'){
    pw.style.width='38px'; pw.style.height='90px'; pw.style.top='220px'; pw.style.background='#eee'; pw.style.clipPath='polygon(0 100%,15% 35%,30% 100%,40% 20%,50% 100%,60% 20%,70% 100%,85% 35%,100% 100%,100% 100%,0 100%)';
    hw.style.width='62px'; hw.style.height='120px'; hw.style.background='#eee'; hw.style.clipPath='polygon(0 100%,15% 35%,30% 100%,40% 20%,50% 100%,60% 20%,70% 100%,85% 35%,100% 100%,100% 100%,0 100%)';
  }else{
    pw.style.top='175px'; hw.style.height='210px';
  }
}

function renderAvatar(){
  const skin = itemVal(data.skin[sel.skin]);
  const hairColor = itemColor(data.hair[sel.hair]);
  const armorColor = itemColor(data.armor[sel.armor]);
  const bootsColor = itemColor(data.boots[sel.boots]);

  setMany('.face,.ear,.neck,.arm', {background: skin});
  $('#hairBack').style.background = $('#hairFront').style.background = hairColor;
  $('#torso').style.background = armorColor;
  setMany('.boot', {background: bootsColor});

  // face shape
  const face = $('#face');
  const fv = itemVal(data.face[sel.face]);
  Object.assign(face.style,{borderRadius:'48% 48% 46% 46%', clipPath:'none', width:'94px', height:'112px', left:'63px'});
  if(fv==='round') face.style.borderRadius='50%';
  if(fv==='sharp') face.style.clipPath='polygon(50% 0,90% 12%,100% 62%,72% 100%,28% 100%,0 62%,10% 12%)';
  if(fv==='hero') face.style.clipPath='polygon(18% 0,82% 0,100% 28%,88% 100%,12% 100%,0 28%)';
  if(fv==='demon') face.style.clipPath='polygon(25% 0,75% 0,100% 22%,88% 100%,12% 100%,0 22%)'; face.style.borderRadius='12px';
  if(fv==='heart') face.style.clipPath='polygon(50% 0,93% 16%,100% 54%,79% 100%,21% 100%,0 54%,7% 16%)';
  if(fv==='mask'){ face.style.borderRadius='18px'; face.style.boxShadow='inset 0 0 0 6px rgba(255,255,255,.14)'; } else { face.style.boxShadow='none'; }

  // eyes
  const ev = itemVal(data.eyes[sel.eyes]);
  const eyeColor = itemColor(data.eyes[sel.eyes]);
  $$('.eye').forEach((el,i)=>{
    Object.assign(el.style,{top:'40px',width:'27px',height:'13px',borderRadius:'50%',transform:'none',background:'white'});
    const pup = el.querySelector('i');
    Object.assign(pup.style,{width:'10px',height:'10px',background:eyeColor,left:'7px',top:'0',borderRadius:'50%'});
    if(ev==='big'){ Object.assign(el.style,{top:'34px',width:'30px',height:'18px'}); Object.assign(pup.style,{width:'12px',height:'12px',left:'8px',top:'2px'}); }
    if(ev==='fierce'){ Object.assign(el.style,{height:'11px',transform:i===0?'rotate(-8deg)':'rotate(8deg)'}); }
    if(ev==='cat'){ Object.assign(el.style,{height:'16px'}); Object.assign(pup.style,{width:'7px',height:'12px',borderRadius:'45%',left:'10px'}); }
    if(ev==='void'){ Object.assign(el.style,{background:'#d9d3f7'}); Object.assign(pup.style,{width:'12px',height:'12px',background:'#130f1d',left:'7px'}); }
    if(ev==='sleepy'){ Object.assign(el.style,{height:'9px',top:'43px'}); Object.assign(pup.style,{width:'8px',height:'8px',top:'-1px'}); }
  });

  // brows
  const bv = itemVal(data.brows[sel.brows]);
  const bColor = itemColor(data.brows[sel.brows]);
  $$('.brow').forEach((el,i)=>{
    Object.assign(el.style,{background:bColor,width:'28px',height:'4px',top:'28px',borderRadius:'8px'});
    let t = i===0?'rotate(-7deg)':'rotate(7deg)';
    if(bv==='straight') t='none';
    if(bv==='fierce') t=i===0?'rotate(-18deg)':'rotate(18deg)';
    if(bv==='arched') t=i===0?'rotate(8deg) translateY(-3px)':'rotate(-8deg) translateY(-3px)';
    if(bv==='thick') el.style.height='6px';
    if(bv==='sleepy'){ t='none'; el.style.top='32px'; }
    if(bv==='villain'){ t=i===0?'rotate(18deg)':'rotate(-18deg)'; el.style.top='26px'; }
    el.style.transform = t;
  });

  // mouth
  const mv = itemVal(data.mouth[sel.mouth]);
  const mouth = $('.mouth');
  Object.assign(mouth.style,{left:'32px',bottom:'18px',width:'31px',height:'7px',borderBottom:`3px solid ${itemColor(data.mouth[sel.mouth])}`,borderRadius:'50%',background:'transparent',clipPath:'none'});
  if(mv==='smirk'){ mouth.style.width='24px'; mouth.style.left='40px'; }
  if(mv==='flat'){ mouth.style.borderBottom='0'; mouth.style.height='0'; mouth.style.borderTop=`3px solid ${itemColor(data.mouth[sel.mouth])}`; }
  if(mv==='open'){ mouth.style.width='22px'; mouth.style.height='12px'; mouth.style.left='36px'; mouth.style.borderBottom='0'; mouth.style.background=itemColor(data.mouth[sel.mouth]); mouth.style.borderRadius='0 0 12px 12px'; }
  if(mv==='fang'){ mouth.style.width='24px'; mouth.style.left='37px'; mouth.style.borderBottom=`4px solid ${itemColor(data.mouth[sel.mouth])}`; mouth.style.boxShadow='inset -4px -2px 0 0 #fff'; }
  if(mv==='tiny'){ mouth.style.width='16px'; mouth.style.left='40px'; }
  if(mv==='grim'){ mouth.style.borderBottom='0'; mouth.style.borderTop=`3px solid ${itemColor(data.mouth[sel.mouth])}`; mouth.style.borderRadius='0'; mouth.style.width='28px'; }
  if(['smile','smirk','tiny'].includes(mv)) mouth.style.boxShadow='none';

  // ears
  const ear = itemVal(data.ears[sel.ears]);
  $$('.ear').forEach(x=>{
    Object.assign(x.style,{display:'block',width:'18px',height:'31px',top:'92px',borderRadius:'50%',transform:'none'});
    if(ear==='pointed'){ x.style.width='19px'; x.style.height='34px'; x.style.borderRadius='60% 0 60% 60%'; x.style.transform = x.classList.contains('l')?'rotate(-25deg)':'rotate(25deg)'; }
    if(ear==='elf'){ x.style.width='16px'; x.style.height='36px'; x.style.borderRadius='65% 5% 65% 65%'; x.style.transform = x.classList.contains('l')?'rotate(-35deg)':'rotate(35deg)'; }
    if(ear==='round'){ x.style.width='22px'; x.style.height='22px'; x.style.top='100px'; }
    if(ear==='demon'){ x.style.width='14px'; x.style.height='38px'; x.style.borderRadius='0 0 80% 80%'; x.style.transform = x.classList.contains('l')?'rotate(-50deg)':'rotate(50deg)'; }
    if(ear==='fin'){ x.style.width='26px'; x.style.height='18px'; x.style.top='102px'; x.style.borderRadius='70% 20% 70% 20%'; }
    if(ear==='hidden'){ x.style.display='none'; }
  });

  // hair
  resetHair();
  const hv = itemVal(data.hair[sel.hair]);
  const hb = $('#hairBack'), hf = $('#hairFront');
  if(hv==='none'){ hb.style.display='none'; hf.style.display='none'; }
  else if(hv==='long'){
    Object.assign(hb.style,{height:'188px',top:'30px',borderRadius:'48% 48% 34% 34%'});
    hf.style.clipPath='polygon(0 0,100% 0,100% 25%,82% 34%,74% 100%,52% 52%,30% 100%,20% 32%,0 22%)';
  }else if(hv==='mohawk'){
    hb.style.display='none';
    Object.assign(hf.style,{left:'90px',top:'20px',width:'34px',height:'98px',clipPath:'polygon(35% 0,65% 0,100% 100%,0 100%)'});
  }else if(hv==='wild'){
    hf.style.clipPath='polygon(0 55%,12% 8%,28% 40%,43% 0,56% 42%,76% 5%,100% 58%,87% 100%,10% 100%)';
  }else if(hv==='flame'){
    hf.style.clipPath='polygon(0 100%,8% 52%,18% 72%,30% 18%,44% 58%,56% 0,68% 60%,82% 20%,100% 78%,100% 100%)';
  }else if(hv==='cap'){
    Object.assign(hb.style,{height:'118px',top:'44px'}); hf.style.clipPath='polygon(0 0,100% 0,100% 40%,0 40%)';
  }else if(hv==='bob'){
    Object.assign(hb.style,{height:'132px',top:'46px',borderRadius:'40% 40% 24% 24%'}); hf.style.clipPath='polygon(0 0,100% 0,100% 34%,76% 44%,58% 30%,44% 44%,28% 32%,0 44%)';
  }else if(hv==='twins'){
    Object.assign(hb.style,{height:'132px',top:'42px'});
    hf.style.clipPath='polygon(0 0,100% 0,94% 52%,74% 34%,58% 60%,42% 32%,22% 58%,8% 38%)';
    hb.style.boxShadow='-34px 30px 0 -12px '+hairColor+', 34px 30px 0 -12px '+hairColor;
  }else if(hv==='braid'){
    Object.assign(hb.style,{height:'138px',top:'36px',borderRadius:'50% 50% 30% 30%'});
    hf.style.clipPath='polygon(0 12%,100% 12%,100% 44%,72% 44%,58% 80%,42% 44%,0 44%)';
  }
  if(hv!=='twins') hb.style.boxShadow='none';

  // hat
  resetHat();
  const hat = itemVal(data.hat[sel.hat]);
  const h = $('#hat');
  if(hat==='none') h.style.display='none';
  if(hat==='headband'){ h.style.background='#d33'; h.style.height='15px'; h.style.top='55px'; }
  if(hat==='crown'){ h.style.background='#ffd23f'; h.style.clipPath='polygon(0 100%,0 40%,20% 65%,35% 0,52% 62%,72% 10%,100% 42%,100% 100%)'; }
  if(hat==='horns'){ h.style.left='57px'; h.style.width='106px'; h.style.height='52px'; h.style.background='linear-gradient(90deg,#3a2117 0 18%,transparent 18% 34%,#3a2117 34% 46%,transparent 46% 54%,#3a2117 54% 66%,transparent 66% 82%,#3a2117 82% 100%)'; h.style.clipPath='polygon(0 100%,10% 30%,18% 70%,26% 0,34% 68%,42% 12%,50% 72%,58% 12%,66% 68%,74% 0,82% 70%,90% 30%,100% 100%)'; }
  if(hat==='halo'){ h.style.border='7px solid #58f3ff'; h.style.borderRadius='50%'; h.style.height='26px'; h.style.top='18px'; }
  if(hat==='hood'){ h.style.background='#2b243b'; h.style.height='100px'; h.style.borderRadius='50% 50% 15% 15%'; h.style.zIndex='1'; }
  if(hat==='cap'){ h.style.background='#274969'; h.style.borderRadius='50% 50% 18% 18%'; h.style.height='40px'; h.style.top='28px'; h.style.boxShadow='24px 18px 0 -10px #1b344c'; }
  if(hat==='oni'){ h.style.background='#d8433e'; h.style.height='38px'; h.style.top='45px'; h.style.clipPath='polygon(0 100%,8% 18%,22% 34%,36% 0,50% 30%,64% 0,78% 34%,92% 18%,100% 100%)'; }

  // body / armor / boots
  const body = itemVal(data.body[sel.body]);
  const torso = $('#torso');
  const legs = $$('.leg');
  const boots = $$('.boot');
  Object.assign(torso.style,{left:'54px',width:'112px',height:'120px',top:'180px',transform:'scaleX(1) scaleY(1)'});
  legs.forEach((leg,i)=>Object.assign(leg.style,{top:'290px',width:'43px',height:'80px',left:i===0?'61px':'',right:i===1?'61px':'',background:'#242838'}));
  setMany('.arm',{height:'126px'});
  if(body==='compact'){ torso.style.top='186px'; torso.style.height='112px'; legs.forEach(l=>{l.style.height='72px'; l.style.top='286px';}); }
  if(body==='lean'){ torso.style.transform='scaleX(.92)'; }
  if(body==='broad'){ torso.style.transform='scaleX(1.08)'; }
  if(body==='tall'){ torso.style.height='135px'; legs.forEach(l=>{l.style.height='96px'; l.style.top='304px';}); }
  if(body==='titan'){ torso.style.width='126px'; torso.style.left='47px'; torso.style.height='130px'; setMany('.arm',{height:'136px'}); legs.forEach((l,i)=>{l.style.width='48px'; l.style.height='92px'; l.style.top='302px'; if(i===0) l.style.left='58px'; else l.style.right='58px';}); boots.forEach((b,i)=>{b.style.width='56px'; if(i===0) b.style.left='49px'; else b.style.right='49px';}); }

  const av = itemVal(data.armor[sel.armor]);
  torso.style.clipPath='polygon(15% 0,85% 0,100% 20%,88% 100%,12% 100%,0 20%)';
  torso.style.borderRadius='18px';
  if(av==='samurai') torso.style.clipPath='polygon(0 10%,20% 0,80% 0,100% 10%,90% 100%,10% 100%)';
  if(av==='tech') torso.style.clipPath='polygon(20% 0,80% 0,100% 35%,78% 100%,22% 100%,0 35%)';
  if(av==='bone') torso.style.clipPath='polygon(16% 0,84% 0,100% 18%,84% 34%,100% 54%,86% 100%,14% 100%,0 54%,16% 34%,0 18%)';
  if(av==='lava') torso.style.boxShadow='inset 0 0 16px rgba(255,127,36,.45)'; else torso.style.boxShadow='none';
  if(av==='royal'){ torso.style.borderRadius='12px 12px 22px 22px'; torso.style.clipPath='polygon(18% 0,82% 0,92% 15%,100% 100%,0 100%,8% 15%)'; }
  if(av==='coat'){ torso.style.height='138px'; torso.style.clipPath='polygon(18% 0,82% 0,100% 20%,84% 100%,56% 80%,50% 100%,44% 80%,16% 100%,0 20%)'; }
  if(av==='mech'){ torso.style.borderRadius='8px'; torso.style.clipPath='polygon(8% 0,92% 0,100% 12%,100% 88%,92% 100%,8% 100%,0 88%,0 12%)'; }

  const bootStyle = itemVal(data.boots[sel.boots]);
  boots.forEach((b,i)=>{
    Object.assign(b.style,{top:'357px',width:'48px',height:'25px',borderRadius:'8px',clipPath:'none',boxShadow:'none'});
    if(bootStyle==='stomp') { b.style.height='30px'; b.style.width='54px'; b.style.borderRadius='4px'; }
    if(bootStyle==='rocket'){ b.style.height='28px'; b.style.boxShadow='0 10px 0 -2px rgba(255,117,37,.55)'; }
    if(bootStyle==='claw'){ b.style.clipPath='polygon(0 72%,68% 72%,80% 54%,88% 78%,100% 45%,100% 100%,0 100%)'; }
    if(bootStyle==='anime'){ b.style.width='56px'; b.style.height='24px'; b.style.borderRadius='12px'; }
    if(bootStyle==='run'){ b.style.clipPath='polygon(0 56%,68% 56%,84% 34%,100% 55%,100% 100%,0 100%)'; }
    if(bootStyle==='hoof'){ b.style.width='38px'; b.style.height='30px'; b.style.borderRadius='0 0 18px 18px'; }
  });

  renderWeaponPreview(itemVal(data.weapon[sel.weapon]));
}

$('#randomBtn').onclick = ()=>{ cats.forEach(c=> sel[c]=Math.floor(Math.random()*data[c].length)); renderOpts(); renderAvatar(); };
$('#toDrawBtn').onclick = ()=> show('draw');
renderOpts();
renderAvatar();

// drawing studio
const canv = $('#drawCanvas');
const ctx = canv.getContext('2d');
ctx.lineCap='round';
ctx.lineJoin='round';
ctx.fillStyle='#fff';
ctx.fillRect(0,0,canv.width,canv.height);
let drawColor='#111', drawing=false, last=null, undo=[], redo=[];
const colors=['#111111','#ffffff','#ff3b30','#ff9500','#ffd60a','#34c759','#00c7be','#0a84ff','#5e5ce6','#bf5af2','#ff2d55','#8e5a2d','#7b7b7b','#e6a77f','#6b2f1a','#43e4ff'];
let pal = $('#palette');
pal.className='palette';
colors.forEach((c,i)=>{
  let b=document.createElement('button');
  b.style.background=c;
  b.className=i===0?'active':'';
  b.onclick=()=>{ drawColor=c; $$('#palette button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); $('#eraserBtn').classList.remove('active'); };
  pal.appendChild(b);
});
function snap(){ undo.push(canv.toDataURL()); if(undo.length>20) undo.shift(); redo=[]; }
function pos(e){ let r=canv.getBoundingClientRect(),p=e.touches?e.touches[0]:e; return {x:(p.clientX-r.left)*canv.width/r.width,y:(p.clientY-r.top)*canv.height/r.height}; }
function down(e){ e.preventDefault(); snap(); drawing=true; last=pos(e); }
function move(e){ if(!drawing) return; e.preventDefault(); let p=pos(e); ctx.strokeStyle=drawColor; ctx.lineWidth=+$('#brushSize').value; ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; }
function up(){ drawing=false; }
canv.addEventListener('pointerdown',down); canv.addEventListener('pointermove',move); canv.addEventListener('pointerup',up); canv.addEventListener('pointercancel',up);
$('#eraserBtn').onclick=()=>{ drawColor='#ffffff'; $('#eraserBtn').classList.add('active'); };
$('#clearDraw').onclick=()=>{ snap(); ctx.fillStyle='#fff'; ctx.fillRect(0,0,700,700); };
function restore(url){ let im=new Image; im.onload=()=>ctx.drawImage(im,0,0); im.src=url; }
$('#undoBtn').onclick=()=>{ if(!undo.length) return; redo.push(canv.toDataURL()); restore(undo.pop()); };
$('#redoBtn').onclick=()=>{ if(!redo.length) return; undo.push(canv.toDataURL()); restore(redo.pop()); };

// THREE lazy load
let THREE = null;
async function ensureThree(){
  if(THREE) return;
  await new Promise((ok,bad)=>{
    let s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    s.onload=ok; s.onerror=bad; document.head.appendChild(s);
  });
  THREE = window.THREE;
}

let scene,camera,renderer,player,monster,clock,anim;
let health=100,special=0,enemyHealth=100,meat=0,dead=false,won=false,blocking=false,enemyMode='hunt',enemyTimer=0,attackCd=0,dodgeCd=0,joy={x:0,y:0},yaw=0,pitch=0,drops=[];
let grabRoots=[],currentGrabTarget=null;
let aim={x:0,y:0,px:innerWidth/2,py:innerHeight/2};
let aimPointerId=null;
let toyBag={football:0,juggle:0,duck:0,rocket:0};
let looseFootball=null;
let avatar3d=null, activeToyFx=[];
let currentLevel=1, transitioning=false;
let goldenEmber=null, emberTouches=0, emberCore=false, emberTarget=null, emberRetarget=0;
let combo=0,lastAttackAt=0,blockStartedAt=0;
const LEVELS={
1:{name:'LEVEL 1',objective:'DEFEAT YOUR DRAWN MONSTER',enemy:'DRAWN MONSTER',hp:120,speed:1.03,kind:'drawn'},
2:{name:'LEVEL 2',objective:'FIND THE GOLDEN EMBER',enemy:'GOLDEN EMBER',kind:'hunt'},
3:{name:'LEVEL 3',objective:'PASS THE SCIENCE GATE',enemy:'SCIENCE GATE',kind:'quiz'},
4:{name:'LEVEL 4',objective:'SURVIVE THE LAVA HUNTER',enemy:'LAVA HUNTER',hp:155,speed:1.24,kind:'lava'},
5:{name:'LEVEL 5',objective:'DEFEAT THE GINGERBREAD BOSS',enemy:'GINGERBREAD BOSS',hp:220,speed:1.16,kind:'ginger'},
6:{name:'FINAL LEVEL',objective:'DEFEAT YOUR MEGA MONSTER',enemy:'MEGA DRAWN BOSS',hp:320,speed:1.36,kind:'mega'}
};

function mat(c,e=0){ return new THREE.MeshStandardMaterial({color:c,emissive:e,emissiveIntensity:e?0.45:0,roughness:.82}); }
function box(x,y,z,c,e=0){ let m=new THREE.Mesh(new THREE.BoxGeometry(x,y,z), mat(c,e)); m.castShadow=true; m.receiveShadow=true; return m; }

function world(){
  scene.background = new THREE.Color(0x864327);
  scene.fog = new THREE.Fog(0x8a371f, 35, 105);
  scene.add(new THREE.HemisphereLight(0xffdeb2,0x4d1e14,2.6));
  let dl=new THREE.DirectionalLight(0xffbf78,3.2); dl.position.set(8,18,14); scene.add(dl);
  let floor=box(42,.6,86,0x6b3426); floor.position.y=-.3; scene.add(floor);
  for(let i=0;i<24;i++){
    let x=(Math.random()>.5?1:-1)*(8+Math.random()*10), z=-32+Math.random()*72;
    let r=box(2+Math.random()*4,1+Math.random()*6,2+Math.random()*4,0x472219);
    r.position.set(x,r.geometry.parameters.height/2,z); scene.add(r);
  }
  for(let i=0;i<10;i++){
    let lava=box(2.5+Math.random()*4,.15,8+Math.random()*9,0xff6a18,0xff2a00);
    lava.position.set((Math.random()-.5)*25,.12,-30+i*7.5); scene.add(lava);
    let pl=new THREE.PointLight(0xff7328,2.8,15); pl.position.set(lava.position.x,1.2,lava.position.z); scene.add(pl);
  }
  for(let i=0;i<60;i++){
    let ember=box(.1,.1,.1,0xffd36a,0xff8a1f);
    ember.position.set((Math.random()-.5)*34,1+Math.random()*10,-35+Math.random()*80); scene.add(ember);
  }
  for(let i=0;i<8;i++){
    let pillar=box(2.2,6+Math.random()*8,2.2,0x2c1714);
    pillar.position.set((i%2?1:-1)*(11+Math.random()*5),pillar.geometry.parameters.height/2,-24+i*8); scene.add(pillar);
  }
}

function makeDefaultMonsterCanvas(){
  const c=document.createElement('canvas'); c.width=360; c.height=420;
  const x=c.getContext('2d');
  x.clearRect(0,0,c.width,c.height);
  x.fillStyle='#ff6528';
  x.beginPath(); x.moveTo(180,30); x.lineTo(310,120); x.lineTo(285,310); x.lineTo(180,390); x.lineTo(75,310); x.lineTo(50,120); x.closePath(); x.fill();
  x.fillStyle='#1d0d09'; x.beginPath(); x.arc(130,170,18,0,Math.PI*2); x.arc(230,170,18,0,Math.PI*2); x.fill();
  x.fillStyle='#fff1b7'; x.beginPath(); x.moveTo(120,245); x.quadraticCurveTo(180,288,240,245); x.lineWidth=12; x.strokeStyle='#fff1b7'; x.stroke();
  x.fillStyle='#ffb347'; x.fillRect(88,66,34,82); x.fillRect(238,66,34,82);
  return c;
}

function cutoutCanvasFromDrawing(source){
  const srcCtx = source.getContext('2d');
  const img = srcCtx.getImageData(0,0,source.width,source.height);
  const d = img.data;
  let minX=source.width, minY=source.height, maxX=-1, maxY=-1;
  for(let y=0;y<source.height;y++){
    for(let x=0;x<source.width;x++){
      let i=(y*source.width+x)*4;
      const r=d[i], g=d[i+1], b=d[i+2], a=d[i+3];
      const nearWhite = a>0 && r>242 && g>242 && b>242;
      if(nearWhite){ d[i+3]=0; }
      if(d[i+3]>8){ if(x<minX) minX=x; if(y<minY) minY=y; if(x>maxX) maxX=x; if(y>maxY) maxY=y; }
    }
  }
  if(maxX<0) return makeDefaultMonsterCanvas();
  const pad=14;
  minX=Math.max(0,minX-pad); minY=Math.max(0,minY-pad); maxX=Math.min(source.width-1,maxX+pad); maxY=Math.min(source.height-1,maxY+pad);
  const out=document.createElement('canvas'); out.width=maxX-minX+1; out.height=maxY-minY+1;
  const octx=out.getContext('2d');
  octx.putImageData(img,-minX,-minY);
  return out;
}


function gingerCanvas(){
  const c=document.createElement('canvas'); c.width=360; c.height=420; const x=c.getContext('2d');
  x.clearRect(0,0,c.width,c.height); x.fillStyle='#b86b2f';
  x.beginPath(); x.arc(180,92,62,0,Math.PI*2); x.fill();
  x.fillRect(115,145,130,145); x.fillRect(54,165,75,38); x.fillRect(231,165,75,38); x.fillRect(126,270,42,115); x.fillRect(192,270,42,115);
  x.fillStyle='#fff'; x.beginPath(); x.arc(155,78,12,0,Math.PI*2); x.arc(205,78,12,0,Math.PI*2); x.fill();
  x.strokeStyle='#fff'; x.lineWidth=10; x.beginPath(); x.arc(180,105,28,0.15*Math.PI,.85*Math.PI); x.stroke();
  x.fillStyle='#ff3d45'; x.beginPath(); x.arc(180,190,13,0,Math.PI*2); x.fill(); x.fillStyle='#35c76f'; x.beginPath(); x.arc(180,228,13,0,Math.PI*2); x.fill();
  return c;
}
function lavaCanvas(){
  const c=document.createElement('canvas'); c.width=360; c.height=420; const x=c.getContext('2d'); x.clearRect(0,0,c.width,c.height);
  x.fillStyle='#37140e'; x.beginPath(); x.moveTo(180,30); x.lineTo(300,120); x.lineTo(270,330); x.lineTo(180,398); x.lineTo(80,325); x.lineTo(50,120); x.closePath(); x.fill();
  x.strokeStyle='#ff6a18'; x.lineWidth=24; [[95,120,150,210],[260,100,205,220],[115,285,170,245],[255,300,205,250]].forEach(a=>{x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(a[2],a[3]);x.stroke()});
  x.fillStyle='#ffd95a'; x.beginPath(); x.arc(130,170,16,0,Math.PI*2); x.arc(230,170,16,0,Math.PI*2); x.fill();
  return c;
}
function enemyArtForLevel(){
  const kind=LEVELS[currentLevel].kind;
  if(kind==='ginger') return gingerCanvas();
  if(kind==='lava') return lavaCanvas();
  return cutoutCanvasFromDrawing(canv);
}

function monsterSprite(){
  const cut = enemyArtForLevel();
  const tex = new THREE.CanvasTexture(cut);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;

  const group = new THREE.Group();
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,alphaTest:0.12}));
  const aspect = cut.width/cut.height;
  const h = currentLevel===6 ? 6.4 : currentLevel===5 ? 5.8 : 4.8;
  sprite.scale.set(Math.max(3, h*aspect), h, 1);
  sprite.position.set(0,2.4,0);
  group.add(sprite);

  const legL = box(.36,1.7,.36,0x2d1612,0xff5a1f); legL.position.set(-.65,.9,-.08);
  const legR = box(.36,1.7,.36,0x2d1612,0xff5a1f); legR.position.set(.65,.9,-.08);
  const armL = box(.28,1.5,.28,0x4d261c,0xff4e12); armL.position.set(-1.55,2.25,-.08);
  const armR = box(.28,1.5,.28,0x4d261c,0xff4e12); armR.position.set(1.55,2.25,-.08);
  const blade = box(.22,2.2,.22,0x222222); blade.position.set(2.25,2.45,0); blade.rotation.z=.6;
  if(currentLevel===6){
    const cannon=box(.55,1.8,.55,0x3b4452,0xff5a1f); cannon.position.set(-2.2,2.8,.1); cannon.rotation.z=-.65; group.add(cannon);
    const horn1=box(.28,1.3,.28,0x24100c,0xff3b10); horn1.position.set(-1.0,4.9,0); horn1.rotation.z=-.45;
    const horn2=box(.28,1.3,.28,0x24100c,0xff3b10); horn2.position.set(1.0,4.9,0); horn2.rotation.z=.45; group.add(horn1,horn2);
  }
  const glow = new THREE.PointLight(0xff5a24,4.8,15); glow.position.set(0,2.5,1);
  group.add(legL,legR,armL,armR,blade,glow);
  group.userData = {sprite, legL, legR, armL, armR, blade, walk:0};
  group.position.set(0,0,-16);
  scene.add(group);
  return group;
}


function hexColor(v,fallback=0xffffff){
  if(typeof v==='number') return v;
  if(typeof v==='string' && v[0]==='#') return parseInt(v.slice(1),16);
  return fallback;
}
function makePart(geo,color){
  const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:hexColor(color),roughness:.78,metalness:.05}));
  m.castShadow=true; m.receiveShadow=true; return m;
}
function createPlayerAvatar(){
  const g=new THREE.Group();
  const skin=itemVal(data.skin[sel.skin]);
  const armor=itemColor(data.armor[sel.armor]);
  const hair=itemColor(data.hair[sel.hair]);
  const boots=itemColor(data.boots[sel.boots]);
  const torso=makePart(new THREE.BoxGeometry(1.15,1.55,.62),armor); torso.position.y=1.9;
  const hips=makePart(new THREE.BoxGeometry(.92,.42,.55),0x242838); hips.position.y=1.04;
  const head=makePart(new THREE.SphereGeometry(.48,18,14),skin); head.position.y=3.1; head.scale.set(.92,1.08,.9);
  const hairCap=makePart(new THREE.SphereGeometry(.5,16,10,0,Math.PI*2,0,Math.PI*.56),hair); hairCap.position.set(0,3.32,0); hairCap.scale.set(.98,.7,.96);
  const eyeMat=new THREE.MeshBasicMaterial({color:hexColor(itemColor(data.eyes[sel.eyes]),0x3ca6ff)});
  const eyeL=new THREE.Mesh(new THREE.SphereGeometry(.055,8,6),eyeMat); eyeL.position.set(-.16,3.16,-.43);
  const eyeR=eyeL.clone(); eyeR.position.x=.16;
  const armL=makePart(new THREE.CylinderGeometry(.14,.14,1.2,10),skin); armL.position.set(-.75,1.9,0); armL.rotation.z=.08;
  const armR=makePart(new THREE.CylinderGeometry(.14,.14,1.2,10),skin); armR.position.set(.75,1.9,0); armR.rotation.z=-.08;
  const legL=makePart(new THREE.CylinderGeometry(.17,.17,1.25,10),0x242838); legL.position.set(-.28,.5,0);
  const legR=makePart(new THREE.CylinderGeometry(.17,.17,1.25,10),0x242838); legR.position.set(.28,.5,0);
  const bootL=makePart(new THREE.BoxGeometry(.38,.28,.72),boots); bootL.position.set(-.28,-.14,-.12);
  const bootR=bootL.clone(); bootR.position.x=.28;
  const weaponType=itemVal(data.weapon[sel.weapon]);
  let weapon;
  if(weaponType==='hammer') weapon=makePart(new THREE.BoxGeometry(.34,1.45,.24),0x8c929a);
  else if(weaponType==='blaster') weapon=makePart(new THREE.BoxGeometry(.25,.75,.5),0x43e4ff);
  else weapon=makePart(new THREE.BoxGeometry(.12,1.5,.13),0xdfe5ee);
  weapon.position.set(.95,1.45,-.2); weapon.rotation.z=-.25;
  g.add(torso,hips,head,hairCap,eyeL,eyeR,armL,armR,legL,legR,bootL,bootR,weapon);
  g.userData={torso,head,hairCap,armL,armR,legL,legR,weapon,walk:0};
  player.add(g); avatar3d=g; return g;
}
function updatePlayerAvatar(dt){
  if(!avatar3d) return;
  const u=avatar3d.userData;
  const moving=Math.hypot(joy.x,joy.y)>.08;
  if(moving) u.walk+=dt*10;
  const s=moving?Math.sin(u.walk)*.72:0;
  u.legL.rotation.x=s; u.legR.rotation.x=-s;
  u.armL.rotation.x=-s*.65; u.armR.rotation.x=s*.65;
  avatar3d.position.y=moving?Math.abs(Math.sin(u.walk*2))*.035:0;
}
function updateThirdPersonCamera(dt){
  if(!camera||!player) return;
  const back=7.4, shoulder=1.15, height=4.4;
  const sy=Math.sin(yaw), cy=Math.cos(yaw);
  const desired=new THREE.Vector3(
    player.position.x + shoulder*cy + back*sy,
    player.position.y + height,
    player.position.z + shoulder*(-sy) + back*cy
  );
  const smooth=1-Math.pow(.001,dt);
  camera.position.lerp(desired,smooth);
  const target=new THREE.Vector3(player.position.x,player.position.y+1.65+pitch*2.2,player.position.z);
  target.x += -Math.sin(yaw)*2.5;
  target.z += -Math.cos(yaw)*2.5;
  camera.lookAt(target);
}
function addToyFx(obj,kind,duration=6){
  activeToyFx.push({obj,kind,t:0,duration,start:obj.position.clone()});
}
function updateToyFx(dt){
  for(let i=activeToyFx.length-1;i>=0;i--){
    const fx=activeToyFx[i]; if(!fx.obj||!fx.obj.parent){activeToyFx.splice(i,1);continue;}
    fx.t+=dt;
    if(fx.kind==='juggle'){
      fx.obj.position.copy(player.position); fx.obj.position.y+=2.4;
      fx.obj.children.forEach((b,j)=>{
        if(b.type==='Sprite') return;
        const phase=fx.t*4.6+j*2.1;
        b.position.x=Math.sin(phase)*.75;
        b.position.y=.55+Math.abs(Math.sin(phase))*1.35;
        b.position.z=Math.cos(phase)*.24;
      });
    }else if(fx.kind==='duck'){
      const a=fx.t*1.8;
      fx.obj.position.x=fx.start.x+Math.cos(a)*1.7;
      fx.obj.position.z=fx.start.z+Math.sin(a)*1.7;
      fx.obj.position.y=.55+Math.abs(Math.sin(fx.t*7))*.08;
      fx.obj.rotation.y=-a;
    }else if(fx.kind==='rocket'){
      fx.obj.position.y=fx.start.y+fx.t*5.5;
      fx.obj.rotation.z+=dt*4;
      fx.obj.rotation.y+=dt*5;
      if(fx.obj.userData.rocketLight) fx.obj.userData.rocketLight.intensity=4+Math.sin(fx.t*18)*1.5;
    }
    if(fx.t>fx.duration){
      if(fx.kind==='juggle'||fx.kind==='rocket') scene.remove(fx.obj);
      activeToyFx.splice(i,1);
    }
  }
}

function startRun(){
  currentLevel=1; health=100; special=0; meat=0; transitioning=false; emberCore=false; emberTouches=0; combo=0; toyBag={football:0,juggle:0,duck:0,rocket:0}; looseFootball=null; startLevel();
}
function startLevel(){
  cancelAnimationFrame(anim);
  $('#gameCanvas').innerHTML='';
  dead=false; won=false; blocking=false; enemyMode='hunt'; enemyTimer=.8; attackCd=0; dodgeCd=0; joy={x:0,y:0}; yaw=0; pitch=0; drops=[]; grabRoots=[]; currentGrabTarget=null; looseFootball=null; activeToyFx=[]; transitioning=false; aim={x:0,y:0,px:innerWidth/2,py:innerHeight/2}; positionCrosshair(innerWidth/2,innerHeight/2);
  $('#death').classList.add('hidden'); $('#levelClear').classList.add('hidden'); $('#runComplete').classList.add('hidden'); $('#scienceGate').classList.add('hidden'); $('#huntHud').classList.add('hidden'); $('#comboHud').classList.add('hidden');
  const cfg=LEVELS[currentLevel];
  $('#levelText').textContent=cfg.name; $('#objectiveText').textContent=cfg.objective; $('#enemyName').textContent=cfg.enemy;
  if(cfg.kind==='quiz'){
    $('#enemyHud').classList.add('hidden'); $('#message').textContent='The Science Gate blocks the path.'; update(); showScienceGate(); return;
  }
  $('#enemyHud').classList.toggle('hidden',cfg.kind==='hunt');
  enemyHealth=cfg.hp;
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(68, innerWidth/innerHeight, .1, 120);
  player=new THREE.Object3D(); player.position.set(0,0,20); scene.add(player); scene.add(camera); createPlayerAvatar();
  camera.position.set(1.2,4.4,27.4);
  renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)); renderer.setSize(innerWidth,innerHeight); $('#gameCanvas').appendChild(renderer.domElement);
  world(); spawnWorldToys(); clock=new THREE.Clock();
  if(cfg.kind==='hunt'){ monster=null; setupGoldenEmber(); $('#huntHud').classList.remove('hidden'); $('#message').textContent='ROAM THE NETHEN — THE GOLDEN EMBER WILL FLEE FROM YOU!'; }
  else { monster=monsterSprite(); $('#message').textContent=currentLevel===6?'FINAL BOSS — YOUR MONSTER CAME BACK MEGA!':'The next enemy is coming for you.'; }
  $('#heldWeapon').style.display='none'; setupLook(); updateThirdPersonCamera(.016); update(); loop();
}

function showScienceGate(){
  const qs=[
    {q:'Which planet is known as the Red Planet?',a:['Mars','Venus','Jupiter','Mercury'],c:0},
    {q:'What gas do plants take in from the air?',a:['Oxygen','Carbon dioxide','Helium','Hydrogen'],c:1},
    {q:'Which force pulls things toward Earth?',a:['Magnetism','Gravity','Friction','Electricity'],c:1},
    {q:'What is water called when it becomes a gas?',a:['Steam / water vapour','Ice','Salt','Cloud rock'],c:0}
  ];
  const q=qs[Math.floor(Math.random()*qs.length)];
  $('#scienceQuestion').textContent=q.q; $('#scienceFeedback').textContent='';
  const wrap=$('#scienceAnswers'); wrap.innerHTML='';
  q.a.forEach((ans,i)=>{ const b=document.createElement('button'); b.textContent=ans; b.onclick=()=>{
    if(i===q.c){ b.classList.add('correct'); $('#scienceFeedback').textContent='CORRECT! Special bar boosted.'; special=Math.min(100,special+35); update(); setTimeout(()=>completeLevel(),650); }
    else { b.classList.add('wrong'); $('#scienceFeedback').textContent='Try another answer.'; }
  }; wrap.appendChild(b); });
  $('#scienceGate').classList.remove('hidden');
}

function setupGoldenEmber(){
  emberTouches=0; $('#emberProgress').textContent='0/3';
  const g=new THREE.Group();
  const orb=new THREE.Mesh(new THREE.SphereGeometry(.48,16,12),new THREE.MeshStandardMaterial({color:0xffd95a,emissive:0xffa400,emissiveIntensity:1.8,roughness:.25,metalness:.25}));
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.8,.08,8,28),new THREE.MeshBasicMaterial({color:0xfff1a1})); ring.rotation.x=Math.PI/2;
  const wing1=new THREE.Mesh(new THREE.PlaneGeometry(.9,.35),new THREE.MeshBasicMaterial({color:0xfff4bf,transparent:true,opacity:.8,side:THREE.DoubleSide})); wing1.position.x=-.85;
  const wing2=wing1.clone(); wing2.position.x=.85;
  const light=new THREE.PointLight(0xffd95a,5,16);
  g.add(orb,ring,wing1,wing2,light); g.position.set(7,3,-12); g.userData={orb,ring,wing1,wing2,t:0,grabType:'ember',grabLabel:'GOLDEN EMBER'}; scene.add(g); grabRoots.push(g); goldenEmber=g;
  emberTarget=new THREE.Vector3(-9,3,-26); emberRetarget=0;
}
function pickEmberTarget(){
  emberTarget=new THREE.Vector3((Math.random()-.5)*30,2.2+Math.random()*4,-30+Math.random()*58); emberRetarget=2+Math.random()*2.5;
}
function updateGoldenEmber(dt){
  if(!goldenEmber||dead) return;
  const u=goldenEmber.userData; u.t+=dt;
  u.ring.rotation.z+=dt*2.8; u.wing1.rotation.y=Math.sin(u.t*13)*.8; u.wing2.rotation.y=-Math.sin(u.t*13)*.8;
  goldenEmber.position.y += Math.sin(u.t*4)*.005;
  emberRetarget-=dt;
  const pd=player.position.distanceTo(goldenEmber.position);
  if(pd<5.2){
    const flee=goldenEmber.position.clone().sub(player.position); flee.y=.3; if(flee.lengthSq()>.001) goldenEmber.position.addScaledVector(flee.normalize(),dt*3.5);
  }else if(emberTarget){
    const to=emberTarget.clone().sub(goldenEmber.position); if(to.length()<1||emberRetarget<=0) pickEmberTarget(); else goldenEmber.position.addScaledVector(to.normalize(),dt*2.5);
  }
  goldenEmber.position.x=Math.max(-16,Math.min(16,goldenEmber.position.x)); goldenEmber.position.z=Math.max(-34,Math.min(27,goldenEmber.position.z));
}

function positionCrosshair(x,y){
  const margin=34;
  x=Math.max(margin,Math.min(innerWidth-margin,x));
  y=Math.max(82,Math.min(innerHeight-margin,y));
  aim.px=x; aim.py=y;
  aim.x=(x/innerWidth)*2-1;
  aim.y=-(y/innerHeight)*2+1;
  const c=$('#crosshair');
  if(c){ c.style.left=x+'px'; c.style.top=y+'px'; }
  const hint=$('#grabHint');
  if(hint){ hint.style.left=x+'px'; hint.style.top=(y+34)+'px'; }
}
function setupLook(){
  const c=renderer.domElement;
  c.onpointerdown=e=>{
    if(e.clientX < innerWidth*.38 || e.target.closest?.('button,.joystick,.panel,.modal')) return;
    aimPointerId=e.pointerId;
    c.setPointerCapture?.(e.pointerId);
    positionCrosshair(e.clientX,e.clientY);
  };
  c.onpointermove=e=>{ if(e.pointerId===aimPointerId) positionCrosshair(e.clientX,e.clientY); };
  c.onpointerup=c.onpointercancel=e=>{ if(e.pointerId===aimPointerId) aimPointerId=null; };
}

function dist(){ return monster ? player.position.distanceTo(monster.position) : 999; }
function aimingAtMonster(max=5.4){
  if(!monster||!camera) return false;
  const ray=new THREE.Raycaster();
  ray.setFromCamera(new THREE.Vector2(aim.x,aim.y),camera); ray.far=max;
  return ray.intersectObjects(monster.children||[],true).length>0;
}
function update(){
  $('#healthText').textContent=Math.round(health); $('#healthBar').style.width=health+'%';
  $('#specialText').textContent=Math.round(special)+'%'; $('#specialBar').style.width=special+'%';
  const maxHp=(LEVELS[currentLevel]&&LEVELS[currentLevel].hp)||100; $('#enemyBar').style.width=Math.max(0,Math.min(100,enemyHealth/maxHp*100))+'%';
  $('#meatCount').textContent=$('#invMeat').textContent=meat;
  $('#coreStatus').textContent=emberCore?'UNLOCKED':'LOCKED';
  $('#attackBtn').textContent=special>=100?'SUPER HIT':'HIT';
  $('#attackBtn').classList.toggle('ready',special>=100&&!dead&&!won);
  renderToyInventory();
}


function combatFx(power=1,comboStep=1){
  const slash=$('#slashFx'); slash.className='slashFx s'+Math.min(3,comboStep); slash.classList.remove('hidden');
  setTimeout(()=>slash.classList.add('hidden'),power>1?310:220);
  const flash=$('#hitFlash'); flash.classList.remove('hidden'); flash.style.opacity=power>1?'.8':'.45';
  setTimeout(()=>flash.classList.add('hidden'),power>1?130:70);
  const gc=$('#gameCanvas'); gc.classList.remove('shake','bigShake'); void gc.offsetWidth; gc.classList.add(power>1?'bigShake':'shake');
  setTimeout(()=>gc.classList.remove('shake','bigShake'),320);
}
function hitSparks(pos,big=false){
  for(let i=0;i<(big?18:8);i++){
    let p=box(big?.13:.09,big?.13:.09,big?.13:.09,0xffe279,0xff7a18);
    p.position.copy(pos).add(new THREE.Vector3((Math.random()-.5)*1.4,1.8+Math.random()*2,(Math.random()-.5)*1.4));
    scene.add(p);
    const dir=new THREE.Vector3((Math.random()-.5)*.14,.05+Math.random()*.12,(Math.random()-.5)*.14);
    let life=0;
    const id=setInterval(()=>{ life+=1; p.position.add(dir); p.scale.multiplyScalar(.9); if(life>10){clearInterval(id);scene.remove(p);} },16);
  }
}
function attack(isSpecial=false){
  if(dead||attackCd>0) return;
  const footballTarget=getGrabTarget(6.5,'football');
  if(footballTarget){ kickFootball(footballTarget); return; }
  const cfg=LEVELS[currentLevel];
  if(cfg.kind==='hunt'){ $('#message').textContent='USE GRAB WHEN THE GOLDEN EMBER IS IN YOUR CROSSHAIR!'; return; }
  if(won||!monster) return;
  isSpecial = special>=100;
  const now=performance.now();
  if(now-lastAttackAt<820) combo=Math.min(3,combo+1); else combo=1;
  lastAttackAt=now;
  if(isSpecial) combo=3;
  attackCd=isSpecial?.78:(combo===3?.48:.3);
  $('#heldWeapon').classList.remove('swing'); void $('#heldWeapon').offsetWidth; $('#heldWeapon').classList.add('swing');
  setTimeout(()=>$('#heldWeapon').classList.remove('swing'),320);
  $('#comboText').textContent=isSpecial?'EMBER BLAST!':`COMBO x${combo}`;
  $('#comboHud').classList.remove('hidden'); setTimeout(()=>$('#comboHud').classList.add('hidden'),650);
  combatFx(isSpecial?2:combo===3?1.5:1,combo);
  if(isSpecial) special=0;
  if(dist()<5.4 && aimingAtMonster(5.6)){
    const base=[0,14,18,29][combo];
    let dmg=isSpecial?(emberCore?82:64):base;
    enemyHealth-=dmg;
    if(!isSpecial) special=Math.min(100,special+(combo===3?18:10));
    const away=monster.position.clone().sub(player.position).setY(0).normalize();
    monster.position.addScaledVector(away,isSpecial?3.8:combo===3?2.0:.75);
    hitSparks(monster.position,isSpecial||combo===3);
    if(monster.userData?.sprite){ monster.userData.sprite.material.color.setHex(0xff9a82); setTimeout(()=>monster?.userData?.sprite?.material?.color.setHex(0xffffff),110); }
    enemyMode='stagger'; enemyTimer=isSpecial?.7:combo===3?.48:.16;
    $('#message').textContent=isSpecial?(emberCore?'EMBER CORE SPECIAL — MASSIVE HIT!':'SPECIAL HIT!'):(combo===3?'HEAVY FINISHER!':'HIT!');
    if(enemyHealth<=0) kill();
  } else {
    $('#message').textContent='MISS — GET IN RANGE AND AIM';
    combo=0;
  }
  update();
}

function animateMonster(dt){
  if(!monster || !monster.userData) return;
  const u=monster.userData;
  u.walk += dt*8;
  const step = Math.sin(u.walk)*0.5;
  u.legL.rotation.x = step;
  u.legR.rotation.x = -step;
  u.armL.rotation.x = -step*.7;
  u.armR.rotation.x = step*.7;
  u.blade.rotation.z = .6 + Math.sin(u.walk*.9)*.18;
  u.sprite.position.y = 2.4 + Math.sin(u.walk*2)*0.08;
}

function enemy(dt){
  if(dead||won||!monster) return;
  let d=dist(), dir=player.position.clone().sub(monster.position); dir.y=0;
  animateMonster(dt);
  if(enemyMode==='stagger'){
    enemyTimer-=dt;
    if(enemyTimer<=0){ enemyMode='hunt'; enemyTimer=.55; }
    return;
  }
  if(enemyMode==='hunt'){
    let mult=(LEVELS[currentLevel].speed||1); let speed=(d>16?5.4:d>10?4.6:d>5?3.5:2.2)*mult;
    if(dir.lengthSq()>.001) monster.position.addScaledVector(dir.normalize(),dt*speed);
    enemyTimer-=dt;
    if(d<4.5&&enemyTimer<=0){
      enemyMode='windup'; enemyTimer=.9; $('#warning').classList.remove('hidden'); $('#message').textContent='INCOMING — TIME YOUR BLOCK OR DODGE!'; monster.scale.set(1.14,1.14,1.14);
      if(monster.userData) monster.userData.blade.rotation.z=1.35;
    }
  }else if(enemyMode==='windup'){
    enemyTimer-=dt;
    if(enemyTimer<=0){
      $('#warning').classList.add('hidden');
      if(d<5.0){
        const perfect=blocking && performance.now()-blockStartedAt<430;
        if(perfect){
          $('#message').textContent='PERFECT PARRY!'; special=Math.min(100,special+28); combatFx(1.4,3);
          const away=monster.position.clone().sub(player.position).setY(0).normalize(); monster.position.addScaledVector(away,2.4); enemyMode='stagger'; enemyTimer=.72;
        }else{
          let hit=blocking?6:22; health=Math.max(0,health-hit); $('#message').textContent=blocking?'BLOCKED — BUT IT STILL HURT!':'CRUSHING HIT!';
          if(blocking) special=Math.min(100,special+10); combatFx(blocking?1:1.5,1); enemyMode='recover'; enemyTimer=.58;
        }
      }else{ $('#message').textContent='NICE DODGE!'; enemyMode='recover'; enemyTimer=.5; }
      monster.scale.set(1,1,1);
      if(health<=0){dead=true;$('#death').classList.remove('hidden');}
      update();
    }
  }else{
    enemyTimer-=dt;
    if(enemyTimer<=0){enemyMode='hunt';enemyTimer=.72+Math.random()*.3;}
  }
}

function kill(){
  enemyHealth=0; won=true; monster.visible=false;
  const count=currentLevel===5?4:3;
  for(let i=0;i<count;i++){
    let m=box(.72,.36,.46,0xb72c1f,0x5d0900);
    m.position.copy(monster.position).add(new THREE.Vector3((i-(count-1)/2)*.8,.4,(i%2?-.4:.3)));
    m.userData={grabType:'meat',grabLabel:'EMBER MEAT'}; scene.add(m); grabRoots.push(m); drops.push(m);
  }
  $('#message').textContent='ENEMY DOWN — AIM AT THE MEAT AND PRESS GRAB'; update();
}
function collect(){
  drops.forEach(d=>d.rotation.y+=.06);
  if(won && drops.length===0 && !transitioning){ transitioning=true; setTimeout(()=>completeLevel(),550); }
}

function completeLevel(){
  $('#scienceGate').classList.add('hidden');
  health=Math.min(100,health+20); update();
  if(currentLevel>=6){ $('#runComplete').classList.remove('hidden'); return; }
  currentLevel++;
  $('#clearTitle').textContent='LEVEL COMPLETE!';
  $('#clearText').textContent=`Next: ${LEVELS[currentLevel].objective}`;
  $('#levelClear').classList.remove('hidden');
  setTimeout(()=>{ if(!$('#levelClear').classList.contains('hidden')){ $('#levelClear').classList.add('hidden'); startLevel(); } },1400);
}

function loop(){
  anim=requestAnimationFrame(loop);
  let dt=Math.min(clock.getDelta(), .05);
  attackCd=Math.max(0,attackCd-dt); dodgeCd=Math.max(0,dodgeCd-dt);
  if(!dead){
    const edgeX=Math.abs(aim.x)>.62 ? (Math.abs(aim.x)-.62)/.38*Math.sign(aim.x) : 0;
    const edgeY=Math.abs(aim.y)>.68 ? (Math.abs(aim.y)-.68)/.32*Math.sign(aim.y) : 0;
    yaw -= edgeX*1.35*dt;
    pitch=Math.max(-.42,Math.min(.42,pitch+edgeY*.62*dt));
    player.rotation.y=yaw;
    const f=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw));
    const r=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));
    const moveSpeed=7.2;
    player.position.addScaledVector(r, joy.x*moveSpeed*dt);
    player.position.addScaledVector(f, -joy.y*moveSpeed*dt);
    player.position.x=Math.max(-18,Math.min(18,player.position.x));
    player.position.z=Math.max(-38,Math.min(30,player.position.z));
    updatePlayerAvatar(dt);
    updateThirdPersonCamera(dt);
    if(LEVELS[currentLevel].kind==='hunt') updateGoldenEmber(dt); else { enemy(dt); collect(); }
    updateGrabTarget(); updateLooseFootball(dt); updateToyFx(dt);
  }
  renderer.render(scene,camera);
}


function makeLabelSprite(text){
  const c=document.createElement('canvas'); c.width=320; c.height=80; const x=c.getContext('2d');
  x.fillStyle='rgba(20,8,5,.82)'; x.fillRect(0,10,320,60); x.strokeStyle='#ffd95a'; x.lineWidth=4; x.strokeRect(2,12,316,56);
  x.fillStyle='#fff7df'; x.font='bold 28px system-ui'; x.textAlign='center'; x.textBaseline='middle'; x.fillText(text,160,40);
  const tex=new THREE.CanvasTexture(c); const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true})); sp.scale.set(3.2,.8,1); return sp;
}
function toyObject(type,pos){
  const g=new THREE.Group(); let main;
  if(type==='football'){
    main=new THREE.Mesh(new THREE.SphereGeometry(.48,18,14),new THREE.MeshStandardMaterial({color:0xf2f2f2,roughness:.75}));
    const band=new THREE.Mesh(new THREE.TorusGeometry(.34,.045,6,18),new THREE.MeshBasicMaterial({color:0x222222})); band.rotation.x=Math.PI/2; g.add(main,band);
  }else if(type==='juggle'){
    [-.42,0,.42].forEach((x,i)=>{const b=new THREE.Mesh(new THREE.SphereGeometry(.24,14,10),new THREE.MeshStandardMaterial({color:[0xff3f52,0xffd95a,0x43e4ff][i],emissive:[0x551014,0x554000,0x104455][i],emissiveIntensity:.3})); b.position.x=x; g.add(b);});
  }else if(type==='duck'){
    const body=new THREE.Mesh(new THREE.SphereGeometry(.4,16,12),new THREE.MeshStandardMaterial({color:0xffd83e})); body.scale.set(1.2,.8,1); const head=body.clone(); head.scale.set(.65,.65,.65); head.position.set(.34,.42,0); const beak=box(.28,.12,.24,0xff8a18); beak.position.set(.66,.39,0); g.add(body,head,beak);
  }else{
    main=new THREE.Mesh(new THREE.CylinderGeometry(.23,.35,1.1,12),new THREE.MeshStandardMaterial({color:0xb8c7d9,metalness:.25})); main.rotation.z=Math.PI/2; const nose=new THREE.Mesh(new THREE.ConeGeometry(.24,.42,12),new THREE.MeshStandardMaterial({color:0xff5b27})); nose.rotation.z=-Math.PI/2; nose.position.x=.75; g.add(main,nose);
  }
  const names={football:'FOOTBALL',juggle:'JUGGLING BALLS',duck:'RUBBER DUCK',rocket:'TOY ROCKET'};
  const label=makeLabelSprite(names[type]); label.position.y=1.25; g.add(label);
  g.position.copy(pos); g.userData={grabType:'toy',toyType:type,grabLabel:names[type]}; scene.add(g); grabRoots.push(g); return g;
}
function spawnWorldToys(){
  const types=['football','juggle','duck','rocket'];
  types.forEach((t,i)=>toyObject(t,new THREE.Vector3((i%2?1:-1)*(5+Math.random()*8),.65,-8-i*10+Math.random()*5)));
}
function rootGrabObject(obj){
  let o=obj; while(o && o!==scene){ if(o.userData?.grabType) return o; o=o.parent; } return null;
}
function getGrabTarget(max=6.5,onlyType=null){
  if(!camera||!scene) return null;
  const ray=new THREE.Raycaster(); ray.setFromCamera(new THREE.Vector2(aim.x,aim.y),camera); ray.far=max;
  const hits=ray.intersectObjects(grabRoots.filter(o=>o&&o.parent),true);
  for(const h of hits){ const root=rootGrabObject(h.object); if(root && (!onlyType || root.userData.grabType===onlyType || root.userData.toyType===onlyType)) return root; }
  return null;
}
function updateGrabTarget(){
  currentGrabTarget=getGrabTarget(6.5);
  const c=$('#crosshair'), hint=$('#grabHint');
  if(currentGrabTarget){ c.classList.add('grabReady'); hint.classList.remove('hidden'); hint.textContent='GRAB '+(currentGrabTarget.userData.grabLabel||'ITEM'); }
  else { c.classList.remove('grabReady'); hint.classList.add('hidden'); }
}
function handReach(){
  const h=$('#grabHand'); h.classList.remove('hidden','reach'); void h.offsetWidth; h.classList.add('reach'); setTimeout(()=>h.classList.add('hidden'),430);
}
function removeGrabRoot(obj){ grabRoots=grabRoots.filter(x=>x!==obj); if(obj?.parent) scene.remove(obj); }
function grabAction(){
  if(dead) return;
  const t=getGrabTarget(6.5);
  handReach();
  if(!t){ $('#message').textContent='NOTHING TO GRAB — PUT IT IN THE CROSSHAIR'; return; }
  const type=t.userData.grabType;
  if(type==='ember'){
    emberTouches++; $('#emberProgress').textContent=emberTouches+'/3'; combatFx(1.25,3);
    if(emberTouches>=3){
      emberCore=true; special=100; removeGrabRoot(goldenEmber); goldenEmber=null; $('#huntHud').classList.add('hidden'); $('#message').textContent='GOLDEN EMBER CAPTURED — EMBER CORE UNLOCKED!'; update(); transitioning=true; setTimeout(()=>completeLevel(),850);
    }else{
      $('#message').textContent=`GOT IT! ${emberTouches}/3 — IT ESCAPED AGAIN!`;
      goldenEmber.position.set((Math.random()-.5)*24,3,-24+Math.random()*44); pickEmberTarget();
    }
  }else if(type==='meat'){
    const i=drops.indexOf(t); if(i>=0) drops.splice(i,1); removeGrabRoot(t); meat++; special=Math.min(100,special+10); $('#message').textContent='🥩 MEAT GRABBED'; update();
  }else if(type==='toy'){
    const toy=t.userData.toyType; toyBag[toy]=(toyBag[toy]||0)+1; removeGrabRoot(t); $('#message').textContent=`FOUND: ${t.userData.grabLabel}! CHECK YOUR TOYBOX`; update();
  }else if(type==='football'){
    toyBag.football++; if(t===looseFootball) looseFootball=null; removeGrabRoot(t); $('#message').textContent='FOOTBALL PICKED UP'; update();
  }
}
function renderToyInventory(){
  const wrap=$('#toyInventory'); if(!wrap) return;
  wrap.innerHTML='';
  const rows=[['football','⚽','FOOTBALL'],['juggle','🔴','JUGGLING BALLS'],['duck','🦆','RUBBER DUCK'],['rocket','🚀','TOY ROCKET']];
  rows.forEach(([key,icon,name])=>{
    const n=toyBag[key]||0; if(!n) return;
    const row=document.createElement('div'); row.className='toyRow'; row.innerHTML=`<span>${icon} ${name} <b>x${n}</b></span><button>PLAY</button>`;
    row.querySelector('button').onclick=()=>playToy(key); wrap.appendChild(row);
  });
  if(!wrap.children.length) wrap.innerHTML='<small>No toys yet. Explore the Nethen and GRAB stuff.</small>';
}
function playToy(type){
  if(!(toyBag[type]>0) || !scene || !player) return;
  $('#inventory').classList.add('hidden');
  const forward=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw));
  const spawn=player.position.clone().addScaledVector(forward,2.8); spawn.y=.55;
  if(type==='juggle'){
    const g=toyObject('juggle',player.position.clone());
    grabRoots=grabRoots.filter(x=>x!==g); // animation only, not a pickup
    g.children.forEach(ch=>{ if(ch.type==='Sprite') ch.visible=false; });
    addToyFx(g,'juggle',5.5);
    $('#message').textContent='🤹 JUGGLING — LOOK AT YOUR CHARACTER!';
  }else if(type==='football'){
    if(looseFootball&&looseFootball.parent){ $('#message').textContent='YOUR FOOTBALL IS ALREADY OUT THERE'; return; }
    looseFootball=toyObject('football',spawn); looseFootball.userData.grabType='football'; looseFootball.userData.grabLabel='FOOTBALL'; looseFootball.userData.velocity=new THREE.Vector3();
    toyBag.football--; update(); $('#message').textContent='⚽ FOOTBALL OUT — AIM AT IT AND HIT TO KICK';
  }else if(type==='duck'){
    const d=toyObject('duck',spawn); d.userData.grabType='toy'; d.userData.toyType='duck'; d.userData.grabLabel='RUBBER DUCK'; addToyFx(d,'duck',12);
    $('#message').textContent='🦆 QUACK! THE DUCK IS WADDLING AROUND.';
  }else if(type==='rocket'){
    const r=toyObject('rocket',spawn); grabRoots=grabRoots.filter(x=>x!==r); r.children.forEach(ch=>{ if(ch.type==='Sprite') ch.visible=false; });
    const light=new THREE.PointLight(0xff8a18,5,10); light.position.set(-.5,0,0); r.add(light); r.userData.rocketLight=light; addToyFx(r,'rocket',3.6);
    $('#message').textContent='🚀 ROCKET LAUNCHED — WATCH IT GO!';
  }
}
function kickFootball(ball){
  if(!ball?.parent) return;
  const dir=new THREE.Vector3(0,.22,-1).applyQuaternion(player.quaternion).normalize();
  ball.userData.velocity=dir.multiplyScalar(10); attackCd=.28; $('#message').textContent='⚽ BOOTED!'; combatFx(.8,2);
}
function updateLooseFootball(dt){
  if(!looseFootball||!looseFootball.parent) return;
  const v=looseFootball.userData.velocity; if(!v) return;
  looseFootball.position.addScaledVector(v,dt); v.y-=5.2*dt; if(looseFootball.position.y<.5){looseFootball.position.y=.5; v.y=Math.abs(v.y)*.48;} v.multiplyScalar(Math.pow(.985,dt*60)); looseFootball.rotation.x+=v.z*dt; looseFootball.rotation.z-=v.x*dt;
}

// joystick
const joyEl=$('#joy'), knob=$('#joyKnob');
let joyId=null;
function joyMove(e){
  let r=joyEl.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2, dx=e.clientX-cx, dy=e.clientY-cy, max=r.width*.36, len=Math.hypot(dx,dy)||1;
  if(len>max){ dx=dx/len*max; dy=dy/len*max; }
  let nx=dx/max, ny=dy/max;
  const dead=.12;
  const mag=Math.hypot(nx,ny);
  if(mag<dead){ nx=0; ny=0; }
  else { const scaled=(mag-dead)/(1-dead); nx=nx/mag*scaled; ny=ny/mag*scaled; }
  joy.x=nx; joy.y=ny; knob.style.transform=`translate(${dx}px,${dy}px)`;
}
joyEl.onpointerdown=e=>{ joyId=e.pointerId; joyEl.setPointerCapture(e.pointerId); joyMove(e); };
joyEl.onpointermove=e=>{ if(e.pointerId===joyId) joyMove(e); };
joyEl.onpointerup=joyEl.onpointercancel=e=>{ if(e.pointerId!==joyId) return; joyId=null; joy={x:0,y:0}; knob.style.transform='translate(0,0)'; };

$('#attackBtn').onclick=()=>attack(false);
$('#grabBtn').onclick=()=>grabAction();
$('#inventoryBtn').onclick=()=>$('#inventory').classList.toggle('hidden');
$('#invClose').onclick=()=>$('#inventory').classList.add('hidden');
$('#eatBtn').onclick=()=>{ if(!meat) return; meat--; health=Math.min(100,health+30); special=Math.min(100,special+25); update(); };
$('#retryBtn').onclick=()=>{ health=100; startLevel(); };
$('#nextLevelBtn').onclick=()=>{ $('#levelClear').classList.add('hidden'); startLevel(); };
$('#completeMenu').onclick=()=>show('title');
$('#completeCreator').onclick=()=>show('creator');
$('#deathCreator').onclick=()=>show('creator');
$('#deathMenu').onclick=()=>show('title');


$('#enterBtn').onclick=async()=>{
  let b=$('#enterBtn'); b.disabled=true; b.textContent='OPENING NETHEN…';
  try{ await ensureThree(); show('game'); setTimeout(startRun,50); }
  catch(e){ alert('3D world could not load. Check the internet and try again.'); }
  finally{ b.disabled=false; b.textContent='ENTER THE NETHEN →'; }
};

addEventListener('resize',()=>{ positionCrosshair(Math.min(aim.px,innerWidth-34),Math.min(aim.py,innerHeight-34)); if(!renderer) return; camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });
