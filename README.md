# Kawser Hamid — Premium Hero Section Prototype

This is a **local frontend hero-section prototype** based on the approved executive-portfolio design. It includes a functional 3D carousel and responsive layout. It does **not** include a live appointment database, payment gateway, or calendar integration.

## Run on Windows

1. Extract this ZIP into a folder such as `C:\Users\shopd\Documents\Kawser-Hamid-Portfolio`.
2. Double-click `index.html` to view the self-contained frontend in Chrome/Edge.
3. Alternatively, in PowerShell from the folder, run `python -m http.server 5500` and open `http://localhost:5500/`. Stop it with Ctrl+C.

## Features

- Personal `KH | Kawser Hamid` monogram and secondary KH Dream logo.
- Animated 3D coverflow carousel of **six** CEO-themed images.
- Navigation arrows, position indicators, swipe gestures, keyboard arrows, play/pause.
- Autoplay stops on hover/focus and browser tab backgrounding. Respects reduced-motion setting.
- Mobile responsive header and navigation menu.
- Premium consultation button opens a **demo inquiry form** that prepares an email using the visitor's own email client.
- Top nav links scroll to clearly marked **phase 2 section previews** below the hero.

## Important

- AI-generated images are **conceptual illustrations**; do not present depicted speeches, clients, or branch openings as verified historical events. Replace with real, permission-cleared photography if making factual claims.
- Hero claims and statistics must be verified with the CEO before production publication. This prototype intentionally uses non-numeric focus labels instead of invented performance metrics.
- Company logo was cropped from the supplied user reference poster; replace with the exact high-resolution approved logo before publishing.
- **No live bookings are captured.** To add payment, calendar availability, dashboard and secure records, a backend is required.
- Company email in the demo: `support@khdreamservices.com`.

## Files

- `index.html`: semantic markup / hero + future section previews
- `styles.css`: responsive premium design / carousel visuals
- `script.js`: carousel interaction / menu / demo inquiry
- `assets/photos/*.webp`: optimized editorial images
- `assets/brand/*`: personal monogram, source-derived company logo, skyline drawing

No npm install or React build needed.