let THREE=null;
let threePromise=null;
async function ensureThree(){
  if(THREE) return THREE;
  if(!threePromise) threePromise=import('https://unpkg.com/three@0.170.0/build/three.module.js').then(m=>THREE=m);
  return threePromise;
}
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
function show(id){$$('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active')}

const gear={
 head:[
  {name:'Ash Face',color:'#c88763',shape:'round',icon:'😠'},
  {name:'Lava Demon',color:'#ff5a20',shape:'horned',icon:'👹'},
  {name:'Shadow Skull',color:'#433344',shape:'skull',icon:'💀'},
  {name:'Stone Golem',color:'#a7a8ad',shape:'block',icon:'🗿'},
  {name:'Ice Spirit',color:'#a9d7ff',shape:'spirit',icon:'🥶'},
  {name:'Toxic Mask',color:'#87d943',shape:'mask',icon:'☣'}],
 hair:[
  {name:'Fire Spikes',color:'#ff5b17',shape:'spikes',icon:'🔥'},
  {name:'Black Mohawk',color:'#211717',shape:'mohawk',icon:'▴'},
  {name:'Blue Flame',color:'#44caff',shape:'flame',icon:'♨'},
  {name:'Long Red',color:'#9d1b16',shape:'long',icon:'〰'},
  {name:'Bone Crown',color:'#eee0ba',shape:'crown',icon:'♛'},
  {name:'No Hair',color:'transparent',shape:'none',icon:'○'}],
 armor:[
  {name:'Ember Plate',color:'#5d2421',shape:'plate',icon:'⬢'},
  {name:'Heavy Basalt',color:'#3b3b40',shape:'heavy',icon:'▣'},
  {name:'Inferno Tech',color:'#b62b18',shape:'tech',icon:'◆'},
  {name:'Bone Guard',color:'#d9c69d',shape:'bone',icon:'☠'},
  {name:'Toxic Shell',color:'#4e7c34',shape:'shell',icon:'⬡'},
  {name:'Shadow Coat',color:'#292034',shape:'coat',icon:'◈'}],
 shoes:[
  {name:'Ember Boots',color:'#ffb11c',shape:'boots',icon:'▰'},
  {name:'Stompers',color:'#69666a',shape:'stomp',icon:'▉'},
  {name:'Rocket Boots',color:'#58d9ff',shape:'rocket',icon:'🚀'},
  {name:'Claw Feet',color:'#d6c79e',shape:'claw',icon:'爪'},
  {name:'Shadow Steps',color:'#5b416e',shape:'slim',icon:'▬'},
  {name:'Lava Hooves',color:'#ff5422',shape:'hoof',icon:'◆'}],
 weapon:[
  {name:'Fire Sword',color:'#ff6a18',shape:'sword',icon:'⚔',damage:24},
  {name:'Basalt Axe',color:'#a6a6aa',shape:'axe',icon:'🪓',damage:29},
  {name:'Crusher Hammer',color:'#ffc04a',shape:'hammer',icon:'🔨',damage:34},
  {name:'Void Spear',color:'#a96dff',shape:'spear',icon:'🔱',damage:26},
  {name:'Demon Claws',color:'#ff3550',shape:'claw',icon:'爪',damage:20},
  {name:'Ice Blade',color:'#80e7ff',shape:'sword',icon:'🗡',damage:25}]
};
let selected={head:0,hair:0,armor:0,shoes:0,weapon:0},currentCat='head';

