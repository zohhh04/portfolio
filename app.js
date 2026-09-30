/* Zeba Fathima — reference-style fullpage + pookie stack groups */
(function(){
'use strict';
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

/* ---------- DATA — all Zeba's ---------- */
const PROJECTS=[
  {name:"Redora",cat:"AI for Social Good",emoji:"🩸",
   tech:["MongoDB","Express","React","Node.js","JWT","Geolocation","Gemini API"],
   desc:"Full-stack blood donation platform connecting donors, recipients, hospitals and blood banks in real time.",
   hl:["AI-based donor matching with live journey tracking + geolocation","OTP email verification and donation certificates","Donors accept/decline requests; patients follow a shared timeline"]},
  {name:"Foodiq",cat:"AI + Full-Stack",emoji:"🍜",
   tech:["React","Node.js","Express","MongoDB","Socket.io","scikit-learn","Tailwind"],
   desc:"AI-driven smart canteen ordering and queue optimization with real-time order updates.",
   hl:["ML-powered personalized food recommendations","Accurate wait-time predictions to cut queue chaos","Live order tracking through a friendly customer app"]},
  {name:"CipherChat",cat:"Security + Realtime",emoji:"🔐",
   tech:["React","Node.js","MongoDB","Socket.IO","E2EE","WebCrypto","Docker"],
   desc:"Production-ready end-to-end encrypted real-time chat on the MERN stack — the server never sees plaintext.",
   hl:["ECDH key exchange + AES-256-GCM encryption","1-to-1 & group chats, file sharing, calls","Typing indicators and read receipts"]},
  {name:"Cake-and-Chaos",cat:"Creative Frontend",emoji:"🎂",
   tech:["React","Vite","JavaScript","CSS3","canvas-confetti"],
   desc:"Fun interactive birthday surprise site — a personalized adventure for the birthday star.",
   hl:["Name-gate entry, missions, letter, cake-cutting, mini-games","4 switchable themes, starfield, typewriter + sound","Zero backend — pure frontend magic with confetti finale"]},
];
/* 4 most important credentials */
const CERTS=[
  {t:"⚙️ Certified Application Developer (CAD)",m:["ServiceNow","Application Developer","2025"],d:"Industry-recognized validation of end-to-end application development on the ServiceNow platform — from data model to delightful UI.",i:"Scoped apps, tables & ACLs, Flow Designer automation, server/client scripting, integrations via REST, studio & update sets. Built a demo catalog app with approval flows."},
  {t:"🛡️ Certified System Administrator (CSA)",m:["ServiceNow","System Administrator","2025"],d:"Core platform administration — keeping instances healthy, secure and well-organized for real teams and real users.",i:"Users, groups & roles, CMDB basics, service catalog, knowledge, reports & dashboards, PDI labs with 40+ guided tasks."},
  {t:"☕ PwC Technical Trainee — Java & Modern Data Systems",m:["PwC","Micro-certification 2/5 + 3/5"],d:"Intensive engineering track: rock-solid Java OOP plus how modern data stacks store, query and stream information at scale.",i:"Java: OOP, collections, exception handling, JDBC mini-project. Data: SQL mastery, NoSQL vs SQL trade-offs, ETL basics, data modelling for MERN apps."},
  {t:"🤖 PwC Technical Trainee — Generative AI & Professional Skills",m:["PwC","Micro-certification 4/5 + 5/5"],d:"Applied Generative AI for real work plus the soft skills that make engineers great consultants — communication, teamwork and storytelling.",i:"GenAI: prompt engineering, RAG concepts, Gemini API bots, responsible-AI practices. Soft skills: agile teamwork, client emails, resume & interview labs."},
];
const LOVE=["Full-stack MERN builds","AI features & chatbots","Hackathons & teams","UI polish & responsive design"];
const STACK_FLAT=["MERN Stack","React.js","JavaScript","HTML/CSS","Tailwind CSS","Node.js","Express.js","MongoDB","REST APIs","Gemini API","RAG","Socket.IO","Docker","Git & GitHub","Vercel","Postman"];
/* keyboard maps A–Z to the real stack */
const KEYS={
  A:["AI-Powered Apps","Real features — donor matching, recommendations, chatbots 🤖"],
  B:["Backend APIs","REST endpoints + auth flows that power every product 🔌"],
  C:["C++","Performance-minded coding & contest practice ⚡"],
  D:["Docker","Containerized apps like CipherChat that run anywhere 🐳"],
  E:["Express.js","Middleware, routing & JWT auth for MERN backends 🚂"],
  F:["Frontend Magic","Playful, polished UIs — see Cake-and-Chaos 🎂"],
  G:["Gemini API","AI chatbots & RAG grounded in real data ✨"],
  H:["HTML/CSS","Clean semantic markup with polished styling 🎨"],
  I:["AI Chatbots","Friendly assistants with memory 💬"],
  J:["Java","OOP foundations from coursework + PwC training ☕"],
  K:["Kanban Teamwork","Hackathon energy — fast prototypes, kind reviews 🤝"],
  L:["Leadership","Owning outcomes & lifting people around me 🚀"],
  M:["MongoDB","Flexible docs for users, orders, chats & requests 🍃"],
  N:["Node.js","Scalable backends & realtime servers 🟢"],
  O:["OOP Design","Clean models & reusable components 🧩"],
  P:["Postman","Every API tested before the frontend trusts it 📮"],
  Q:["Quality / QA","Debugging, edge cases & honest timelines 🔍"],
  R:["React.js","Component-driven interactive frontends ⚛️"],
  S:["Socket.IO","Typing indicators, live tracking, realtime chat 🔴"],
  T:["Tailwind CSS","Fast responsive layouts, utility-first 💨"],
  U:["UX Polish","Rounded corners, soft palettes & micro-joy 🌸"],
  V:["Vercel","One-click free deploys for frontend projects ▲"],
  W:["WebCrypto / E2EE","ECDH + AES-256-GCM — server never sees plaintext 🔐"],
  X:["eXpress Debugging","chai + lo-fi + console.log detective work ☕"],
  Y:["sYstem Design Basics","APIs, DB models & realtime flows that scale 🏗️"],
  Z:["Zeba OS","MERN × AI builder · 9.3 CGPA · ships with heart 💗"],
};

/* ---------- FULLPAGE NAV (5 sections) ---------- */
const TOTAL=5, IDS=['hero','skills','projects','certs','contact'], TRANS=850;
let cur=0, anim=false;
const pages=$$('.page'), prog=$('#scrollProgress'), hint=$('#scrollHint');
function goTo(t){
  if(anim||t<0||t>=TOTAL||t===cur)return;
  anim=true;cur=t;
  pages.forEach(p=>p.classList.remove('is-active','is-prev'));
  void pages[cur].offsetWidth;
  pages.forEach((p,i)=>{if(i===cur)p.classList.add('is-active');else if(i<cur)p.classList.add('is-prev');});
  if(pages[cur])pages[cur].scrollTop=0;
  if(prog)prog.style.width=(((cur+1)/TOTAL)*100)+'%';
  if(hint)hint.classList.toggle('hidden',cur===TOTAL-1);
  if(history.replaceState)history.replaceState(null,'','#'+IDS[cur]);
  setTimeout(()=>anim=false,TRANS);
}
(function init(){
  const idx=IDS.indexOf(location.hash.replace('#',''));
  const s=idx>=0?idx:0;
  pages.forEach((p,i)=>{p.classList.remove('is-active','is-prev');if(i===s)p.classList.add('is-active');else if(i<s)p.classList.add('is-prev');});
  cur=s;
  if(prog)prog.style.width=(((cur+1)/TOTAL)*100)+'%';
  if(hint&&s===TOTAL-1)hint.classList.add('hidden');
})();
function scrollable(el){if(!el)return false;const o=getComputedStyle(el).overflowY;if(o==='hidden'||o==='visible')return false;return el.scrollHeight>el.clientHeight+2;}
let lastW=0;
addEventListener('wheel',e=>{
  const a=pages[cur];
  if(a&&scrollable(a)){const d=a.scrollTop+a.clientHeight<a.scrollHeight-2,u=a.scrollTop>2;if(e.deltaY>0&&d)return;if(e.deltaY<0&&u)return;}
  e.preventDefault();
  const n=Date.now();if(n-lastW<100||anim)return;lastW=n;
  if(e.deltaY>30)goTo(cur+1);else if(e.deltaY<-30)goTo(cur-1);
},{passive:false});
let tsY=0,tsT=0,tsOn=false;
addEventListener('touchstart',e=>{tsY=e.touches[0].clientY;tsT=Date.now();tsOn=true;},{passive:true});
addEventListener('touchend',e=>{
  if(!tsOn)return;tsOn=false;
  const d=tsY-e.changedTouches[0].clientY,dt=Date.now()-tsT;
  if(Math.abs(d)<50||dt>600||anim)return;
  const a=pages[cur];
  if(a&&scrollable(a)){const dn=a.scrollTop+a.clientHeight<a.scrollHeight-2,up=a.scrollTop>2;if(d>0&&dn)return;if(d<0&&up)return;}
  if(d>0)goTo(cur+1);else goTo(cur-1);
},{passive:true});
$$('[data-goto]').forEach(l=>l.addEventListener('click',e=>{e.preventDefault();$('#projModal')?.classList.remove('is-open');goTo(parseInt(l.getAttribute('data-goto'),10));}));

/* keyboard shortcuts: 1-5 jump, arrows move, T theme — A-Z + Space work only on skills */
addEventListener('keydown',e=>{
  if(e.target.matches('input,textarea'))return;
  const k=e.key.toUpperCase();
  if(k==='ESCAPE'){$('#projModal').classList.remove('is-open');return;}
  if(['1','2','3','4','5'].includes(k)){goTo(+k-1);return;}
  if(k===' '){if(cur===1){e.preventDefault();pressKey('SPACE');}return;}
  if(KEYS[k]){if(cur===1)pressKey(k,false);return;}
  if(anim)return;
  if(k==='ARROWDOWN'||k==='PAGEDOWN'){e.preventDefault();goTo(cur+1);}
  else if(k==='ARROWUP'||k==='PAGEUP'){e.preventDefault();goTo(cur-1);}
  else if(k==='HOME'){e.preventDefault();goTo(0);}
  else if(k==='END'){e.preventDefault();goTo(TOTAL-1);}
  else if(k==='T')$('#themeToggle').click();
});

/* ---------- THEME ---------- */
const html=document.documentElement;
$('#themeToggle').addEventListener('click',()=>{
  const c=html.getAttribute('data-theme')||'dark';
  const n=c==='dark'?'light':'dark';
  html.setAttribute('data-theme',n);localStorage.setItem('theme',n);
  const m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',n==='light'?'#fafafc':'#0a0a0f');
});
$('#copyrightYear').textContent=new Date().getFullYear();

/* ---------- tiny click sound + stack voice (voice toggle lives only at stacks) ---------- */
let soundOn=true, voiceOn=true, actx=null;
function speak(t){if(!voiceOn)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=1.02;u.pitch=1.1;speechSynthesis.speak(u);}catch(e){}}
function blip(f=520,d=.06){if(!soundOn)return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const o=actx.createOscillator(),g=actx.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.05;o.connect(g);g.connect(actx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+d);o.stop(actx.currentTime+d);}catch(e){}}
function keyClick(){blip(300+Math.random()*500,.06);setTimeout(()=>blip(180,.05),40);}
$('#soundBtn').addEventListener('click',e=>{soundOn=!soundOn;e.target.textContent=soundOn?'🔊 sound: on':'🔇 sound: off';e.target.classList.toggle('on',soundOn);if(soundOn)keyClick();});
$('#kbVoiceBtn').addEventListener('click',e=>{voiceOn=!voiceOn;e.target.textContent=voiceOn?'🎙 voice: on':'🎙 voice: off';e.target.classList.toggle('on',voiceOn);});

