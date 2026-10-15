"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

export type AdaptiveNavItem = { label: string; href: string };
export type AdaptiveNavigationPillProps = {
  items: AdaptiveNavItem[];
  className?: string;
};

/**
 * Metallic 3D pill inspired by the supplied Adaptive Navigation Bar.
 * Collapses to the current item; hover, tap, click or keyboard expands links.
 * Routes use the actual portfolio navigation URLs — no dummy sections.
 */
export function AdaptiveNavigationPill({ items, className = "" }: AdaptiveNavigationPillProps) {
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [isHovering, setIsHovering] = useState(false);
  const shellRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillWidth = useSpring(140, { stiffness: 215, damping: 27, mass: 0.8 });
  const active = items.find(i => i.href === activeHref) ?? items[0];

  const clearCollapse = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const collapse = (delayed: boolean) => {
    clearCollapse();
    if (delayed) {
      timeoutRef.current = setTimeout(() => setExpanded(false), 460);
    } else {
      setExpanded(false);
    }
  };

  useEffect(() => {
    pillWidth.set(expanded ? 526 : 140);
  }, [expanded, pillWidth]);

  useEffect(() => {
    const outsidePointer = (ev: PointerEvent) => {
      if (shellRef.current && !shellRef.current.contains(ev.target as Node)) {
        clearCollapse();
        setExpanded(false);
      }
    };
    const escape = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        clearCollapse();
        setExpanded(false);
      }
    };
    document.addEventListener("pointerdown", outsidePointer);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outsidePointer);
      document.removeEventListener("keydown", escape);
      clearCollapse();
    };
  }, []);

  function onPointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    clearCollapse();
    setIsHovering(true);
    setExpanded(true);
  }
  function onPointerLeave(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    setIsHovering(false);
    collapse(true);
  }

  return (
    <motion.nav
      ref={shellRef}
      aria-label="Main navigation"
      className={"adaptive-pill " + className + (expanded ? " adaptive-pill-expanded" : "")}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlurCapture={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node) && !isHovering) collapse(true);
      }}
      style={{ width: pillWidth }}
      data-expanded={expanded ? "true" : "false"}
    >
      <span className="adaptive-pill-highlight" aria-hidden="true" />
      <span className="adaptive-pill-reflection" aria-hidden="true" />
      <div className="adaptive-pill-content">
        <AnimatePresence initial={false} mode="wait">
          {!expanded ? (
            <motion.button
              type="button"
              className="adaptive-pill-trigger"
              key="collapsed"
              aria-expanded={false}
              aria-label={"Open navigation menu. Current: " + (active?.label ?? "Home")}
              onClick={() => { clearCollapse(); setExpanded(true); }}
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? {opacity:0} : { opacity: 0, y: -6 }}
              transition={{ duration: reducedMotion ? 0 : .17 }}
            >
              <span>{active?.label ?? "Home"}</span>
              <ChevronDown aria-hidden="true" size={14} strokeWidth={2} />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              className="adaptive-pill-items"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{opacity:0}}
              transition={{ duration: reducedMotion ? 0 : .2 }}
            >
              {items.map((item, idx) => (
                <motion.a
                  key={item.href + item.label}
                  className={"adaptive-pill-link" + (item.href === activeHref ? " adaptive-pill-active" : "")}
                  href={item.href}
                  aria-current={item.href === activeHref ? "page" : undefined}
                  initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0 : .24, delay: reducedMotion ? 0 : idx * .025 }}
                  onClick={() => { setActiveHref(item.href); collapse(false); }}
                >
                  {item.label}
                </motion.a>
              ))}
              <button
                type="button"
                className="adaptive-pill-close"
                aria-label="Close navigation"
                onClick={() => collapse(false)}
              >
                <X aria-hidden="true" size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
