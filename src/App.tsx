import { MinimalistHero } from '@/components/ui/minimalist-hero';

const book = 'mailto:support@khdreamservices.com?subject=Premium%20Consultation%20with%20Kawser%20Hamid';

export default function App() {
  return <MinimalistHero
    logoText="Kawser Hamid"
    bookingHref={book}
    profileHref="https://khdreamservices.com/about"
    navLinks={[
      {label:'Home',href:'#home'},
      {label:'About',href:'https://khdreamservices.com/about'},
      {label:'Expertise',href:'https://khdreamservices.com/services'},
      {label:'Consultancy',href:book},
      {label:'Contact',href:'mailto:support@khdreamservices.com'},
    ]}
    portraits={[
      {src:'/assets/photos/hero-navy-seated.webp',alt:'Kawser Hamid seated in a premium executive chair',suit:'navy blue'},
      {src:'/assets/photos/hero-gray-seated.webp',alt:'Kawser Hamid in a thoughtful executive portrait',suit:'light gray'},
      {src:'/assets/photos/hero-burgundy-seated.webp',alt:'Kawser Hamid seated in a burgundy business suit',suit:'burgundy'},
      {src:'/assets/photos/hero-green-seated.webp',alt:'Kawser Hamid seated in a dark green business suit',suit:'olive green'},
      {src:'/assets/photos/hero-black-seated.webp',alt:'Kawser Hamid at his office desk in a formal suit',suit:'charcoal'},
    ]}
  />;
}