/* ---------- CURSOR (purple only, native hidden via CSS) ---------- */
const desk=matchMedia('(hover:hover) and (min-width:992px)').matches;
if(desk){
  const dot=$('.cursor-dot'),ring=$('.cursor-ring');
  let mx=0,my=0,rx=0,ry=0,vis=false;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(!vis&&dot&&ring){dot.style.opacity='1';ring.style.opacity='1';vis=true;}if(dot)dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;});
  (function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;if(ring)ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
  const hov=()=>{dot?.classList.add('is-hovering');ring?.classList.add('is-hovering');};
  const unh=()=>{dot?.classList.remove('is-hovering');ring?.classList.remove('is-hovering');};
  $$('a,button,.project-card,.cert-card,.key,.form-control').forEach(el=>{el.addEventListener('mouseenter',hov);el.addEventListener('mouseleave',unh);});
}

/* ---------- PARTICLES ---------- */
(function(){
  const box=$('#particles');if(!box)return;
  const n=desk?22:12,f=document.createDocumentFragment();
  for(let i=0;i<n;i++){const p=document.createElement('span');p.className='particle'+(i%3===0?' particle-cyan':'');p.style.left=Math.random()*100+'%';p.style.animationDuration=(9+Math.random()*12)+'s';p.style.animationDelay=(Math.random()*9)+'s';const s=1.5+Math.random()*2.5;p.style.width=s+'px';p.style.height=s+'px';f.appendChild(p);}
  box.appendChild(f);
})();