function applyHeadShape(el,o){
  el.className='avatarHead head-'+o.shape;
  el.style.background=o.color;
  let extras='<div class="faceEyes"></div>';
  if(o.shape==='horned') extras+='<i class="horn hornL"></i><i class="horn hornR"></i>';
  if(o.shape==='skull') extras+='<i class="skullJaw"></i><i class="skullNose"></i>';
  if(o.shape==='block') extras+='<i class="golemBrow"></i>';
  if(o.shape==='spirit') extras+='<i class="spiritTail"></i>';
  if(o.shape==='mask') extras+='<i class="maskPlate"></i>';
  el.innerHTML=extras;
}
function applyHairShape(el,o){
  el.className='avatarHair hair-'+o.shape;
  el.style.background=o.color;
  el.innerHTML='';
  if(o.shape==='none'){el.style.display='none';return}
  el.style.display='block';
  if(o.shape==='spikes') el.innerHTML='<i></i><i></i><i></i><i></i><i></i>';
  if(o.shape==='long') el.innerHTML='<i class="longLock left"></i><i class="longLock right"></i>';
  if(o.shape==='crown') el.innerHTML='<i></i><i></i><i></i>';
}
function applyArmorShape(el,o){
  el.className='avatarBody armor-'+o.shape;
  el.style.background=o.color;
  el.innerHTML='';
  const L=$('#shoulderLeft'),R=$('#shoulderRight');
  L.className='avatarShoulder left armorShoulder '+o.shape;
  R.className='avatarShoulder right armorShoulder '+o.shape;
  L.style.background=R.style.background=o.color;
  L.style.display=R.style.display=o.shape==='coat'?'none':'block';
  if(o.shape==='tech') el.innerHTML='<i class="techCore"></i>';
  if(o.shape==='bone') el.innerHTML='<i class="boneRib r1"></i><i class="boneRib r2"></i><i class="boneRib r3"></i>';
  if(o.shape==='shell') el.innerHTML='<i class="shellPlate"></i>';
  if(o.shape==='coat') el.innerHTML='<i class="coatTail left"></i><i class="coatTail right"></i>';
}
function applyShoes(o){
  for(const [idx,el] of [$('#shoeLeft'),$('#shoeRight')].entries()){
    el.className='avatarShoe '+(idx===0?'left ':'right ')+'shoe-'+o.shape;
    el.style.background=o.color;
    el.innerHTML='';
    if(o.shape==='rocket') el.innerHTML='<i class="rocketFlame"></i>';
    if(o.shape==='claw') el.innerHTML='<i></i><i></i><i></i>';
  }
}
function renderPreviewWeapon(o){const w=$('#avatarWeapon');w.innerHTML='<span class="weaponPreviewBlade"></span><span class="weaponPreviewGuard"></span><span class="weaponPreviewGrip"></span>';w.className='avatarWeapon '+o.shape;const blade=w.querySelector('.weaponPreviewBlade');const grip=w.querySelector('.weaponPreviewGrip');const guard=w.querySelector('.weaponPreviewGuard');blade.style.background=o.color;if(o.shape==='axe'){blade.style.width='72px';blade.style.height='58px';blade.style.left='2px';blade.style.top='12px';blade.style.clipPath='polygon(18% 0,100% 18%,82% 100%,18% 82%,0 50%)';grip.style.height='105px';grip.style.top='48px';grip.style.left='34px';guard.style.display='none'}else if(o.shape==='hammer'){blade.style.width='76px';blade.style.height='42px';blade.style.left='0';blade.style.top='16px';blade.style.clipPath='none';grip.style.height='108px';grip.style.top='47px';grip.style.left='30px';guard.style.display='none'}else if(o.shape==='spear'){blade.style.width='36px';blade.style.height='54px';blade.style.left='21px';blade.style.clipPath='polygon(50% 0,100% 45%,65% 100%,35% 100%,0 45%)';grip.style.height='130px';grip.style.top='44px';guard.style.display='none'}else if(o.shape==='claw'){w.innerHTML='<span style="position:absolute;left:15px;top:20px;font-size:72px;color:'+o.color+'">爪</span>'} }
function updateAvatar(){applyHeadShape($('#avatarHead'),gear.head[selected.head]);applyHairShape($('#avatarHair'),gear.hair[selected.hair]);applyArmorShape($('#avatarBody'),gear.armor[selected.armor]);applyShoes(gear.shoes[selected.shoes]);renderPreviewWeapon(gear.weapon[selected.weapon]);}
function renderOptions(){const q=$('#optionSearch').value.toLowerCase().trim();$('#optionTitle').textContent=currentCat.toUpperCase()+' OPTIONS';const grid=$('#optionGrid');grid.innerHTML='';gear[currentCat].forEach((o,i)=>{if(q&&!o.name.toLowerCase().includes(q))return;const b=document.createElement('button');b.className='optionCard'+(selected[currentCat]===i?' selected':'');b.innerHTML=`<span class="swatch" style="color:${o.color}">${o.icon}</span><small>${o.name}</small>`;b.onclick=()=>{selected[currentCat]=i;renderOptions();updateAvatar()};grid.appendChild(b)})}
$('#startBtn').onclick=()=>show('#creatorScreen');$('#creatorBack').onclick=()=>show('#titleScreen');$('#categoryRail').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;currentCat=b.dataset.cat;$$('.cat').forEach(x=>x.classList.toggle('active',x===b));$('#optionSearch').value='';renderOptions()});$('#optionSearch').oninput=renderOptions;$('#nameInput').oninput=e=>$('#fighterName').textContent=(e.target.value||'FIGHTER').toUpperCase();$('#randomizeBtn').onclick=()=>{Object.keys(selected).forEach(k=>selected[k]=Math.floor(Math.random()*gear[k].length));renderOptions();updateAvatar()};renderOptions();updateAvatar();

