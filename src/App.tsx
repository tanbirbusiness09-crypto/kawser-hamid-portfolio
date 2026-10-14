import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { AdvisoryExpertise } from '@/components/ui/advisory-expertise';

const book = 'mailto:support@khdreamservices.com?subject=Private%20Consultation%20with%20Kawser%20Hamid';

export default function App() {
  return <>
    <MinimalistHero
    logoText="Kawser Hamid"
    bookingHref={book}
    profileHref="#expertise"
    navLinks={[
      {label:'Home',href:'#home'},
      {label:'About',href:'https://khdreamservices.com/about'},
      {label:'Expertise',href:'#expertise'},
      {label:'Consultancy',href:book},
      {label:'Contact',href:'mailto:support@khdreamservices.com'},
    ]}
    />
    <AdvisoryExpertise />
  </>;
}
