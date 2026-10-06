import * as THREE from 'three';

const $ = s => document.querySelector(s);
const screens = ['#titleScreen','#creatorScreen','#gameScreen'];
function show(id){ screens.forEach(s=>$(s).classList.toggle('active',s===id)); }

const gear = {
  head:[
    {name:'Ash Face', icon:'😠', color:'#c9865e'},
    {name:'Lava Skin', icon:'🔥', color:'#ff6c2f'},
    {name:'Shadow Head', icon:'👹', color:'#3d2837'},
    {name:'Stone Face', icon:'🗿', color:'#8b8277'},
    {name:'Ice Face', icon:'🥶', color:'#6bd7ed'},
    {name:'Toxic Face', icon:'☣', color:'#91c94a'}],
  hair:[
    {name:'Flame Spikes',icon:'🔥',color:'#ff571b'}, {name:'Night Spikes',icon:'✦',color:'#22152e'},
    {name:'Electric Blue',icon:'⚡',color:'#26b7ff'}, {name:'Acid Green',icon:'☄',color:'#9cff34'},
    {name:'Bone White',icon:'☠',color:'#eee8d8'}, {name:'Magma Gold',icon:'✹',color:'#ffb500'}],
  armor:[
    {name:'Nether Plate',icon:'⬢',color:'#501c1d'}, {name:'Obsidian Suit',icon:'◆',color:'#1d1925'},
    {name:'Lava Guard',icon:'🔥',color:'#c83b16'}, {name:'Tech Armor',icon:'▣',color:'#137f91'},
    {name:'Bone Armor',icon:'☠',color:'#c8b59b'}, {name:'Royal Doom',icon:'♛',color:'#572b78'}],
  shoes:[
    {name:'Magma Boots',icon:'⌁',color:'#ffb000'}, {name:'Shadow Boots',icon:'◼',color:'#1a1518'},
    {name:'Rocket Shoes',icon:'🚀',color:'#db2f36'}, {name:'Ice Steps',icon:'❄',color:'#70dbff'},
    {name:'Bone Stompers',icon:'☠',color:'#e6ddcb'}, {name:'Toxic Treads',icon:'☣',color:'#9fdc3f'}],
  weapon:[
    {name:'Fire Sword',icon:'⚔',color:'#ff5b17'}, {name:'Doom Axe',icon:'🪓',color:'#a74332'},
    {name:'Shock Hammer',icon:'🔨',color:'#5ce3ff'}, {name:'Bone Spear',icon:'🔱',color:'#e8d7b4'},
    {name:'Magma Blade',icon:'🗡',color:'#ffb000'}, {name:'Chaos Wand',icon:'✦',color:'#b55cff'}]
};
let selected={head:0,hair:0,armor:0,shoes:0,weapon:0};
let currentCat='head';

function renderOptions(){
  const q=$('#optionSearch').value.toLowerCase().trim();
  $('#optionTitle').textContent=currentCat.toUpperCase()+' OPTIONS';
  const grid=$('#optionGrid'); grid.innerHTML='';
  gear[currentCat].forEach((o,i)=>{
    if(q && !o.name.toLowerCase().includes(q)) return;
    const b=document.createElement('button'); b.className='optionCard'+(selected[currentCat]===i?' selected':'');
    b.innerHTML=`<span class="swatch" style="color:${o.color}">${o.icon}</span><small>${o.name}</small>`;
    b.onclick=()=>{selected[currentCat]=i;renderOptions();updateAvatar();}; grid.appendChild(b);
  });
}
function updateAvatar(){
  $('#avatarHead').style.background=gear.head[selected.head].color;
  $('#avatarHair').style.background=gear.hair[selected.hair].color;
  $('#avatarBody').style.background=gear.armor[selected.armor].color;
  $('#shoeLeft').style.background=$('#shoeRight').style.background=gear.shoes[selected.shoes].color;
  $('#avatarWeapon').textContent=gear.weapon[selected.weapon].icon;
  $('#avatarWeapon').style.color=gear.weapon[selected.weapon].color;
}
$('#startBtn').onclick=()=>show('#creatorScreen');
$('#creatorBack').onclick=()=>show('#titleScreen');
$('#categoryRail').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;currentCat=b.dataset.cat;document.querySelectorAll('.cat').forEach(x=>x.classList.toggle('active',x===b));$('#optionSearch').value='';renderOptions();});
$('#optionSearch').oninput=renderOptions;
$('#nameInput').oninput=e=>$('#fighterName').textContent=(e.target.value||'FIGHTER').toUpperCase();
$('#randomizeBtn').onclick=()=>{Object.keys(selected).forEach(k=>selected[k]=Math.floor(Math.random()*gear[k].length));renderOptions();updateAvatar();};
renderOptions(); updateAvatar();

