import { MinimalistHero } from '@/components/ui/minimalist-hero';

const email = 'mailto:support@khdreamservices.com?subject=Premium%20Executive%20Consultation%20with%20Kawser%20Hamid';

export default function App() {
  return <MinimalistHero
    logoText="Kawser Hamid"
    bookingHref={email}
    profileHref="https://khdreamservices.com/about"
    navLinks={[
      {label:'Home',href:'#home'},
      {label:'About',href:'https://khdreamservices.com/about'},
      {label:'Expertise',href:'https://khdreamservices.com/services'},
      {label:'Consultancy',href:email},
      {label:'Contact',href:'mailto:support@khdreamservices.com'},
    ]}
    portraits={[
      {src:'/assets/photos/kawser-hero-standing.webp',alt:'Kawser Hamid standing in executive business attire',label:'Executive leadership'},
      {src:'/assets/photos/kawser-hero-seated.webp',alt:'Kawser Hamid seated at his executive desk',label:'Strategic consultancy'},
      {src:'/assets/photos/kawser-hero-standing-2.webp',alt:'Kawser Hamid in a navy suit',label:'Leadership vision'},
    ]}
  />;
}