/* ---------- (scramble effect removed — clean static text) ---------- */

/* ---------- CLOCK + LIVE + VIBE ---------- */
function tick(){try{$('#clock').textContent=new Intl.DateTimeFormat('en-IN',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(new Date());}catch(e){$('#clock').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});}}
tick();setInterval(tick,15000);
let live=parseInt(localStorage.getItem('zf-live')||'0',10)+1;
localStorage.setItem('zf-live',live);$('#liveCount').textContent=live;
const vibes=["RAG chatbots","MERN apps","hackathons","Gemini API","realtime chat"];let vi=0;
setInterval(()=>{vi=(vi+1)%vibes.length;const v=$('#vibe');if(v)v.textContent=vibes[vi];},2500);

/* ---------- KEYBOARD (A–Z stack, fits one screen) ---------- */
const kb=$('#keyboard'),found=new Set();
const rows=[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]];
rows.forEach(r=>{const d=document.createElement('div');d.className='krow';r.forEach(k=>{const b=document.createElement('button');b.type='button';b.className='key';b.dataset.k=k;b.innerHTML=`${k}<small>${KEYS[k][0].split(' ')[0].slice(0,10)}</small>`;b.title=`${KEYS[k][0]} — ${KEYS[k][1]}`;b.addEventListener('click',()=>pressKey(k,true));d.appendChild(b);});kb.appendChild(d);});
const sp=document.createElement('div');sp.className='krow';
sp.innerHTML=`<button type="button" class="key space" data-k="SPACE">SPACE<small>motto 💗</small></button>`;
sp.firstChild.addEventListener('click',()=>pressKey('SPACE',true));kb.appendChild(sp);
function pressKey(k,clicked=false){
  keyClick();
  if(k==='SPACE'){$('#kbReadout').innerHTML='💗 <b>I build tech that is useful, impactful & meaningful.</b>';$('#kbSub').textContent='— Zeba\'s motto';speak('I build technology that is useful, impactful and meaningful.');return;}
  k=k.toUpperCase();if(!KEYS[k])return;
  const [name,desc]=KEYS[k];
  $$(`.key[data-k="${k}"]`).forEach(el=>{el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),350);el.classList.add('found');});
  $('#kbReadout').innerHTML=`<b>${k}</b> → ${name}`;
  $('#kbSub').textContent=desc;
  if(!found.has(k)){found.add(k);$('#kbCount').textContent=`${found.size} / 26 discovered`;
    if(found.size===26){try{confetti({particleCount:160,spread:80,origin:{y:.6}});}catch(e){}speak('You discovered all my skills. Amazing!');}}
  if(voiceOn&&!clicked)speak(k==="Z"?"Zeba OS":`${name}. ${desc}`);
  else if(voiceOn&&clicked&&found.size%5===0)speak(name);
}
$('#kbReset').addEventListener('click',()=>{found.clear();$$('.key').forEach(k=>k.classList.remove('found'));$('#kbCount').textContent='0 / 26 discovered';});
$('#stackGroups').innerHTML=STACK_FLAT.map(i=>`<span class="chip">${i}</span>`).join('');
$('#loveChips').innerHTML=LOVE.map(l=>`<span class="chip">${l}</span>`).join('');

