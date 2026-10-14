(()=>{
'use strict';
const slides=[...document.querySelectorAll('.slide-card')],carousel=document.getElementById('ceo-carousel'),dots=document.getElementById('carousel-dots'),live=document.getElementById('slider-live'),count=document.getElementById('slide-num'),pauseBtn=document.getElementById('pause-button'),pauseIcon=document.getElementById('pause-icon'),pauseLabel=document.getElementById('pause-label');
const fallback='https://khdreamservices.com/uploads/about-team/1787563567117_nine5g.jpg';
document.querySelectorAll('.slide-card img').forEach(img=>{img.addEventListener('error',()=>{if(img.dataset.fallback)return;img.dataset.fallback='true';img.src=fallback;});});
const logo=document.querySelector('.affiliation-image img');
if(logo)logo.addEventListener('error',()=>{if(!logo.dataset.fallback){logo.dataset.fallback='true';logo.src='https://khdreamservices.com/logo.png';}});
const prefersLessMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches,autoMs=4900;
let current=0,timer=null,isPaused=prefersLessMotion,inside=false,touchStart=null;
slides.forEach((slide,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show slide '+(i+1)+': '+slide.getAttribute('aria-label'));b.addEventListener('click',()=>go(i,true));dots.appendChild(b);});
const dotButtons=[...dots.children];
function signedOffset(i){let d=(i-current+slides.length)%slides.length;if(d>slides.length/2)d-=slides.length;return d;}
function render(announce=false){
slides.forEach((slide,i)=>{const d=signedOffset(i),a=Math.abs(d),hidden=a>=3;slide.style.setProperty('--side',d);slide.style.setProperty('--depth',d===0?'86px':a===1?'-15px':'-165px');slide.style.setProperty('--yaw',d===0?'0deg':(d<0?22:-22)+(a===2?(d<0?11:-11):0)+'deg');slide.style.setProperty('--size',d===0?'1':a===1?'.82':'.68');slide.style.setProperty('--alpha',hidden?'0':a===2?'.48':'1');slide.style.setProperty('--blur',a===2?'1px':'0px');slide.style.zIndex=String(10-a);slide.classList.toggle('is-front',d===0);slide.setAttribute('aria-hidden',String(d!==0));slide.inert=d!==0;});
dotButtons.forEach((b,i)=>b.setAttribute('aria-current',String(i===current)));count.textContent=String(current+1).padStart(2,'0');if(announce)live.textContent='Slide '+(current+1)+' of '+slides.length+': '+slides[current].getAttribute('aria-label');
}
function stop(){if(timer){clearInterval(timer);timer=null;}}
function restart(){stop();if(!isPaused&&!inside&&!document.hidden)timer=setInterval(()=>{current=(current+1)%slides.length;render();},autoMs);}
function go(i,announce=false){current=(i+slides.length)%slides.length;render(announce);restart();}
document.getElementById('slide-prev').addEventListener('click',()=>go(current-1,true));
document.getElementById('slide-next').addEventListener('click',()=>go(current+1,true));
carousel.addEventListener('mouseenter',()=>{inside=true;stop()});carousel.addEventListener('mouseleave',()=>{inside=false;restart()});
carousel.addEventListener('focusin',()=>{inside=true;stop()});carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget)){inside=false;restart();}});
carousel.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1),true);}});
carousel.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0]?.screenX??null;},{passive:true});
carousel.addEventListener('touchend',e=>{if(touchStart===null)return;const delta=e.changedTouches[0].screenX-touchStart;if(Math.abs(delta)>35)go(current+(delta<0?1:-1),true);touchStart=null;},{passive:true});
pauseBtn.addEventListener('click',()=>{isPaused=!isPaused;pauseBtn.setAttribute('aria-pressed',String(isPaused));pauseBtn.setAttribute('aria-label',isPaused?'Resume automatic slider':'Pause automatic slider');pauseIcon.textContent=isPaused?'▶':'Ⅱ';pauseLabel.textContent=isPaused?'Play':'Pause';restart();});
if(prefersLessMotion){pauseBtn.setAttribute('aria-pressed','true');pauseBtn.setAttribute('aria-label','Resume automatic slider');pauseIcon.textContent='▶';pauseLabel.textContent='Play';}
document.addEventListener('visibilitychange',restart);render();restart();
const menu=document.getElementById('menu-toggle'),mobile=document.getElementById('mobile-nav');
menu.addEventListener('click',()=>{const opening=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(opening));menu.setAttribute('aria-label',opening?'Close menu':'Open menu');mobile.hidden=!opening;});
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}));
document.getElementById('year').textContent=String(new Date().getFullYear());
const modal=document.getElementById('booking-dialog');
document.querySelectorAll('[data-open-booking]').forEach(el=>el.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false');if(typeof modal.showModal==='function')modal.showModal();else modal.setAttribute('open','');}));
document.getElementById('booking-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
document.getElementById('consultation-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const lines=['Hello KH Dream Services,','','I would like to request a premium executive consultation with Kawser Hamid.','Name: '+data.get('fullName'),'Email: '+data.get('email'),'Interest: '+data.get('topic'),'Message: '+data.get('message'),'','Please let me know the consultation availability and fee.'];window.location.href='mailto:support@khdreamservices.com?subject='+encodeURIComponent('Premium Consultation Inquiry — Kawser Hamid')+'&body='+encodeURIComponent(lines.join('\n'));});
})();