import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Photo {
  src: string;
  alt: string;
  position?: string;
}

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: { part1: string; part2: string };
  socialLinks: { icon: LucideIcon; href: string; label?: string }[];
  locationText: string;
  consultationLink?: string;
  images?: Photo[];
  className?: string;
}

const entrance = { type: 'spring', damping: 24, stiffness: 105 } as const;

export function MinimalistHero({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  consultationLink = readMoreLink,
  images,
  className,
}: MinimalistHeroProps) {
  const reducedMotion = useReducedMotion();
  const imageSet = images?.length ? images : [{ src: imageSrc, alt: imageAlt }];
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  // Motion values update outside the React render loop: smooth and inexpensive.
  const cursorX = useMotionValue(-600);
  const cursorY = useMotionValue(-600);
  const smoothedX = useSpring(cursorX, { stiffness: 95, damping: 24, mass: 0.55 });
  const smoothedY = useSpring(cursorY, { stiffness: 95, damping: 24, mass: 0.55 });
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const tiltX = useSpring(tiltXRaw, { stiffness: 62, damping: 23 });
  const tiltY = useSpring(tiltYRaw, { stiffness: 62, damping: 23 });
  const moveX = useTransform(tiltY, [-5, 5], [-10, 10]);
  const moveY = useTransform(tiltX, [-4, 4], [-6, 6]);

  useEffect(() => {
    if (reducedMotion || imageSet.length < 2 || isHovering) return;
    const timer = window.setInterval(() => setActiveIndex(index => (index + 1) % imageSet.length), 5800);
    return () => window.clearInterval(timer);
  }, [imageSet.length, reducedMotion, isHovering]);

  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cursorX.set(x);
    cursorY.set(y);
    const nx = x / rect.width - 0.5;
    const ny = y / rect.height - 0.5;
    tiltYRaw.set(nx * 7);
    tiltXRaw.set(ny * -5);
  }

  function resetPointer() {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
    cursorX.set(-600);
    cursorY.set(-600);
  }

  const currentImage = imageSet[activeIndex];

  return (
    <main
      id="home"
      ref={rootRef}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      className={cn('executive-hero relative isolate min-h-[100svh] w-full overflow-hidden text-[#f4f2ec]', className)}
    >
      <div className="texture-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="upper-ambient pointer-events-none absolute inset-0" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="cursor-ambient pointer-events-none absolute z-0 rounded-full"
        style={{ x: smoothedX, y: smoothedY }}
      />
      <div className="edge-line pointer-events-none absolute top-0 bottom-0 left-[7%] hidden lg:block" aria-hidden="true" />
      <div className="edge-line pointer-events-none absolute top-0 bottom-0 right-[7%] hidden lg:block" aria-hidden="true" />

      <div className="hero-container relative z-10 flex min-h-[100svh] flex-col">
        <header className="hero-header flex items-center justify-between gap-5">
          <motion.a
            initial={reducedMotion ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="brand-lockup flex items-center gap-3"
            href="#home"
            aria-label={`${logoText} — Home`}
          >
            <span className="brand-monogram">KH<span className="brand-dot">.</span></span>
            <span className="brand-divider" />
            <span className="brand-name">{logoText}</span>
          </motion.a>

          <nav className="main-nav hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="nav-item" target={link.href.startsWith('https://') ? '_blank' : undefined} rel={link.href.startsWith('https://') ? 'noopener noreferrer' : undefined}>{link.label}</a>
            ))}
          </nav>

          <a className="header-cta hidden items-center gap-2 sm:inline-flex" href={consultationLink}>
            LET'S TALK <ArrowUpRight size={15} strokeWidth={1.65} aria-hidden="true" />
          </a>
          <button type="button" className="menu-toggle md:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              aria-label="Mobile navigation"
              className="mobile-nav absolute top-[88px] left-5 right-5 z-50 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#11141b]/95 p-4 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            >
              {navLinks.map(link => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white">{link.label}</a>)}
              <a className="mt-1 rounded-lg border border-[#c9ad75]/30 px-4 py-3 text-sm text-[#e2c994]" href={consultationLink} onClick={() => setMenuOpen(false)}>BOOK A PRIVATE CONSULTATION ↗</a>
            </motion.nav>
          )}
        </AnimatePresence>

        <section className="hero-stage relative grid flex-1 items-center" aria-label="Introducing Kawser Hamid">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="intro-area relative z-30"
          >
            <p className="eyebrow"><span className="eyebrow-mark" /> AN EXECUTIVE PERSPECTIVE</p>
            <p className="intro-copy">{mainText}</p>
            <a className="discover-link" href={readMoreLink} target="_blank" rel="noopener noreferrer">
              DISCOVER MY STORY <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>

          <div className="portrait-column relative z-10" onPointerEnter={() => setIsHovering(true)} onPointerLeave={() => setIsHovering(false)}>
            <motion.div
              className="halo-ring pointer-events-none absolute"
              initial={reducedMotion ? false : { scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={reducedMotion ? undefined : { x: moveX, y: moveY }}
              aria-hidden="true"
            />
            <motion.div
              className="portrait-visual relative"
              initial={reducedMotion ? false : { y: 42, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div className="portrait-mask absolute inset-0" style={reducedMotion ? undefined : { x: moveX, y: moveY }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage.src}
                    src={currentImage.src}
                    alt={currentImage.alt}
                    style={{ objectPosition: currentImage.position ?? 'center' }}
                    className="hero-portrait absolute inset-0 h-full w-full object-cover"
                    initial={reducedMotion ? false : { opacity: 0, scale: 1.045 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0, scale: 1.025 }}
                    transition={{ duration: reducedMotion ? 0 : 0.85 }}
                    fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
                  />
                </AnimatePresence>
                <div className="portrait-tint pointer-events-none absolute inset-0" aria-hidden="true" />
              </motion.div>
            </motion.div>
            {imageSet.length > 1 && (
              <div className="photo-selector relative z-30 flex justify-center gap-2" aria-label="Executive image carousel">
                {imageSet.map((photo, index) => (
                  <button
                    type="button"
                    key={photo.src}
                    className={cn('selector-bar', index === activeIndex && 'is-active')}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show photo ${index + 1}: ${photo.alt}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...entrance, delay: 0.55 }}
            className="headline-area relative z-20"
          >
            <h1 className="hero-title"><span>{overlayText.part1}</span><span className="title-second">{overlayText.part2}</span></h1>
            <div className="title-meta"><span className="meta-line" /><span>CEO &amp; FOUNDER<br /><strong>KH DREAM SERVICES LTD</strong></span></div>
            <a href={consultationLink} className="main-cta">PRIVATE CONSULTATION <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /></a>
          </motion.div>
        </section>

        <footer className="hero-footer flex items-center justify-between gap-4">
          <div className="footer-social flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a key={href} href={href} aria-label={label ?? 'Social link'} target={href.startsWith('https://') ? '_blank' : undefined} rel={href.startsWith('https://') ? 'noopener noreferrer' : undefined} className="social-link">
                <Icon size={18} strokeWidth={1.45} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="footer-center hidden items-center gap-2 sm:flex">SCROLL TO EXPLORE <ArrowDownRight size={13} aria-hidden="true" /></div>
          <div className="footer-location">{locationText}</div>
        </footer>
      </div>
    </main>
  );
}