let scene,camera,renderer,player,monster,clock,animId,heldModel;let health=100,special=0,enemyHealth=100,meat=0,blocking=false,dead=false,victory=false;let keys={forward:false,back:false,left:false,right:false};let yaw=0,pitch=0;let attackCooldown=0,dodgeCooldown=0,enemyState='idle',enemyTimer=0,enemyCooldown=1.4;let drops=[];
function createBlock(x,y,z,w,h,d,color,emissive=0){const g=new THREE.BoxGeometry(w,h,d),m=new THREE.MeshStandardMaterial({color,roughness:.82,metalness:.03,emissive,emissiveIntensity:emissive?.55:0});const mesh=new THREE.Mesh(g,m);mesh.position.set(x,y,z);scene.add(mesh);return mesh}
function setupWorld(){scene=new THREE.Scene();scene.background=new THREE.Color(0x120504);scene.fog=new THREE.FogExp2(0x160503,.035);scene.add(new THREE.HemisphereLight(0xff6d34,0x0a0201,1.4));const dl=new THREE.DirectionalLight(0xffad6a,1.5);dl.position.set(8,18,10);scene.add(dl);createBlock(0,-.8,0,28,1.5,58,0x27100c);for(let z=18;z>-24;z-=6){createBlock(-7,-.15,z,4,.18,4,0xff4a08,0xff2500);createBlock(7,-.15,z,4,.18,4,0xff4a08,0xff2500)}for(let z=14;z>-20;z-=8){createBlock(-11,1,z,3,2+Math.abs(z)%3,3,0x3c1712);createBlock(11,1,z-3,3,3,3,0x3c1712)}createBlock(0,.35,-16,11,.6,9,0x3c1712);createBlock(0,.8,-22,16,1.6,2,0x1d0b09)}
function createMonster(){monster=new THREE.Group();monster.position.set(0,1.6,-16);const body=new THREE.Mesh(new THREE.BoxGeometry(3,3.2,2.4),new THREE.MeshStandardMaterial({color:0x521008,emissive:0xff2a00,emissiveIntensity:.36}));monster.add(body);const head=new THREE.Mesh(new THREE.BoxGeometry(2.4,1.8,2.1),new THREE.MeshStandardMaterial({color:0x741709,emissive:0xff4f00,emissiveIntensity:.46}));head.position.y=2.45;monster.add(head);[-.5,.5].forEach(x=>{const e=new THREE.Mesh(new THREE.BoxGeometry(.34,.28,.14),new THREE.MeshBasicMaterial({color:0xfff39b}));e.position.set(x,2.55,1.08);monster.add(e)});for(const sx of [-1,1]){const horn=new THREE.Mesh(new THREE.ConeGeometry(.32,1.05,4),new THREE.MeshStandardMaterial({color:0x23100b}));horn.position.set(sx*.88,3.65,0);horn.rotation.z=sx*.35;monster.add(horn)}const glow=new THREE.PointLight(0xff3b00,4,11);glow.position.set(0,1,0);monster.add(glow);scene.add(monster)}
function updateHeldWeapon(){const o=gear.weapon[selected.weapon],h=$('#heldWeapon');h.className='heldWeapon '+o.shape;h.querySelector('.weaponBlade').style.background=o.color}
function initGame(){if(renderer){cancelAnimationFrame(animId);$('#gameCanvas').innerHTML=''};health=100;special=0;enemyHealth=100;blocking=false;dead=false;victory=false;attackCooldown=0;dodgeCooldown=0;enemyState='idle';enemyTimer=0;enemyCooldown=1.5;drops=[];yaw=0;pitch=0;scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(72,innerWidth/innerHeight,.1,200);player=new THREE.Object3D();player.position.set(0,1.7,17);player.add(camera);scene.add(player);renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);$('#gameCanvas').appendChild(renderer.domElement);setupWorld();createMonster();updateHeldWeapon();$('#deathPanel').classList.add('hidden');$('#victoryPanel').classList.add('hidden');$('#enemyHud').classList.remove('hidden');$('#attackWarning').classList.add('hidden');$('#message').textContent='Follow the burning path to the Lava Monster.';updateHud();setupLookControls();clock=new THREE.Clock();animate()}
function setupLookControls(){const c=renderer.domElement;let active=false,lx=0,ly=0;c.onpointerdown=e=>{if(e.clientX<innerWidth*.38)return;active=true;lx=e.clientX;ly=e.clientY};c.onpointermove=e=>{if(!active)return;const dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;yaw-=dx*.005;pitch=Math.max(-.62,Math.min(.62,pitch-dy*.004));player.rotation.y=yaw;camera.rotation.x=pitch};c.onpointerup=c.onpointercancel=()=>active=false}
function updateHud(){$('#healthText').textContent=Math.max(0,Math.round(health));$('#healthBar').style.width=Math.max(0,health)+'%';$('#specialText').textContent=Math.round(special)+'%';$('#specialBar').style.width=special+'%';$('#specialBtn').disabled=special<100||dead||victory;$('#enemyBar').style.width=Math.max(0,enemyHealth)+'%';$('#meatCount').textContent=$('#inventoryMeat').textContent=meat;$('#dodgeBtn').classList.toggle('cooldown',dodgeCooldown>0)}
function monsterDistance(){return player.position.distanceTo(monster.position)}
function facingMonster(){const forward=new THREE.Vector3(0,0,-1).applyQuaternion(player.quaternion).normalize();const dir=monster.position.clone().sub(player.position).setY(0).normalize();return forward.dot(dir)>.54}
function weaponAnim(kind='swing'){const h=$('#heldWeapon');h.classList.remove('swing','specialSwing');void h.offsetWidth;h.classList.add(kind);setTimeout(()=>h.classList.remove(kind),400)}
function playerAttack(isSpecial=false){if(dead||victory||attackCooldown>0)return;if(isSpecial&&special<100)return;attackCooldown=isSpecial?.65:.35;weaponAnim(isSpecial?'specialSwing':'swing');if(isSpecial)special=0;const d=monsterDistance();if(d<4.7&&facingMonster()){const base=gear.weapon[selected.weapon].damage;const dmg=isSpecial?base*2.6:base*(.82+Math.random()*.25);enemyHealth-=dmg;special=Math.min(100,special+(isSpecial?0:15));monster.position.add(new THREE.Vector3(0,0,-.45).applyQuaternion(player.quaternion));$('#message').textContent=isSpecial?`⚡ SPECIAL! ${Math.round(dmg)} DAMAGE`:`HIT! ${Math.round(dmg)} DAMAGE`;if(enemyHealth<=0)killMonster()}else $('#message').textContent=d>=4.7?'TOO FAR — GET CLOSER':'AIM AT THE MONSTER';updateHud()}
function createMeatDrop(pos){const g=new THREE.Group();for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.55,.28,.34),new THREE.MeshStandardMaterial({color:i===1?0xff8765:0xb4231c,emissive:0x5d0900,emissiveIntensity:.25}));m.position.set((i-1)*.36,.18+Math.abs(i-1)*.1,(i%2)*.15);m.rotation.y=i*.7;g.add(m)}g.position.copy(pos);g.position.y=.35;scene.add(g);drops.push({mesh:g,value:1})}
function killMonster(){enemyHealth=0;victory=true;monster.visible=false;$('#enemyHud').classList.add('hidden');$('#attackWarning').classList.add('hidden');createMeatDrop(monster.position.clone().add(new THREE.Vector3(-1,0,0)));createMeatDrop(monster.position.clone().add(new THREE.Vector3(1,0,.4)));$('#message').textContent='MONSTER DOWN — COLLECT THE MEAT!';updateHud()}
function collectDrops(){for(let i=drops.length-1;i>=0;i--){const d=drops[i];d.mesh.rotation.y+=.03;if(player.position.distanceTo(d.mesh.position)<1.8){scene.remove(d.mesh);drops.splice(i,1);meat+=d.value;special=Math.min(100,special+8);$('#message').textContent='🥩 EMBER MEAT COLLECTED';updateHud()}}if(victory&&drops.length===0&&!dead&&!$('#victoryPanel').classList.contains('showed')){const p=$('#victoryPanel');p.classList.remove('hidden');p.classList.add('showed')}}
function damagePlayer(amount){if(dead)return;health=Math.max(0,health-amount);if(health<=0){dead=true;blocking=false;$('#attackWarning').classList.add('hidden');$('#message').textContent='YOU WERE DEFEATED';$('#deathPanel').classList.remove('hidden')}updateHud()}
function enemyLogic(dt){if(!monster.visible||dead||victory)return;const d=monsterDistance();monster.position.y=1.6+Math.sin(performance.now()*.004)*.12;const dir=player.position.clone().sub(monster.position);dir.y=0;if(enemyState==='idle'){enemyCooldown-=dt;if(d<11&&d>3.3)monster.position.addScaledVector(dir.normalize(),dt*1.8);if(d<=3.8&&enemyCooldown<=0){enemyState='windup';enemyTimer=.8;$('#attackWarning').classList.remove('hidden');$('#message').textContent='BLOCK OR DODGE!';monster.scale.set(1.12,.92,1.12)}}else if(enemyState==='windup'){enemyTimer-=dt;if(enemyTimer<=0){$('#attackWarning').classList.add('hidden');enemyState='strike';enemyTimer=.18;monster.scale.set(.95,1.18,.95);if(d<4.4){if(blocking){damagePlayer(3);special=Math.min(100,special+12);$('#message').textContent='PERFECT BLOCK! +SPECIAL'}else{damagePlayer(18);$('#message').textContent='LAVA SMASH! -18'}}else $('#message').textContent='DODGED!';updateHud()}}else if(enemyState==='strike'){enemyTimer-=dt;if(enemyTimer<=0){enemyState='recover';enemyTimer=.65;monster.scale.set(1,1,1)}}else if(enemyState==='recover'){enemyTimer-=dt;if(enemyTimer<=0){enemyState='idle';enemyCooldown=1.15+Math.random()*.5}}}
function dodge(){if(dead||victory||dodgeCooldown>0)return;dodgeCooldown=1.2;const right=new THREE.Vector3(1,0,0).applyQuaternion(player.quaternion);player.position.addScaledVector(right,Math.random()>.5?3.1:-3.1);$('#message').textContent='DODGE!';updateHud()}
$('#attackBtn').onclick=()=>playerAttack(false);$('#specialBtn').onclick=()=>playerAttack(true);$('#blockBtn').onpointerdown=()=>{if(dead)return;blocking=true;$('#blockBtn').classList.add('active')};$('#blockBtn').onpointerup=$('#blockBtn').onpointercancel=()=>{blocking=false;$('#blockBtn').classList.remove('active')};$('#dodgeBtn').onclick=dodge;$('#inventoryBtn').onclick=()=>$('#inventoryPanel').classList.toggle('hidden');$('#inventoryClose').onclick=()=>$('#inventoryPanel').classList.add('hidden');$('#eatMeatBtn').onclick=()=>{if(meat<=0){$('#message').textContent='NO MEAT IN INVENTORY';return}meat--;health=Math.min(100,health+30);special=Math.min(100,special+25);$('#message').textContent='🥩 +30 HEALTH  +25 SPECIAL';updateHud()};
function toCreator(){cancelAnimationFrame(animId);show('#creatorScreen')}function toMenu(){cancelAnimationFrame(animId);show('#titleScreen')}$('#retryBtn').onclick=initGame;$('#fightAgainBtn').onclick=()=>{const p=$('#victoryPanel');p.classList.remove('showed');initGame()};$('#deathCreatorBtn').onclick=toCreator;$('#victoryCreatorBtn').onclick=toCreator;$('#deathMenuBtn').onclick=toMenu;$('#victoryMenuBtn').onclick=toMenu;$('#enterNethenBtn').onclick=async()=>{ const btn=$('#enterNethenBtn'); const old=btn.textContent; btn.textContent='OPENING NETHEN…'; btn.disabled=true; try{ await ensureThree(); show('#gameScreen'); setTimeout(initGame,40); }catch(e){ console.error(e); alert('The 3D world could not load. Check internet and try again.'); } finally { btn.textContent=old; btn.disabled=false; } };
function setMove(k,v){keys[k]=v}$$('[data-move]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();setMove(b.dataset.move,true)});['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();setMove(b.dataset.move,false)}))});addEventListener('keydown',e=>{if(e.key==='w'||e.key==='ArrowUp')keys.forward=true;if(e.key==='s'||e.key==='ArrowDown')keys.back=true;if(e.key==='a'||e.key==='ArrowLeft')keys.left=true;if(e.key==='d'||e.key==='ArrowRight')keys.right=true;if(e.code==='Space')playerAttack(false)});addEventListener('keyup',e=>{if(e.key==='w'||e.key==='ArrowUp')keys.forward=false;if(e.key==='s'||e.key==='ArrowDown')keys.back=false;if(e.key==='a'||e.key==='ArrowLeft')keys.left=false;if(e.key==='d'||e.key==='ArrowRight')keys.right=false});
function animate(){animId=requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);attackCooldown=Math.max(0,attackCooldown-dt);dodgeCooldown=Math.max(0,dodgeCooldown-dt);if(!dead){const f=new THREE.Vector3(0,0,-1).applyQuaternion(player.quaternion);f.y=0;f.normalize();const r=new THREE.Vector3(1,0,0).applyQuaternion(player.quaternion);r.y=0;r.normalize();const speed=6.2*dt;if(keys.forward)player.position.addScaledVector(f,speed);if(keys.back)player.position.addScaledVector(f,-speed);if(keys.left)player.position.addScaledVector(r,-speed);if(keys.right)player.position.addScaledVector(r,speed);player.position.x=Math.max(-10.5,Math.min(10.5,player.position.x));player.position.z=Math.max(-23,Math.min(21,player.position.z));enemyLogic(dt);collectDrops()}renderer.render(scene,camera)}
addEventListener('resize',()=>{if(!camera||!renderer)return;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
