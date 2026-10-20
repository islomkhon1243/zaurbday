import fs from 'node:fs';
const p='dist/portfolio.js';let s=fs.readFileSync(p,'utf8');
const start=s.indexOf("const mm=gsap.matchMedia();mm.add('(min-width:651px)'");
const end=s.indexOf("gsap.fromTo('.roots-visual img'",start);
if(start<0||end<0)throw new Error('Game motion block not found');
s=s.slice(0,start)+s.slice(end);
const needle="let tick=false;function onScroll()";
const motion=`function renderGames(){const cards=$$('.game-card');if(innerWidth<=650||reduced){cards.forEach(c=>{c.style.transform='none';c.style.pointerEvents='';c.querySelector('button').tabIndex=0});return}const stack=$('.game-stack'),range=Math.max(1,stack.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-stack.getBoundingClientRect().top/range));const clamp=v=>Math.max(0,Math.min(1,v)),a=clamp((p-.07)/.38),b=clamp((p-.54)/.38);cards[0].style.transform=\`translate3d(0,\${-a*5}%,0) rotate(\${-a*4}deg) scale(\${1-a*.09})\`;cards[1].style.transform=\`translate3d(0,\${120*(1-a)-b*3}%,0) rotate(\${5*(1-a)+b*3}deg) scale(\${1-b*.06})\`;cards[2].style.transform=\`translate3d(0,\${120*(1-b)}%,0) rotate(\${-5*(1-b)}deg)\`;const index=p<.34?0:p<.81?1:2;$('#game-index').textContent=\`0\${index+1} / 03\`;cards.forEach((c,i)=>{c.style.pointerEvents=i===index?'auto':'none';c.querySelector('button').tabIndex=i===index?0:-1})}
let tick=false;function onScroll()`;
s=s.replace(needle,motion);
s=s.replace("tick=false;const p=scrollY", "tick=false;renderGames();const p=scrollY");
s=s.replace("window.addEventListener('load',()=>{if(hasScroll)ScrollTrigger.refresh()});", "window.addEventListener('load',()=>{if(hasScroll)ScrollTrigger.refresh();onScroll()});if(document.fonts)document.fonts.ready.then(()=>{if(hasScroll)ScrollTrigger.refresh();onScroll()});");
fs.writeFileSync(p,s);
