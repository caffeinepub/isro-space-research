# ISRO Space Research Website

## Current State
New project with no existing implementation.

## Requested Changes (Diff)

### Add
- Hero section: cinematic header with animated starfield, rocket launch, orbiting planets, title "Exploring the Infinite Universe", subtitle, and 3 CTA buttons
- About ISRO section: history (founded 1969, Bengaluru HQ), mission overview, capabilities
- Space Missions section: animated glassmorphism cards for Chandrayaan-3, Mars Orbiter Mission, Aditya-L1 with hover glow effects
- Universe Explained section: educational cards covering Stars, Galaxies, Distance in Space, Black Holes, Nebulae
- Solar System section: interactive animated solar system with 8 orbiting planets, each with size/temperature/distance info
- Rockets & Satellites section: explainer with satellite use cases, rocket launch visuals, orbit animations
- Space Facts section: interesting facts displayed with futuristic card design
- Footer: contact info, social links, newsletter signup, animated starry background
- Global: animated galaxy/nebula background, twinkling stars, parallax scrolling layers
- Design: deep space theme, glassmorphism cards, glowing fonts, neon cyan/purple/blue palette, smooth hover animations

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Build single-page React app with all sections as scroll-based components
2. Implement canvas-based or CSS animated starfield background globally
3. Hero: full-viewport with animated stars, CSS rocket animation, planet orbits, glassmorphism overlay
4. About: stats cards + ISRO info with glowing borders
5. Missions: 3 glassmorphism cards with hover glow + float animations
6. Universe: 5 educational cards with icon/illustration
7. Solar System: CSS animated orbital rings with planet dots + click-to-expand descriptions
8. Rockets & Satellites: split layout with animations
9. Space Facts: horizontal/grid fact cards
10. Footer: dark glassmorphism with newsletter input, social icons, star animation
11. Responsive layout throughout (mobile-first Tailwind)
