# Kawser Hamid — Executive Portfolio Hero

A responsive, one-page CEO portfolio hero prototype for **Kawser Hamid**, CEO & Founder of KH Dream Services Ltd.

## Status

- GitHub and Vercel production deployment connected.
- HTML, CSS, JS, SVG icons, 3D coverflow, autoplay, swipe, arrows, keyboard controls and email inquiry demo are committed.
- **Photos are not committed yet**. The six CEO-themed carousel scenes and official brand WebP must be imported using the workflow below. Until then, the carousel uses a temporary official-site CEO portrait fallback and is not the final design.

## Upload the photo assets (one manual action)

1. Download the specifically prepared `portfolio-assets.zip` shared in ChatGPT.
2. Open the repository **Add file → Upload files** page.
3. Upload that ZIP under the exact name `portfolio-assets.zip` to the `main` branch, then choose **Commit changes**.
4. GitHub Actions workflow `.github/workflows/import-portfolio-assets.yml` extracts only approved WebP image assets into `assets/photos/` and `assets/brand/`, commits them to `main`, and removes the ZIP from the repository.
5. Vercel automatically deploys the new commit. Check GitHub **Actions** for the import job and Vercel for the deployment status.

The ZIP contains **only** the 8 necessary WebP assets, not development notes or secrets. If Actions is disabled, upload the extracted `assets` folder instead.

## Features

- Personal `KH | Kawser Hamid` identity, KH Dream as secondary company affiliation.
- 3D animated six-image carousel.
- Responsive desktop and mobile layout.
- Keyboard, swipe, pause/play, carousel dots and reduced-motion support.
- Inquiry form that opens `mailto:`. **No live booking/payment backend exists yet.**

## Important publishing notes

AI-generated meeting/seminar/branch-opening visuals are **illustrations**, not documentary evidence of past events. Verify portraits and logo quality before treating them as official photographs. Do not claim unverified results, qualifications, dates or client numbers.

## Technology

Static HTML + CSS + vanilla JavaScript (no Node, npm or React required).
