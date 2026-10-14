import { Facebook, Globe2, Mail } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const bookingEmail = 'mailto:support@khdreamservices.com?subject=Premium%20Executive%20Consultation%20with%20Kawser%20Hamid';

export default function App() {
  return (
    <MinimalistHero
      logoText="Kawser Hamid"
      navLinks={[
        { label: 'ABOUT', href: 'https://khdreamservices.com/about' },
        { label: 'THE COMPANY', href: 'https://khdreamservices.com' },
        { label: 'CONTACT', href: 'mailto:support@khdreamservices.com' },
      ]}
      mainText="Business is personal. So is the vision behind it."
      readMoreLink="https://khdreamservices.com/about"
      imageSrc="/assets/photos/executive-portrait.webp"
      imageAlt="Kawser Hamid, CEO and Founder of KH Dream Services Ltd"
      images={[
        { src: '/assets/photos/executive-portrait.webp', alt: 'Kawser Hamid executive portrait', position: 'center 35%' },
        { src: '/assets/photos/keynote.webp', alt: 'Kawser Hamid presenting at a corporate event', position: '57% center' },
        { src: '/assets/photos/saudi-consultation.webp', alt: 'Kawser Hamid in a professional consultation', position: '53% center' },
      ]}
      overlayText={{ part1: 'Kawser', part2: 'Hamid.' }}
      socialLinks={[
        { icon: Facebook, href: 'https://www.facebook.com/khdreamservices/', label: 'KH Dream Services Facebook' },
        { icon: Globe2, href: 'https://khdreamservices.com', label: 'KH Dream Services website' },
        { icon: Mail, href: 'mailto:support@khdreamservices.com', label: 'Email' },
      ]}
      locationText="RIYADH  ·  SAUDI ARABIA"
      consultationLink={bookingEmail}
    />
  );
}
