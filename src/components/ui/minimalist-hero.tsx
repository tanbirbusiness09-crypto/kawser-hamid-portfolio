import { useEffect, useRef, useState } from 'react';
import type { PointerEvent, KeyboardEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X, FileBadge2, CalendarClock, Building2, ChartNoAxesCombined } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavLink = { label: string; href: string };
type Portrait = { src: string; alt: string; suit: string };
export interface MinimalistHeroProps {
  logoText: string;
  navLinks: NavLink[];
  portraits: Portrait[];
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

export function MinimalistHero({ logoText, navLinks, portraits, bookingHref, profileHref, className }: MinimalistHeroProps) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pause, setPause] = useState(false);
  const startTouchX = useRef<number | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 25 });
  const sy = useSpring(py, { stiffness: 50, damping: 25 });
  const sceneX = useTransform(sx, [-1,1], [-18,18]);
  const sceneY = useTransform(sy, [-1,1], [-10,10]);
  const haloX = useTransform(sx, [-1,1], ['44%','63%']);
  const haloY = useTransform(sy, [-1,1], ['39%','62%']);
  const count = portraits.length;
  const go = (amount: number) => setActive(current => (current + amount + count) % count);
  const chosen = (offset: number) => portraits[(active + offset + count) % count];

  useEffect(() => {
    if (pause || menuOpen || reducedMotion || count < 2) return;
    const timer = window.setInterval(() => setActive(v => (v + 1) % count), 6300);
    return () => window.clearInterval(timer);
  }, [pause, menuOpen, reducedMotion, count]);

  function track(e: PointerEvent<HTMLElement>) {
    if (reducedMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width * 2 - 1);
    py.set((e.clientY - rect.top) / rect.height * 2 - 1);
  }

  function keyboard(e: KeyboardEvent<HTMLElement>) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  }

  const panelOffsets = [-2, -1, 1, 2];

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
            <h1 id="executive-name">Kawser<br/><strong>Hamid</strong></h1>
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
              <motion.div className="symbolic-license" aria-hidden="true" animate={reducedMotion?undefined:{y:[0,-9,0],rotateZ:[-8,-6,-8]}} transition={{duration:9,repeat:Infinity,ease:"easeInOut"}}>
                <div className="certificate-paper">
                  <span className="certificate-overline">SAUDI INVESTMENT ADVISORY</span>
                  <span className="certificate-icon"><FileBadge2 size={47} strokeWidth={1.2}/></span>
                  <strong>INVESTOR<br/>LICENSE</strong>
                  <i className="certificate-rule"/><span className="certificate-lines"><i/><i/><i/></span><span className="certificate-seal">✦</span>
                </div>
              </motion.div>
              <motion.div className="symbolic-calendar" animate={reducedMotion?undefined:{y:[0,8,0]}} transition={{duration:8.2,repeat:Infinity,ease:"easeInOut",delay:.4}}>
                <CalendarClock size={46} strokeWidth={1.35} aria-hidden="true"/><b>PRIVATE<br/>CONSULTATION</b>
              </motion.div>
              <motion.div className="symbolic-business" animate={reducedMotion?undefined:{y:[0,-7,0]}} transition={{duration:10,repeat:Infinity,ease:"easeInOut",delay:.9}}>
                <div className="sky-towers"><Building2 size={60} strokeWidth={1.2}/><span>✦</span></div><b>SAUDI BUSINESS SETUP</b>
              </motion.div>
              <motion.div className="symbolic-advisory" animate={reducedMotion?undefined:{y:[0,9,0]}} transition={{duration:9.4,repeat:Infinity,ease:"easeInOut",delay:1.3}}>
                <ChartNoAxesCombined size={59} strokeWidth={1.3} aria-hidden="true"/><b>EXECUTIVE<br/>ADVISORY</b>
              </motion.div>
            </motion.div>
            <motion.img className="consultancy-ceo" src="/assets/photos/hero-navy-seated.webp" alt="Kawser Hamid seated in a navy executive suit" fetchPriority="high" draggable={false}
              initial={reducedMotion?false:{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} transition={{duration:1.05,ease:gentle,delay:.14}} />
            <div className="orbit orbit-front" aria-hidden="true"/>
          </div>
        </section>
        <footer className="executive-footer"><span>PRIVATE EXECUTIVE CONSULTANCY</span><span>RIYADH · SAUDI ARABIA</span></footer>
      </div>
    </main>
  );
}
