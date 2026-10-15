import { MinimalistHero } from '@/components/ui/minimalist-hero';
import ConstellationField from '@/components/ui/constellation-field';

const book = 'mailto:support@khdreamservices.com?subject=Private%20Consultation%20with%20Kawser%20Hamid';
const expertise = 'https://khdreamservices.com/services';

export default function App() {
  return (
    <div className="constellation-site-shell">
      <ConstellationField
        mode="dark"
        density={0.95}
        length={1}
        size={0.75}
        speed={0.55}
        opacity={0.78}
        strokeWidth={0.75}
        className="constellation-background"
      />
      <div className="constellation-site-content">
        <MinimalistHero
          logoText="Kawser Hamid"
          bookingHref={book}
          profileHref={expertise}
          navLinks={[
            { label: 'Home', href: '#home' },
            { label: 'About', href: 'https://khdreamservices.com/about' },
            { label: 'Expertise', href: expertise },
            { label: 'Consultancy', href: book },
            { label: 'Contact', href: 'mailto:support@khdreamservices.com' },
          ]}
        />
      </div>
    </div>
  );
}
