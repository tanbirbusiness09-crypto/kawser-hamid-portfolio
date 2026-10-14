import { MinimalistHero } from '@/components/ui/minimalist-hero';

const book = 'mailto:support@khdreamservices.com?subject=Private%20Consultation%20with%20Kawser%20Hamid';

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
  />;
}