/* ---------- PROJECTS (text-only, richer cards, Code only) ---------- */
const PCOLORS=["linear-gradient(135deg,#a855f7,#6d28d9)","linear-gradient(135deg,#f59e0b,#0f766e)","linear-gradient(135deg,#3b82f6,#8b5cf6)","linear-gradient(135deg,#f472b6,#fbbf24)"];
$('#projGrid').innerHTML=PROJECTS.map((p,i)=>
  `<div class="col-12 col-md-6"><article class="project-card project-text" data-i="${i}" role="button" tabindex="0" style="--pc:${PCOLORS[i%4]}">
   <div class="project-body"><div class="project-top"><span class="project-emoji">${p.emoji}</span><span class="project-arrow">↗</span></div>
   <h3 class="project-name">${p.name}</h3><p class="project-type">${p.cat}</p><p class="project-desc">${p.desc}</p>
   <div class="project-tech">${p.tech.slice(0,5).map(t=>`<span class="chip">${t}</span>`).join('')}</div>
   <div class="project-links"><a href="https://github.com/zohhh04" target="_blank" rel="noopener" class="btn btn-sm btn-secondary-cta" data-stop><i class="bi bi-github"></i> Code</a><span class="tap-hint mono-font">tap card for details</span></div></div></article></div>`).join('');
