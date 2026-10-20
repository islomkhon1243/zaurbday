import fs from 'node:fs';
const p='dist/portfolio.js';let s=fs.readFileSync(p,'utf8');
const begin=s.indexOf("gsap.from('.hero-title,.hero-side-copy");
const end=s.indexOf("}else $('#loader').style.display='none'",begin);
if(begin<0||end<0)throw new Error('Entry choreography not found');
s=s.slice(0,begin)+"gsap.fromTo('.hero-title>span[aria-hidden]',{yPercent:50,opacity:0},{yPercent:0,opacity:1,duration:1.2,delay:.3,ease:'power3.out'});gsap.fromTo('.hero-portrait',{opacity:0},{opacity:1,duration:1.5,delay:.2,ease:'power3.out'});gsap.from('.site-header',{y:-20,opacity:0,duration:1,delay:.3})"+s.slice(end);
const t0=s.indexOf('const heroTL=gsap.timeline('),t1=s.indexOf("gsap.fromTo('.about-portrait img'",t0);
if(t0<0||t1<0)throw new Error('Hero scroll block not found');s=s.slice(0,t0)+s.slice(t1);
const code=`function renderHero(){if(reduced)return;const h=$('.hero'),p=Math.max(0,Math.min(1,-h.getBoundingClientRect().top/(h.offsetHeight*.9)));$('.hero-title').style.transform=\`translate3d(\${-p*18}%,\${-p*70}px,0)\`;$('.hero-title').style.opacity=String(1-p);$('.portrait-wrap').style.transform=\`translate3d(0,\${-p*12}%,0) scale(\${1-p*.1}) rotate(\${-p*3}deg)\`;$('.portrait-wrap').style.opacity=String(1-p*.85);$('.hero-back-name').style.transform=\`translate3d(\${-p*25}%,0,0) scale(\${1+p*.2})\`;$('.hero-back-name').style.opacity=String(1-p);$$('.hero-side-copy,.hero-bottom,.hero-greeting,.hero-coordinate').forEach(e=>{e.style.opacity=String(1-p);e.style.transform=\`translateY(\${-p*50}px)\`})}
function renderGames()`;
s=s.replace('function renderGames()',()=>code).replace('tick=false;renderGames();','tick=false;renderHero();renderGames();');
fs.writeFileSync(p,s);