let scene,camera,renderer,player,monster,monsterCore,clock,animId;
let health=100,special=0,enemyHealth=100,meat=0,blocking=false,gameOver=false;
let keys={forward:false,back:false,left:false,right:false};
let yaw=0,pitch=0,lastAttack=0;

function createBlock(x,y,z,w,h,d,color, emissive=0){
 const g=new THREE.BoxGeometry(w,h,d),m=new THREE.MeshStandardMaterial({color,roughness:.8,metalness:.05,emissive,emissiveIntensity:emissive?0.4:0}); const mesh=new THREE.Mesh(g,m);mesh.position.set(x,y,z);scene.add(mesh);return mesh;
}
function initGame(){
  if(renderer){ cancelAnimationFrame(animId); $('#gameCanvas').innerHTML=''; }
  scene=new THREE.Scene();scene.background=new THREE.Color(0x120504);scene.fog=new THREE.FogExp2(0x180604,.028);
  camera=new THREE.PerspectiveCamera(72,innerWidth/innerHeight,.1,200);
  player=new THREE.Object3D();player.position.set(0,1.7,12);player.add(camera);scene.add(player);
  renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;$('#gameCanvas').appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xff7a36,0x140204,1.4));const sun=new THREE.DirectionalLight(0xffb366,1.8);sun.position.set(10,18,8);scene.add(sun);
  createBlock(0,-.75,0,44,1.5,44,0x29100b);
  // glowing lava trenches
  for(let i=-18;i<=18;i+=6){createBlock(i,-.1,-7,2.5,.12,28,0xff4d08,0xff3000)}
  // platforms, basalt blocks
  [[-12,1,-10],[10,1,-14],[13,2,7],[-14,2,8],[-6,1,-17],[5,1,4]].forEach((p,i)=>createBlock(p[0],p[1],p[2],4+i%2*2,2+i%3,4,0x371816));
  // distant pillars
  for(let i=0;i<18;i++){const a=i/18*Math.PI*2,r=21;createBlock(Math.cos(a)*r,2.5,Math.sin(a)*r,2,5+Math.random()*7,2,0x24100e)}
  createMonster();
  health=100;special=0;enemyHealth=100;blocking=false;gameOver=false;updateHud();
  $('#victoryPanel').classList.add('hidden');$('#enemyHud').classList.remove('hidden');$('#message').textContent='Find the lava monster.';
  clock=new THREE.Clock(); setupLookControls(); animate();
}
function createMonster(){
  monster=new THREE.Group();monster.position.set(0,1.6,-10);
  const body=new THREE.Mesh(new THREE.BoxGeometry(2.6,2.8,2),new THREE.MeshStandardMaterial({color:0x3b0905,emissive:0xff2300,emissiveIntensity:.38,roughness:.65}));monster.add(body);
  const head=new THREE.Mesh(new THREE.BoxGeometry(2,1.6,1.8),new THREE.MeshStandardMaterial({color:0x641108,emissive:0xff4a00,emissiveIntensity:.5}));head.position.y=2.1;monster.add(head);
  const eyeMat=new THREE.MeshBasicMaterial({color:0xffe57a});[-.45,.45].forEach(x=>{const eye=new THREE.Mesh(new THREE.BoxGeometry(.32,.24,.12),eyeMat);eye.position.set(x,2.25,-.96);monster.add(eye)});
  monsterCore=new THREE.PointLight(0xff3d00,3,9);monsterCore.position.set(0,1,0);monster.add(monsterCore);scene.add(monster);
}
function setupLookControls(){
 const c=renderer.domElement;let touching=false,lastX=0,lastY=0;
 c.onpointerdown=e=>{if(e.clientX<innerWidth*.42)return;touching=true;lastX=e.clientX;lastY=e.clientY};
 c.onpointermove=e=>{if(!touching)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;yaw-=dx*.005;pitch=Math.max(-.65,Math.min(.65,pitch-dy*.004));player.rotation.y=yaw;camera.rotation.x=pitch};
 c.onpointerup=c.onpointercancel=()=>touching=false;
}
function updateHud(){
 $('#healthText').textContent=Math.max(0,Math.round(health));$('#healthBar').style.width=Math.max(0,health)+'%';
 $('#specialText').textContent=Math.round(special)+'%';$('#specialBar').style.width=special+'%';$('#specialBtn').disabled=special<100;
 $('#enemyBar').style.width=Math.max(0,enemyHealth)+'%';$('#meatCount').textContent=$('#inventoryMeat').textContent=meat;
}
function distanceToMonster(){return player.position.distanceTo(monster.position)}
function attack(mult=1){if(gameOver||Date.now()-lastAttack<450)return;lastAttack=Date.now();const d=distanceToMonster();if(d<5.2){const dmg=(18+Math.random()*8)*mult;enemyHealth-=dmg;special=Math.min(100,special+18);monster.scale.set(1.15,.85,1.15);setTimeout(()=>monster?.scale.set(1,1,1),90);$('#message').textContent=`HIT! ${Math.round(dmg)} damage`;if(enemyHealth<=0) defeatMonster();}else $('#message').textContent='Too far away! Get closer.';updateHud();}
function defeatMonster(){enemyHealth=0;gameOver=true;meat+=2;monster.visible=false;$('#enemyHud').classList.add('hidden');$('#message').textContent='LAVA MONSTER DEFEATED!';$('#victoryPanel').classList.remove('hidden');updateHud();}
$('#attackBtn').onclick=()=>attack(1);
$('#blockBtn').onpointerdown=()=>{blocking=true;$('#message').textContent='BLOCKING'};$('#blockBtn').onpointerup=$('#blockBtn').onpointercancel=()=>blocking=false;
$('#dodgeBtn').onclick=()=>{const side=new THREE.Vector3(1,0,0).applyQuaternion(player.quaternion);player.position.addScaledVector(side,Math.random()>.5?2.5:-2.5);special=Math.min(100,special+6);$('#message').textContent='DODGE!';updateHud();};
$('#specialBtn').onclick=()=>{if(special<100||gameOver)return;special=0;attack(2.8);$('#message').textContent='⚡ SPECIAL STRIKE!';updateHud();};
$('#inventoryBtn').onclick=()=>$('#inventoryPanel').classList.toggle('hidden');$('#inventoryClose').onclick=()=>$('#inventoryPanel').classList.add('hidden');
$('#eatMeatBtn').onclick=()=>{if(meat<=0){$('#message').textContent='No meat in inventory.';return;}meat--;health=Math.min(100,health+35);special=Math.min(100,special+28);$('#message').textContent='🥩 Ember Meat: +Health +Special';updateHud();};
$('#playAgainBtn').onclick=()=>initGame();
$('#enterNethenBtn').onclick=()=>{show('#gameScreen');setTimeout(initGame,30)};

