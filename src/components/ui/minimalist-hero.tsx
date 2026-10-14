import { useEffect, useState } from 'react';
import type { PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Menu, X, FileBadge2, CalendarClock, Building2, ChartNoAxesCombined, ChevronLeft, ChevronRight, PenLine, Globe2, Handshake, Landmark, TrendingUp } from 'lucide-react';
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
  {src:'/assets/photos/hero-navy-seated.webp',alt:'Kawser Hamid in a navy executive suit'},
  {src:'/assets/photos/hero-gray-seated.webp',alt:'Kawser Hamid in a grey executive suit'},
  {src:'/assets/photos/hero-burgundy-seated.webp',alt:'Kawser Hamid in a burgundy executive suit'},
  {src:'/assets/photos/hero-green-seated.webp',alt:'Kawser Hamid in an olive executive suit'},
  {src:'/assets/photos/hero-black-seated.webp',alt:'Kawser Hamid in a black executive suit'}
] as const;

function WritingLine({text,gold=false,delay=0,reduced=false}:{text:string;gold?:boolean;delay?:number;reduced?:boolean}) {
  return <span aria-hidden="true" className={gold?'writing-row writing-gold':'writing-row'}>
    <motion.span className="writing-text" initial={reduced?false:{clipPath:'inset(0 100% 0 0)',opacity:.6}} animate={{clipPath:'inset(0 0% 0 0)',opacity:1}} transition={{duration:reduced?0:1.8,delay:reduced?0:delay,ease:[.35,.02,.1,1]}}>{text}</motion.span>
    {!reduced && <motion.span className="writing-pen" initial={{left:'0%',opacity:0}} animate={{left:'100%',opacity:[0,1,1,0]}} transition={{left:{duration:1.8,delay,ease:[.35,.02,.1,1]},opacity:{duration:1.8,delay,times:[0,.09,.88,1]}}}><PenLine size={26} strokeWidth={1.35}/></motion.span>}
  </span>;
}


export function MinimalistHero({ logoText, navLinks, bookingHref, profileHref, className }: MinimalistHeroProps) {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [portraitDirection, setPortraitDirection] = useState(1);
  const [portraitPaused, setPortraitPaused] = useState(false);
  const [symbolMode, setSymbolMode] = useState(0);
  useEffect(() => {
    if (reducedMotion || portraitPaused) return;
    const timer = window.setInterval(() => { setPortraitDirection(1); setPortraitIndex(i=>(i+1)%heroPortraits.length); }, 5500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, portraitPaused]);
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setSymbolMode(i=>(i+1)%2), 6800);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);
  function movePortrait(step:number) {
    setPortraitDirection(step);
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
            <h1 id="executive-name" aria-label="Kawser Hamid"><WritingLine text="Kawser" delay={.25} reduced={Boolean(reducedMotion)}/><WritingLine text="Hamid" gold delay={1.4} reduced={Boolean(reducedMotion)}/></h1>
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
              <motion.div className="symbolic-license" aria-hidden="true" animate={reducedMotion?undefined:{y:[0,-9,0],rotateZ:[-8,-5,-8],rotateY:[-8,5,-8]}} transition={{duration:9,repeat:Infinity,ease:"easeInOut"}}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={'certificate-'+symbolMode} className="certificate-paper" initial={{opacity:0,rotateY:-18,scale:.95}} animate={{opacity:1,rotateY:0,scale:1}} exit={{opacity:0,rotateY:18,scale:.96}} transition={{duration:.65}}>
                    <span className="certificate-overline">SAUDI BUSINESS ADVISORY</span>
                    <span className="certificate-icon">{symbolMode===0?<FileBadge2 size={42} strokeWidth={1.2}/>:<Globe2 size={42} strokeWidth={1.2}/>}</span>
                    <strong>{symbolMode===0?<>INVESTOR<br/>LICENSE</>:<>SAUDI<br/>MARKET ENTRY</>}</strong>
                    <i className="certificate-rule"/><span className="certificate-lines"><i/><i/><i/></span><span className="certificate-seal">✦</span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div className="symbolic-calendar" animate={reducedMotion?undefined:{y:[0,8,0],rotateY:[-8,7,-8],rotateZ:[-6,-8,-6]}} transition={{duration:8.2,repeat:Infinity,ease:"easeInOut",delay:.4}}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div className="symbol-inner" key={'calendar-'+symbolMode} initial={{opacity:0,rotateY:-24}} animate={{opacity:1,rotateY:0}} exit={{opacity:0,rotateY:24}} transition={{duration:.55}}>
                    {symbolMode===0?<CalendarClock size={42} strokeWidth={1.35} aria-hidden="true"/>:<Handshake size={42} strokeWidth={1.35} aria-hidden="true"/>}
                    <b>{symbolMode===0?<>PRIVATE<br/>CONSULTATION</>:<>EXECUTIVE<br/>SESSION</>}</b>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div className="symbolic-business" animate={reducedMotion?undefined:{y:[0,-7,0],rotateY:[7,-8,7],rotateZ:[4,6,4]}} transition={{duration:10,repeat:Infinity,ease:"easeInOut",delay:.9}}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div className="symbol-inner" key={'business-'+symbolMode} initial={{opacity:0,rotateY:-24}} animate={{opacity:1,rotateY:0}} exit={{opacity:0,rotateY:24}} transition={{duration:.55}}>
                    <div className="sky-towers">{symbolMode===0?<Building2 size={52} strokeWidth={1.2}/>:<Landmark size={52} strokeWidth={1.2}/>}<span>✦</span></div>
                    <b>{symbolMode===0?'SAUDI BUSINESS SETUP':'COMPANY FORMATION'}</b>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div className="symbolic-advisory" animate={reducedMotion?undefined:{y:[0,9,0],rotateY:[-8,8,-8],rotateZ:[7,5,7]}} transition={{duration:9.4,repeat:Infinity,ease:"easeInOut",delay:1.3}}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div className="symbol-inner" key={'advisory-'+symbolMode} initial={{opacity:0,rotateY:-24}} animate={{opacity:1,rotateY:0}} exit={{opacity:0,rotateY:24}} transition={{duration:.55}}>
                    {symbolMode===0?<ChartNoAxesCombined size={50} strokeWidth={1.3} aria-hidden="true"/>:<TrendingUp size={50} strokeWidth={1.3} aria-hidden="true"/>}
                    <b>{symbolMode===0?<>EXECUTIVE<br/>ADVISORY</>:<>GROWTH<br/>STRATEGY</>}</b>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
            <motion.div className="portrait-parallax" onMouseEnter={()=>setPortraitPaused(true)} onMouseLeave={()=>setPortraitPaused(false)}>
              <AnimatePresence initial={false} custom={portraitDirection}>
                <motion.img key={heroPortraits[portraitIndex].src} className="consultancy-ceo" src={heroPortraits[portraitIndex].src} alt={heroPortraits[portraitIndex].alt} draggable={false} fetchPriority={portraitIndex===0?'high':'auto'}
                  custom={portraitDirection} initial={reducedMotion?false:{opacity:0,x:portraitDirection*42,scale:.945,filter:'blur(8px)'}}
                  animate={{opacity:1,x:0,scale:1,filter:'blur(0px)'}}
                  exit={reducedMotion?undefined:{opacity:0,x:-portraitDirection*38,scale:1.035,filter:'blur(7px)'}}
                  transition={{duration:reducedMotion?0:.95,ease:gentle}}/>
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
