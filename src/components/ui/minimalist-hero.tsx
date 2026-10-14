import { useEffect, useState } from 'react';
import type { PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Menu, X, FileBadge2, CalendarClock, Building2, ChartNoAxesCombined, ChevronLeft, ChevronRight, Globe2, Handshake, Landmark, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavLink = { label: string; href: string };
export interface MinimalistHeroProps {
  logoText: string;
  navLinks: NavLink[];
  bookingHref: string;
  profileHref: string;
  className?: string;
}

function ExecutiveMark() {
  return <svg className="kh-monogram" viewBox="0 0 113 97" role="img" aria-label="KH personal monogram">
    <defs><linearGradient id="kh-gold" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff2cb"/><stop offset=".52" stopColor="#eac17a"/><stop offset="1" stopColor="#a97637"/></linearGradient></defs>
    <path d="M11 88V9 M13 48L44 10 M22 40L52 89" fill="none" stroke="#faf7ef" strokeWidth="5" strokeLinecap="square"/>
    <path d="M59 9V89 M103 9V89 M59 48H103" fill="none" stroke="url(#kh-gold)" strokeWidth="5.5"/>
    <path d="M7 10h15 M3 89h24 M47 10h11 M43 89h17 M53 10h13 M54 89h13 M96 10h14 M96 89h14" stroke="#d8a95c" strokeWidth="1.8"/>
    <path d="M33 50L56 29" fill="none" stroke="#dba755" strokeWidth="2" opacity=".6"/>
    <circle cx="56" cy="48" r="3" fill="#efd29b"/>
  </svg>;
}

const gentle = [0.22, 1, 0.36, 1] as const;
const heroPortraits = [
  {src:'/assets/photos/hero-green-aligned.webp',alt:'Kawser Hamid seated in a green executive suit'},
  {src:'/assets/photos/hero-navy-aligned-v11.webp',alt:'Kawser Hamid seated in a navy executive suit'},
  {src:'/assets/photos/hero-charcoal-aligned-v11.webp',alt:'Kawser Hamid seated in a charcoal executive suit'},
  {src:'/assets/photos/hero-burgundy-aligned-v11.webp',alt:'Kawser Hamid seated in a burgundy executive suit'}
] as const;

function PremiumNameLine({text,gold=false,delay=0,reduced=false}:{text:string;gold?:boolean;delay?:number;reduced?:boolean}) {
  return <span className={gold?'premium-name-line premium-name-gold':'premium-name-line'} aria-hidden="true">
    <motion.span className="premium-name-reveal"
      initial={reduced?false:{opacity:0,y:'90%',filter:'blur(12px)'}}
      animate={{opacity:1,y:'0%',filter:'blur(0px)'}}
      transition={{duration:reduced?0:1.05,delay:reduced?0:delay,ease:[.22,1,.36,1]}}>
      {text}
    </motion.span>
  </span>;
}

const expertiseCards = [
  {className:'symbolic-license',front:{label:'Investor License',Icon:FileBadge2},back:{label:'Market Entry',Icon:Globe2}},
  {className:'symbolic-calendar',front:{label:'Private Consultation',Icon:CalendarClock},back:{label:'Executive Session',Icon:Handshake}},
  {className:'symbolic-business',front:{label:'Business Setup',Icon:Building2},back:{label:'Company Formation',Icon:Landmark}},
  {className:'symbolic-advisory',front:{label:'Executive Advisory',Icon:ChartNoAxesCombined},back:{label:'Growth Strategy',Icon:TrendingUp}}
] as const;

function RotatingExpertise({item,index,flipped,reduced}:{item:(typeof expertiseCards)[number];index:number;flipped:boolean;reduced:boolean}) {
  const Front = item.front.Icon;
  const Back = item.back.Icon;
  const duration = 15 + index * 1.4;
  return <motion.div className={`expertise-orbit-card ${item.className}`} aria-hidden="true"
    animate={reduced?undefined:{x:[0,11,0,-9,0],y:[0,-8,0,8,0],rotateX:[-4,8,-4],rotateZ:[index%2?4:-4,index%2?-2:2,index%2?4:-4]}}
    transition={{duration,repeat:Infinity,ease:'easeInOut',delay:-index*1.5}}>
    <motion.div className="expertise-flip" initial={false}
      animate={{rotateY:!reduced&&flipped?180:0}}
      transition={{duration:1.35,ease:[.22,1,.36,1]}}>
      <div className="expertise-face expertise-face-front">
        <Front aria-hidden="true" size={34} strokeWidth={1.25}/>
        <span>{item.front.label}</span>
      </div>
      <div className="expertise-face expertise-face-back">
        <Back aria-hidden="true" size={34} strokeWidth={1.25}/>
        <span>{item.back.label}</span>
      </div>
    </motion.div>
  </motion.div>;
}

export function MinimalistHero({ logoText, navLinks, bookingHref, profileHref, className }: MinimalistHeroProps) {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [portraitPaused, setPortraitPaused] = useState(false);
  const [symbolMode, setSymbolMode] = useState(0);
  useEffect(() => {
    if (reducedMotion || portraitPaused) return;
    const timer = window.setInterval(() => { setPortraitIndex(i=>(i+1)%heroPortraits.length); }, 6200);
    return () => window.clearInterval(timer);
  }, [reducedMotion, portraitPaused]);
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setSymbolMode(i=>(i+1)%2), 8500);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);
  function movePortrait(step:number) {
    setPortraitIndex(i=>(i+step+heroPortraits.length)%heroPortraits.length);
  }
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 25 });
  const sy = useSpring(py, { stiffness: 50, damping: 25 });
  const sceneX = useTransform(sx, [-1,1], [-18,18]);
  const sceneY = useTransform(sy, [-1,1], [-10,10]);
  const haloX = useTransform(sx, [-1,1], ['44%','63%']);
  const haloY = useTransform(sy, [-1,1], ['39%','62%']);
  function track(e: PointerEvent<HTMLElement>) {
    if (reducedMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width * 2 - 1);
    py.set((e.clientY - rect.top) / rect.height * 2 - 1);
  }

  return (
    <main id="home" className={cn('executive-page',className)} onPointerMove={track} onPointerLeave={() => {px.set(0);py.set(0);}}>
      <div className="skyline-layer" aria-hidden="true" />
      <div className="skyline-shade" aria-hidden="true" />
      <motion.div className="mouse-glow" style={reducedMotion ? undefined : {left:haloX,top:haloY}} aria-hidden="true" />
      <div className="corner-arc corner-arc-one" aria-hidden="true" />
      <div className="corner-arc corner-arc-two" aria-hidden="true" />
      <div className="executive-inner">
        <header className="executive-header">
          <a className="executive-logo" href="#home" aria-label={`${logoText} — homepage`}>
            <ExecutiveMark /><span className="logo-separator" aria-hidden="true" />
            <span className="executive-logo-word">KAWser <em>HAMID</em></span>
          </a>
          <nav className="executive-nav" aria-label="Main navigation">
            {navLinks.map((l,i)=><a key={l.label} href={l.href} className={i===0?'selected':''}>{l.label}</a>)}
          </nav>
          <a href={bookingHref} className="gold-pill header-book">Book Consultation <ArrowRight size={18} /></a>
          <button type="button" className="mobile-menu-btn" aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X/>:<Menu/>}</button>
        </header>
        <AnimatePresence>{menuOpen && <motion.nav className="responsive-nav" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} aria-label="Mobile navigation">{navLinks.map(l=><a key={l.label} href={l.href} onClick={()=>setMenuOpen(false)}>{l.label}</a>)}<a href={bookingHref}>Book consultation <ArrowRight size={15}/></a></motion.nav>}</AnimatePresence>

        <section className="executive-hero" aria-labelledby="executive-name">
          <motion.div className="executive-copy" initial={reducedMotion?false:{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:gentle}}>
            <p className="executive-eyebrow">BUSINESS SETUP <i/> INVESTOR LICENSING <i/> EXECUTIVE ADVISORY</p>
            <h1 id="executive-name" aria-label="Kawser Hamid"><PremiumNameLine text="Kawser" delay={.28} reduced={Boolean(reducedMotion)}/><PremiumNameLine text="Hamid" gold delay={.53} reduced={Boolean(reducedMotion)}/></h1>
            <div className="executive-role">CEO &amp; Founder, KH Dream Services Ltd</div>
            <div className="executive-rule"/>
            <p className="executive-description">Guiding global investors and business leaders to establish, expand and succeed in Saudi Arabia through trusted advisory and end-to-end solutions.</p>
            <div className="executive-ctas">
              <a href={bookingHref} className="gold-pill primary-cta">Book Private Consultation <ArrowRight size={19}/></a>
              <a href={profileHref} className="subtle-cta">Explore My Expertise <ArrowRight size={17}/></a>
            </div>
            <div className="expertise-strip" aria-label="Consultancy focus areas">
              <span><ChartNoAxesCombined size={21} strokeWidth={1.4} /> Strategic Advisory</span>
              <span><FileBadge2 size={21} strokeWidth={1.4} /> Investor Licensing</span>
              <span><Building2 size={21} strokeWidth={1.4} /> Saudi Business Setup</span>
            </div>
          </motion.div>


          <div className="consultancy-stage" aria-label="Kawser Hamid executive consultancy, investor licensing and Saudi business setup">
            <div className="scene-backglow" aria-hidden="true" />
            <div className="orbit orbit-back" aria-hidden="true" />
            <div className="gold-stage" aria-hidden="true"><div className="stage-disc"/><div className="stage-ring stage-ring-outer"/><div className="stage-ring stage-ring-inner"/></div>
            <motion.div className="symbolic-layer" style={reducedMotion?undefined:{x:sceneX,y:sceneY}}>
              {expertiseCards.map((item,index)=><RotatingExpertise key={item.className} item={item} index={index} flipped={Boolean(symbolMode)} reduced={Boolean(reducedMotion)}/>)}
            </motion.div>
            <motion.div className="portrait-parallax" onMouseEnter={()=>setPortraitPaused(true)} onMouseLeave={()=>setPortraitPaused(false)}>
              <AnimatePresence initial={false} mode="sync">
                <motion.img key={heroPortraits[portraitIndex].src}
                  className="consultancy-ceo" src={heroPortraits[portraitIndex].src}
                  alt={heroPortraits[portraitIndex].alt}
                  draggable={false} fetchPriority={portraitIndex===0?'high':'auto'}
                  initial={reducedMotion?false:{opacity:0,filter:'blur(5px)'}}
                  animate={{opacity:1,filter:'blur(0px)'}}
                  exit={{opacity:0,filter:'blur(5px)'}}
                  transition={{duration:reducedMotion?0:.85,ease:[.4,0,.2,1]}}/>
              </AnimatePresence>
            </motion.div>
            <div className="portrait-controls" onMouseEnter={()=>setPortraitPaused(true)} onMouseLeave={()=>setPortraitPaused(false)} aria-label="CEO portrait slideshow">
              <button type="button" onClick={()=>movePortrait(-1)} aria-label="Previous CEO portrait"><ChevronLeft size={18}/></button>
              <div className="portrait-dots" aria-hidden="true">{heroPortraits.map((p,i)=><span key={p.src} className={i===portraitIndex?'active':''}/>)}</div>
              <button type="button" onClick={()=>movePortrait(1)} aria-label="Next CEO portrait"><ChevronRight size={18}/></button>
            </div>
            <div className="orbit orbit-front" aria-hidden="true"/>
          </div>
        </section>
        <footer className="executive-footer"><span>PRIVATE EXECUTIVE CONSULTANCY</span><span>RIYADH · SAUDI ARABIA</span></footer>
      </div>
    </main>
  );
}
