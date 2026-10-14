import { motion, useReducedMotion } from 'framer-motion';

const areas = [
  { title: 'Business Setup', description: 'Company formation and establishment services.', icon: '/assets/advisory/icons/business-setup.svg' },
  { title: 'Investor Licensing', description: 'Guidance for Saudi investment licensing.', icon: '/assets/advisory/icons/investor-licensing.svg' },
  { title: 'Market Entry', description: 'Strategic planning for successful expansion.', icon: '/assets/advisory/icons/market-entry.svg' },
  { title: 'Executive Advisory', description: 'Personalized support for business leaders.', icon: '/assets/advisory/icons/executive-advisory.svg' }
] as const;

export function AdvisoryExpertise() {
  const reduceMotion = useReducedMotion();
  const intro = reduceMotion ? undefined : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .25 }, transition: { duration: .95, ease: [0.22, 1, 0.36, 1] as const } };

  return <section id="expertise" className="advisory-v12" aria-labelledby="advisory-heading">
    <div className="advisory-v12-art" role="img" aria-label="Gold investor license certificate, Saudi flag and Riyadh skyline" />
    <div className="advisory-v12-shade" aria-hidden="true" />
    {/* Independent motion layers match the approved concept without embedding UI in the background image. */}
    <svg className="advisory-edge-wave" viewBox="0 0 1600 112" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="advisory-edge-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#af7230" stopOpacity=".25"/>
          <stop offset="17%" stopColor="#f9d990"/><stop offset="54%" stopColor="#fff1bb"/>
          <stop offset="83%" stopColor="#c9974e"/><stop offset="100%" stopColor="#ffdb8a"/>
        </linearGradient>
      </defs>
      <path className="advisory-edge-glow" d="M-20 8 C 230 10 266 92 590 89 C 805 87 955 49 1159 58 C 1332 68 1473 66 1620 28" />
      <path className="advisory-edge-line" d="M-20 8 C 230 10 266 92 590 89 C 805 87 955 49 1159 58 C 1332 68 1473 66 1620 28" />
      <path className="advisory-edge-spark" d="M-20 8 C 230 10 266 92 590 89 C 805 87 955 49 1159 58 C 1332 68 1473 66 1620 28" />
    </svg>
    <svg className="advisory-license-orbit" viewBox="0 0 960 650" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="advisory-orbit-gradient" x1="0" y1="0" x2="1" y2=".65">
          <stop offset="0" stopColor="#f7dca0" stopOpacity="0"/>
          <stop offset=".32" stopColor="#e5b264" stopOpacity=".85"/>
          <stop offset=".73" stopColor="#ffd787" stopOpacity=".94"/>
          <stop offset="1" stopColor="#d99c45" stopOpacity=".13"/>
        </linearGradient>
      </defs>
      <path className="advisory-orbit-line" d="M45 570 C 62 367 172 123 410 55 C 607 -12 858 85 926 267 C 963 368 938 458 899 563"/>
      <path className="advisory-orbit-trail" d="M45 570 C 62 367 172 123 410 55 C 607 -12 858 85 926 267 C 963 368 938 458 899 563"/>
      <circle className="advisory-orbit-node advisory-orbit-node-a" cx="169" cy="274" r="4.2"/>
      <circle className="advisory-orbit-node advisory-orbit-node-b" cx="598" cy="42" r="3.6"/>
      <circle className="advisory-orbit-node advisory-orbit-node-c" cx="932" cy="414" r="4.1"/>
    </svg>
    <svg className="advisory-license-platform" viewBox="0 0 1000 210" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <ellipse className="advisory-platform-halo" cx="520" cy="120" rx="475" ry="72"/>
      <ellipse className="advisory-platform-outer" cx="520" cy="120" rx="469" ry="62"/>
      <ellipse className="advisory-platform-inner" cx="520" cy="125" rx="410" ry="45"/>
      <path className="advisory-platform-glint" d="M65 112 C 190 36 830 38 978 118"/>
    </svg>
    <div className="advisory-v12-inner">
      <motion.div className="advisory-v12-intro" {...intro}>
        <p className="advisory-v12-kicker"><span aria-hidden="true" /> EXECUTIVE ADVISORY</p>
        <h2 id="advisory-heading">Expertise That <strong>Moves Business Forward.</strong></h2>
        <p className="advisory-v12-description">Practical guidance, strategic insight, and end-to-end support for investors and business leaders entering and growing in Saudi Arabia.</p>

      </motion.div>
      <div className="advisory-v12-services" aria-label="Specialist advisory areas">
        <svg className="advisory-service-wave" viewBox="0 0 1420 115" preserveAspectRatio="none" aria-hidden="true">
          <path className="advisory-service-wave-base" d="M-15 91 C 100 25 179 13 292 69 S 468 106 559 58 S 732 27 826 65 S 1009 97 1087 49 S 1297 39 1435 64"/>
          <path className="advisory-service-wave-glint" d="M-15 91 C 100 25 179 13 292 69 S 468 106 559 58 S 732 27 826 65 S 1009 97 1087 49 S 1297 39 1435 64"/>
          <circle className="advisory-service-light light-one" cx="120" cy="34" r="3.5"/>
          <circle className="advisory-service-light light-two" cx="635" cy="42" r="3.5"/>
          <circle className="advisory-service-light light-three" cx="1124" cy="38" r="3.5"/>
        </svg>
        {areas.map((item,index)=><motion.a key={item.title}
          href="https://khdreamservices.com/services" target="_blank" rel="noopener noreferrer"
          className="advisory-v12-service"
          initial={reduceMotion?false:{opacity:0,y:25}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:.3}}
          transition={{duration:reduceMotion?0:.75,delay:reduceMotion?0:index*.11,ease:[.22,1,.36,1]}}>
          <img src={item.icon} alt="" width="60" height="60" loading="lazy" />
          <span className="advisory-v12-service-title">{item.title}</span>
          <span className="advisory-v12-service-description">{item.description}</span>
        </motion.a>)}
      </div>
    </div>
  </section>;
}