function setMove(name,v){keys[name]=v}document.querySelectorAll('[data-move]').forEach(b=>{['pointerdown','touchstart'].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();setMove(b.dataset.move,true)},{passive:false}));['pointerup','pointercancel','pointerleave','touchend'].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();setMove(b.dataset.move,false)},{passive:false}));});
addEventListener('keydown',e=>{if(e.key==='w'||e.key==='ArrowUp')keys.forward=true;if(e.key==='s'||e.key==='ArrowDown')keys.back=true;if(e.key==='a'||e.key==='ArrowLeft')keys.left=true;if(e.key==='d'||e.key==='ArrowRight')keys.right=true});addEventListener('keyup',e=>{if(e.key==='w'||e.key==='ArrowUp')keys.forward=false;if(e.key==='s'||e.key==='ArrowDown')keys.back=false;if(e.key==='a'||e.key==='ArrowLeft')keys.left=false;if(e.key==='d'||e.key==='ArrowRight')keys.right=false});
let enemyAttackTimer=0;
function animate(){animId=requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);if(!renderer)return;
 const forward=new THREE.Vector3(0,0,-1).applyQuaternion(player.quaternion);forward.y=0;forward.normalize();const right=new THREE.Vector3(1,0,0).applyQuaternion(player.quaternion);right.y=0;right.normalize();const speed=7*dt;if(keys.forward)player.position.addScaledVector(forward,speed);if(keys.back)player.position.addScaledVector(forward,-speed);if(keys.left)player.position.addScaledVector(right,-speed);if(keys.right)player.position.addScaledVector(right,speed);player.position.x=Math.max(-19,Math.min(19,player.position.x));player.position.z=Math.max(-19,Math.min(19,player.position.z));
 if(monster&&monster.visible&&!gameOver){const t=performance.now()*.001;monster.position.y=1.6+Math.sin(t*2.6)*.18;monster.rotation.y=Math.sin(t*.9)*.15;const d=distanceToMonster();if(d<12){const dir=player.position.clone().sub(monster.position);dir.y=0;if(d>3.1)monster.position.addScaledVector(dir.normalize(),dt*(d<6?1.8:1.1));}
 enemyAttackTimer-=dt;if(d<3.8&&enemyAttackTimer<=0){enemyAttackTimer=1.35;const dmg=blocking?5:14;health-=dmg;$('#message').textContent=blocking?'BLOCKED! -5 health':'LAVA HIT! -14 health';if(health<=0){health=0;gameOver=true;$('#message').textContent='YOU WERE DEFEATED — eat meat next time!';}updateHud();}}
 renderer.render(scene,camera);
}
addEventListener('resize',()=>{if(!camera||!renderer)return;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
