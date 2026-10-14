import { useEffect, useRef, useState } from 'react';
import type { PointerEvent, KeyboardEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
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
            <span className="mark-k">K<span>H</span></span>
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
            <p className="executive-eyebrow">EXECUTIVE LEADERSHIP <i/> STRATEGIC ADVISORY</p>
            <h1 id="executive-name">Kawser<br/><strong>Hamid</strong></h1>
            <div className="executive-role">CEO &amp; Founder, KH Dream Services Ltd</div>
            <div className="executive-rule"/>
            <p className="executive-description">Creating opportunities. Building lasting partnerships.</p>
            <div className="executive-ctas">
              <a href={bookingHref} className="gold-pill primary-cta">Book Premium Consultation <ArrowRight size={19}/></a>
              <a href={profileHref} className="subtle-cta">Explore Profile <ArrowRight size={17}/></a>
            </div>
          </motion.div>

          <div className="executive-gallery" role="region" aria-label="Kawser Hamid premium executive portrait carousel" tabIndex={0} onKeyDown={keyboard} onPointerEnter={()=>setPause(true)} onPointerLeave={()=>setPause(false)} onFocus={()=>setPause(true)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setPause(false)}} onTouchStart={e=>{startTouchX.current=e.touches[0]?.clientX??null;}} onTouchEnd={e=>{const x=e.changedTouches[0]?.clientX; if(startTouchX.current!==null && typeof x==='number' && Math.abs(x-startTouchX.current)>45)go(x<startTouchX.current?1:-1);startTouchX.current=null;}}>
            <div className="scene-backglow" aria-hidden="true" />
            <div className="floating-arc arc-upper" aria-hidden="true" />
            <div className="gold-stage" aria-hidden="true"><div className="stage-disc"/><div className="stage-ring stage-ring-outer"/><div className="stage-ring stage-ring-inner"/></div>
            <motion.div className="scene-portraits" style={reducedMotion?undefined:{x:sceneX,y:sceneY}}>
              {panelOffsets.map(offset=>{
                const p=chosen(offset);
                const placement=offset===-2?'card-far-left':offset===-1?'card-near-left':offset===1?'card-near-right':'card-far-right';
                return <motion.div className={`glass-portrait ${placement}`} key={`${placement}-${p.src}`} initial={reducedMotion?false:{opacity:0,scale:.89,y:18}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.72,ease:gentle}}>
                  <img src={p.src} alt={`${p.alt}, ${p.suit} suit`} loading="lazy" draggable={false} /><div className="card-halo" aria-hidden="true"/>
                </motion.div>;
              })}
              <AnimatePresence mode="wait"><motion.img key={chosen(0).src} className="executive-main-photo" src={chosen(0).src} alt={chosen(0).alt} fetchPriority="high" draggable={false} initial={reducedMotion?false:{opacity:0,y:25,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={reducedMotion?undefined:{opacity:0,y:12,scale:1.015}} transition={{duration:.65,ease:gentle}}/></AnimatePresence>
            </motion.div>
            <div className="gallery-actions"><button aria-label="Previous portrait" type="button" onClick={()=>go(-1)}><ChevronLeft size={19}/></button><div className="gallery-dots">{portraits.map((p,i)=><button key={p.src} type="button" onClick={()=>setActive(i)} aria-label={`View portrait ${i+1}`} aria-current={i===active?'true':undefined} className={i===active?'is-current':''}/>)}</div><button aria-label="Next portrait" type="button" onClick={()=>go(1)}><ChevronRight size={19}/></button></div>
          </div>
        </section>
        <footer className="executive-footer"><span>PERSONAL PORTFOLIO</span><span>RIYADH · SAUDI ARABIA</span></footer>
      </div>
    </main>
  );
}
