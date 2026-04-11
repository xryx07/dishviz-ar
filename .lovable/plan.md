

## Redesign DishViz in Penderecki's Garden Style

Transform your DishViz website from a light, corporate layout into a dark, immersive, cinematic experience inspired by Penderecki's Garden.

### Design Direction

The reference site features:
- Dark moody background (deep brownish-purple tones)
- Elegant cream/beige serif typography on dark backgrounds
- Full-screen immersive hero with particle/visual effects
- Centered, minimal content with lots of breathing room
- Smooth scroll-triggered animations
- Circular "ENTER" style CTAs
- Chapter-based storytelling navigation

### Changes

**1. Dark Color Palette Overhaul** (`src/index.css`)
- Switch default theme to dark moody tones: background ~`#3D2F35` (warm dark brown-purple), foreground cream/beige `#E8DDD3`
- Primary becomes the cream color, accent becomes a muted teal/sage green
- Cards get semi-transparent dark backgrounds with subtle borders
- Remove the separate `.dark` class and make dark the default

**2. Navigation Redesign** (`src/components/Navigation.tsx`)
- Make it transparent/minimal over the hero
- Logo top-right in elegant serif (Playfair Display), hamburger menu top-left
- Navigation links appear in a full-screen overlay when menu is opened
- Cream/beige text colors throughout

**3. Immersive Full-Screen Hero** (`src/components/sections/Hero.tsx`)
- Full viewport height (`h-screen`) dark background
- Add floating particle effects using CSS animations (dots/sparkles)
- Center the 3D model viewer with the title overlaid
- Add a circular "Explore" or "Enter" button below
- Large elegant serif heading with subtle fade-in animation

**4. Section Redesign - All Sections**
- `HowItWorks.tsx`: Full-width dark sections, each step gets its own "chapter" feel with large numbers (01, 02, 03) and elegant typography
- `Benefits.tsx`: Cards with semi-transparent dark backgrounds, subtle glow borders, hover effects
- `Demo.tsx`: Full-bleed dark gallery with larger cards, glowing borders on hover
- `Pricing.tsx`: Centered minimal section with circular CTA button matching the reference style
- `Contact.tsx`: Dark form with cream-colored inputs and elegant styling
- `AboutCompany.tsx` & `About.tsx`: Cinematic full-width sections

**5. Particle/Ambient Effects** (new `src/components/ParticleBackground.tsx`)
- Create a CSS-only floating particle animation component
- Small dots that float upward with varying opacity and speed
- Used as background layer in Hero and key sections

**6. Scroll Animations Enhancement**
- Add parallax-like scroll effects using framer-motion's `useScroll` and `useTransform`
- Sections fade and slide in more dramatically
- Text reveals character-by-character or word-by-word for headings

**7. Footer Redesign** (`src/components/Footer.tsx`)
- Match the dark theme with cream text
- Minimal, elegant layout

**8. Tailwind Config Updates** (`tailwind.config.ts`)
- Add new keyframes for particle floating, glow pulse, text reveal animations
- Add custom utilities for glassmorphism effects

### Technical Details

- All color changes go through CSS custom properties in `src/index.css` so the entire theme updates consistently
- Particle effects are pure CSS (no heavy libraries) using `@keyframes` with multiple animated `div` elements
- Framer Motion (already installed) handles scroll-triggered animations
- No new dependencies needed
- The 3D model viewer and AR features remain fully functional

### Files to Create/Modify
- `src/index.css` - New dark color palette
- `src/components/ParticleBackground.tsx` - New particle effect component
- `src/components/Navigation.tsx` - Transparent overlay nav
- `src/components/sections/Hero.tsx` - Full-screen immersive hero
- `src/components/sections/HowItWorks.tsx` - Chapter-style steps
- `src/components/sections/Benefits.tsx` - Dark glassmorphic cards
- `src/components/sections/Demo.tsx` - Dark gallery
- `src/components/sections/Pricing.tsx` - Minimal dark CTA
- `src/components/sections/Contact.tsx` - Dark form
- `src/components/sections/AboutCompany.tsx` - Cinematic section
- `src/components/sections/About.tsx` - Dark themed
- `src/components/Footer.tsx` - Dark minimal footer
- `tailwind.config.ts` - New animations/keyframes

