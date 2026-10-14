import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

type AdvisoryExpertiseProps = { bookingHref: string };

const areas = [
  { title: 'Business Setup', description: 'Company formation and establishment services.', icon: '/assets/advisory/icons/business-setup.svg' },
  { title: 'Investor Licensing', description: 'Guidance for Saudi investment licensing.', icon: '/assets/advisory/icons/investor-licensing.svg' },
  { title: 'Market Entry', description: 'Strategic planning for successful expansion.', icon: '/assets/advisory/icons/market-entry.svg' },
  { title: 'Executive Advisory', description: 'Personalized support for business leaders.', icon: '/assets/advisory/icons/executive-advisory.svg' }
] as const;

export function AdvisoryExpertise({ bookingHref }: AdvisoryExpertiseProps) {
  const reduceMotion = useReducedMotion();
  const intro = reduceMotion ? undefined : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .25 }, transition: { duration: .95, ease: [0.22, 1, 0.36, 1] as const } };

  return <section id="expertise" className="advisory-v12" aria-labelledby="advisory-heading">
    <div className="advisory-v12-art" role="img" aria-label="Gold investor license certificate, Saudi flag and Riyadh skyline" />
    <div className="advisory-v12-shade" aria-hidden="true" />
    <div className="advisory-v12-gold-curve" aria-hidden="true"/>
    <div className="advisory-v12-inner">
      <motion.div className="advisory-v12-intro" {...intro}>
        <p className="advisory-v12-kicker"><span aria-hidden="true" /> EXECUTIVE ADVISORY</p>
        <h2 id="advisory-heading">Expertise That <strong>Moves Business Forward.</strong></h2>
        <p className="advisory-v12-description">Practical guidance, strategic insight, and end-to-end support for investors and business leaders entering and growing in Saudi Arabia.</p>
        <div className="advisory-v12-actions">
          <a className="advisory-v12-primary" href={bookingHref}>Book Private Consultation <ArrowRight size={18} aria-hidden="true"/></a>
          <a className="advisory-v12-secondary" href="https://khdreamservices.com/" target="_blank" rel="noopener noreferrer">
            <span className="advisory-v12-play" aria-hidden="true"><ArrowUpRight size={19}/></span>
            <span>Company Overview <small>KH Dream Services</small></span>
          </a>
        </div>
      </motion.div>
      <div className="advisory-v12-services" aria-label="Specialist advisory areas">
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