$$('#projGrid [data-stop]').forEach(a=>a.addEventListener('click',e=>e.stopPropagation()));
function openProj(i){const p=PROJECTS[i];blip(620);
  $('#pmCover').textContent=p.emoji;
  $('#pmCat').textContent=p.cat;$('#pmName').textContent=`${p.emoji} ${p.name}`;$('#pmDesc').textContent=p.desc;
  $('#pmTech').innerHTML=p.tech.map(t=>`<span class="chip">${t}</span>`).join('');
  $('#pmHl').innerHTML=p.hl.map(h=>`<div>✨ ${h}</div>`).join('');
  const m=$('#projModal');m.classList.add('is-open');m.setAttribute('aria-hidden','false');}
$$('#projGrid .project-card').forEach(card=>{
  card.addEventListener('click',()=>openProj(+card.dataset.i));
  card.addEventListener('keydown',e=>{if(e.key==='Enter')openProj(+card.dataset.i);});
});
function closeProj(){const m=$('#projModal');m.classList.remove('is-open');m.setAttribute('aria-hidden','true');}
$('#pmClose').addEventListener('click',closeProj);
$('#projModal').addEventListener('click',e=>{if(!e.target.closest('.skill-popup-inner'))closeProj();});

/* ---------- CERTS (4) ---------- */
$('#certList').innerHTML=CERTS.map(c=>
  `<div class="col-12 col-md-6"><div class="cert-card"><h3>${c.t}</h3><div class="cert-meta">${c.m.map(m=>`<span>${m}</span>`).join('')}</div><p>${c.d}</p><p class="cert-impact">✨ ${c.i}</p></div></div>`).join('');

/* ---------- CONTACT (Web3Forms + guaranteed mailto fallback) ---------- */
const form=$('#contactForm'),status=$('#formStatus');
function setStatus(t,m){status.className='form-status form-status--'+t+' is-visible';status.textContent=m;}
function mailtoFallback(n,em,m){
  const s=encodeURIComponent(`💌 Portfolio — message from ${n}`);
  const b=encodeURIComponent(`Hi Zeba,\n\n${m}\n\n—\n${n}\n${em}`);
  location.href=`mailto:zebafathima0406@gmail.com?subject=${s}&body=${b}`;
}
form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(form.querySelector('.form-honeypot').checked)return;
  if(!form.checkValidity()){form.reportValidity();return;}
  const n=$('#contact-name').value.trim(),em=$('#contact-email').value.trim(),m=$('#contact-message').value.trim();
  const btn=$('#contactSubmit'),txt=form.querySelector('.contact-submit-text');
  btn.disabled=true;txt.textContent='Sending...';status.className='form-status';status.textContent='';
  try{
    const subj=form.querySelector('[name="subject"]');if(subj)subj.value=`💌 Portfolio — message from ${n}`;
    const fd=new FormData(form);
    const res=await fetch(form.action,{method:'POST',body:fd,headers:{Accept:'application/json'}});
    let data={};try{data=await res.json();}catch(err){}
    if(res.ok&&data.success){
      setStatus('success',"Sent! Your message just landed in my inbox — I'll reply within 24 hours. 💌");
      form.reset();try{confetti({particleCount:120,spread:70,origin:{y:.7}});}catch(err){}
    }else{
      /* key not verified / rejected → still get the mail via mail app */
      mailtoFallback(n,em,m);
      setStatus('error',"Direct send was blocked (key not verified?) — I opened your mail app instead so the message still reaches zebafathima0406@gmail.com. Also check the copy button in my card.");
    }
  }catch(err){
    mailtoFallback(n,em,m);
    setStatus('error',"Network blocked the direct send — I opened your mail app instead so nothing is lost.");
  }
  finally{btn.disabled=false;txt.textContent='Send message';}
});
$('#copyMail').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText('zebafathima0406@gmail.com');toast('Email copied 📋');}
  catch(e){toast('zebafathima0406@gmail.com');}
});

/* ---------- MISC ---------- */
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600);}
})();
