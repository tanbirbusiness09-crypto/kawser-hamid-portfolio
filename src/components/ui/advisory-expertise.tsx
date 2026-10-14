import { motion, useReducedMotion } from 'framer-motion';

const services = [
  { title: 'Business Setup', description: 'Company formation and establishment', icon: '/assets/advisory/icons/business-setup.svg' },
  { title: 'Investor Licensing', description: 'Saudi investment licensing guidance', icon: '/assets/advisory/icons/investor-licensing.svg' },
  { title: 'Market Entry', description: 'Planning your growth in Saudi Arabia', icon: '/assets/advisory/icons/market-entry.svg' },
  { title: 'Executive Advisory', description: 'Private guidance for business leaders', icon: '/assets/advisory/icons/executive-advisory.svg' },
] as const;

export function AdvisoryExpertise() {
  const reducedMotion = useReducedMotion();
  const motionEnabled = !reducedMotion;

  return (
    <section id="expertise" className="advisory-v15" aria-labelledby="advisory-heading">
      <div className="advisory-v15-atmosphere" aria-hidden="true">
        <span className="advisory-v15-glow-one" />
        <span className="advisory-v15-glow-two" />
      </div>
      <div className="advisory-v15-art" role="img" aria-label="Golden investor licensing certificate and Saudi skyline" />
      <div className="advisory-v15-art-shade" aria-hidden="true" />

      <svg className="advisory-v15-divider" viewBox="0 0 1600 72" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="advisory-v15-divider-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c39251" stopOpacity=".12"/>
            <stop offset="32%" stopColor="#f8d89c" stopOpacity=".86"/>
            <stop offset="68%" stopColor="#e6b972" stopOpacity=".77"/>
            <stop offset="100%" stopColor="#a86c32" stopOpacity=".15"/>
          </linearGradient>
        </defs>
        <path className="advisory-v15-divider-light" d="M-20 12 C 315 4 365 67 700 53 S 1250 53 1620 16"/>
      </svg>

      <svg className="advisory-v15-orbit" viewBox="0 0 900 570" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path className="advisory-v15-orbit-light" d="M29 523 C 49 272 171 65 411 37 C 616 13 819 139 875 359"/>
        <circle className="advisory-v15-orbit-point" cx="411" cy="37" r="3.4"/>
      </svg>
      <div className="advisory-v15-floor-glow" aria-hidden="true" />

      <div className="advisory-v15-inner">
        <motion.div
          className="advisory-v15-intro"
          initial={motionEnabled ? { opacity: 0, y: 22 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: motionEnabled ? 0.85 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="advisory-v15-kicker"><span aria-hidden="true" /> EXECUTIVE ADVISORY</p>
          <h2 id="advisory-heading">
            <span>Expertise That</span>
            <strong>Moves Business<br />Forward.</strong>
          </h2>
          <p className="advisory-v15-description">
            Strategic guidance for investor licensing, Saudi business setup, market entry, and long-term growth.
          </p>
        </motion.div>

        <div className="advisory-v15-services" aria-label="Executive advisory specialties">
          <svg className="advisory-v15-service-thread" viewBox="0 0 1400 75" preserveAspectRatio="none" aria-hidden="true">
            <path className="advisory-v15-service-spark" d="M-20 51 C 135 0 222 64 367 40 S 616 4 720 39 S 988 62 1089 26 S 1315 20 1420 48"/>
          </svg>
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href="https://khdreamservices.com/services"
              target="_blank"
              rel="noopener noreferrer"
              className="advisory-v15-service"
              initial={motionEnabled ? { opacity: 0, y: 18 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: motionEnabled ? 0.65 : 0, delay: motionEnabled ? index * 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={service.icon} width="52" height="52" alt="" loading="lazy" />
              <span className="advisory-v15-service-title">{service.title}</span>
              <span className="advisory-v15-service-desc">{service.description}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
