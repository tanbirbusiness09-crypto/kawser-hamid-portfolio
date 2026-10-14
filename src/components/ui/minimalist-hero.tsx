import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Menu, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = { label: string; href: string };
type Portrait = { src: string; alt: string; label: string };
export interface MinimalistHeroProps {
  logoText: string;
  navLinks: NavItem[];
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
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 46, damping: 22 });
  const springY = useSpring(y, { stiffness: 46, damping: 22 });
  const driftX = useTransform(springX, [-1, 1], [-22, 22]);
  const driftY = useTransform(springY, [-1, 1], [-13, 13]);
  const lightX = useTransform(springX, [-1, 1], ['25%', '75%']);
  const lightY = useTransform(springY, [-1, 1], ['25%', '75%']);
  const touchX = useRef<number | null>(null);
  const total = portraits.length;
  const show = (step: number) => setActive(prev => (prev + step + total) % total);

  useEffect(() => {
    if (reducedMotion || hovering || menuOpen || total < 2) return;
    const timer = window.setInterval(() => setActive(v => (v + 1) % total), 6600);
    return () => window.clearInterval(timer);
  }, [total, hovering, reducedMotion, menuOpen]);

  function moveCursor(e: PointerEvent<HTMLElement>) {
    if (reducedMotion || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - .5) * 2);
    y.set(((e.clientY - r.top) / r.height - .5) * 2);
  }

  const left = portraits[(active - 1 + total) % total];
  const center = portraits[active];
  const right = portraits[(active + 1) % total];

  return (
    <main id="home" className={cn('luxury-hero', className)} onPointerMove={moveCursor} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <div className="background-city" aria-hidden="true" />
      <div className="background-vignette" aria-hidden="true" />
      <motion.div className="cursor-light" style={reducedMotion ? undefined : { left: lightX, top: lightY }} aria-hidden="true" />
      <div className="gold-arch gold-arch-left" aria-hidden="true" />
      <div className="gold-arch gold-arch-right" aria-hidden="true" />

      <div className="luxury-content">
        <header className="luxury-header">
          <a href="#home" className="luxury-brand" aria-label={`${logoText} homepage`}>
            <span className="luxury-mark"><span>K</span><em>H</em></span>
            <i className="luxury-divider" aria-hidden="true" />
            <span className="luxury-brandname">Kawser <b>Hamid</b></span>
          </a>
          <nav className="luxury-nav" aria-label="Main navigation">
            {navLinks.map((item, idx) => <a key={item.label} className={idx===0?'current':''} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="gold-button nav-book" href={bookingHref}><CalendarDays size={18} strokeWidth={1.9}/><span>Book Consultation</span><ArrowRight size={18}/></a>
          <button type="button" className="menu-trigger" aria-expanded={menuOpen} aria-label={menuOpen?'Close menu':'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen?<X size={25}/>:<Menu size={25}/>}</button>
        </header>
        <AnimatePresence>{menuOpen && <motion.nav className="mobile-menu" initial={{opacity:0,y:-9}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} aria-label="Mobile navigation">{navLinks.map(item=><a href={item.href} onClick={()=>setMenuOpen(false)} key={item.label}>{item.label}</a>)}<a href={bookingHref} onClick={()=>setMenuOpen(false)}>Book consultation ↗</a></motion.nav>}</AnimatePresence>

        <section className="luxury-main" aria-labelledby="hero-heading">
          <motion.div className="luxury-copy" initial={reducedMotion?false:{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.95,ease:gentle}}>
            <p className="lead-overline">LEADERSHIP <span>•</span> STRATEGY <span>•</span> GROWTH</p>
            <h1 id="hero-heading">Kawser<br/><strong>Hamid</strong></h1>
            <p className="ceo-role">CEO &amp; Founder, <span>KH Dream Services Ltd</span></p>
            <div className="tiny-gold-line" />
            <p className="luxury-descriptor">Executive leadership. Strategic consultancy.<br className="desktop-break"/> Business opportunities in Saudi Arabia.</p>
            <div className="luxury-actions">
              <a href={bookingHref} className="gold-button hero-book"><CalendarDays size={18}/><span>Book Consultation</span><ArrowRight size={19}/></a>
              <a href={profileHref} className="secondary-link"><span className="play-disc"><Play size={13} fill="currentColor"/></span><span>Explore Profile</span></a>
            </div>
          </motion.div>

          <div className="luxury-visual" onPointerEnter={()=>setHovering(true)} onPointerLeave={()=>setHovering(false)} onTouchStart={e=>{touchX.current=e.touches[0]?.clientX??null}} onTouchEnd={e=>{if(touchX.current!==null){const delta=(e.changedTouches[0]?.clientX??touchX.current)-touchX.current;if(Math.abs(delta)>35)show(delta<0?1:-1);touchX.current=null;}}}>
            <div className="scene-aura" aria-hidden="true" />
            <div className="scene-ring scene-ring-back" aria-hidden="true" />
            <div className="scene-ring scene-ring-front" aria-hidden="true" />
            <motion.div className="portrait-stage" style={reducedMotion ? undefined : { x: driftX, y: driftY }}>
              <motion.div key={'left-'+active} className="portrait-panel panel-left" initial={reducedMotion?false:{opacity:0,x:32,scale:.93}} animate={{opacity:1,x:0,scale:1}} transition={{duration:.7,ease:gentle}}>
                <img src={left.src} alt={left.alt} loading="lazy"/>
                <span className="panel-shine" aria-hidden="true" />
              </motion.div>
              <motion.div key={'right-'+active} className="portrait-panel panel-right" initial={reducedMotion?false:{opacity:0,x:-28,scale:.94}} animate={{opacity:1,x:0,scale:1}} transition={{duration:.7,ease:gentle}}>
                <img src={right.src} alt={right.alt} loading="lazy"/>
                <span className="panel-shine" aria-hidden="true" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.img className="ceo-cutout" key={center.src} src={center.src} alt={center.alt} fetchPriority="high" initial={reducedMotion?false:{opacity:0,y:20,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={reducedMotion?undefined:{opacity:0,y:7,scale:1.02}} transition={{duration:.68,ease:gentle}} />
              </AnimatePresence>
            </motion.div>
            <div className="carousel-controls">
              <button type="button" aria-label="Previous portrait" onClick={()=>show(-1)}><ChevronLeft size={19}/></button>
              <div role="group" aria-label="Portrait selector" className="carousel-dots">{portraits.map((p,index)=><button key={p.src} type="button" className={index===active?'selected':''} aria-label={`View portrait ${index+1}`} aria-current={index===active?'true':undefined} onClick={()=>setActive(index)} />)}</div>
              <button type="button" aria-label="Next portrait" onClick={()=>show(1)}><ChevronRight size={19}/></button>
            </div>
          </div>
        </section>
        <div className="hero-bottom-line"><span>KH DREAM SERVICES LTD</span><span>RIYADH · SAUDI ARABIA</span></div>
      </div>
    </main>
  );
}
