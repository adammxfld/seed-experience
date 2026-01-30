# Adam's quick notes

## What I did ...
- Hopefully the structure is self-explanatory
- Used SCSS
- Applied Design System in SCSS
- Made some - but minimal - responsive adjustments
- Used the Claude + terminal VSCode integration
- Focused on being faithful to Figma prototype and DS integration
- Used Claude to frame and wire up some basics to narrow my focus
- Quick + crude visual representation of the DS: `/ds-library` (Claude)
- Headers and Parent components read Dark/Light mode from slides (alternates light/dark text)

## Basic app structure
- /index.tsx (straightforward):
```tsx
  <Header mode={colorMode} />
  <AccountSubheader mode={colorMode} />
  <Screen mode={colorMode} onSlideChange={handleSlideChange} />
  <Footer />
```
### Screen.tsx:
- The controller/orchestrator. Manages state; Handles autoplay logic
### Slideshow.tsx:
- The visual renderer. Content configuration; visual slots + slide visibility; track position

## There is room for improvement (this is not everything) ...
I would deeply refactor. I don't consider this scalable as-is.
- I wish I had primarily applied the Design tokens in the markup, JavaScript/TypeScript & CSS. That would be a cleaner delineation between semantic code and style.
- Would abstract the text, imagery + other data, then populate the components from that
- More accessibility integration
- Performance: 1st slide is purged when off-screen but not others (via IntersectionObserver)
- Load movies optimized for device-size
- Might opt to move animating background images (sphere, X+line) to the parent component vs chapter
### Consult Design: 
- Define responsive behavior
- Figma bg doesn't use DS colors. I chose to employ close DS colors. Sometimes non-DS is appropriate.
- 1st chapter video background doesn't match DS color for 2nd frame
- Some DS font mixins needed extra CSS adjustments. Maybe bespoke treatment for Logo but not other places.
### Fixable:
- Timeline button loads far left of screen
- 1st Chapter text overlaps in smaller screens
- Advance and pause timing for chapters can be refined
- Timeline button advance timing
- Timeline button missing icons in Safari
- Timeline button shading based on progress
- Left/Right side clicks to advance/reverse
- A click on "Intro" should fade-out current/fade-in intro (not rewind)
- light slide vs footer color mismatch
- animate X+line on advance
- pause auto-play on chapter 2 (per figma)
- SVGs: better organize integration

## Just a few thoughts on this project as a test:
I really enjoyed building this.  It is beautifully designed, fun to strategize and put together 
- More opinionated setup would be faster + allow more meticulous focus on design
- CSS/SCSS/CSS in JS flexibility is nice but not necessary + slows down initial setup/orientation
- Focus project on your areas of highest priority
- Could pre-mock some framework elements with DS (header? footer? one slide?)
- Offer a visual DS representation
- Figma had everything necessary but could be better organized for rapid development


## Seed Frontend Engineering Take-Home

Next.js project using the Pages router
- Feel free to modify file structure, create components, add tests, rename things, etc
- You can style however you'd like (e.g., styled-components, css modules, scss, etc)

## Getting Started

```bash
npm install
npm run dev
```

The app should be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `pages/` - Next.js pages (uses Pages Router)
- `pages/index.tsx` - Homepage at /
- `pages/_app.tsx` - App wrapper, imports a styles/globals.css
- `styles/globals.css` - Global CSS with SeedSans font face definitions
- `public/fonts/` - SeedSans font files
- `pages/_document.tsx` - Next.js _document, preloads SeedSans font files

## Design Tokens

Design tokens are imported through the @seed-health/tokens package, and they can be used
in a variety of ways. Here's some examples below, but they may need to be tweaked to function

### CSS Variables

```jsx
import '@seed-health/tokens/build/css/variables.css';
import '@seed-health/tokens/build/css/styles.css';

function Button() {
  return (
    <button
      className="text-fixed-body-medium"
      style={{
        backgroundColor: 'var(--color-primary-500)',
        padding: 'var(--spacing-medium)'
      }}>
      Click me
    </button>
  );
}
```

### JavaScript/TypeScript

```jsx
import * as tokens from '@seed-health/tokens';

function Button() {
  return (
    <button style={{
      ...tokens.FixedLabelMedium,
      padding: tokens.SpacingX2
    }}>
      Click me
    </button>
  );
}
```

### SCSS

```scss
@use '@seed-health/tokens/build/scss/variables' as *;
@use '@seed-health/tokens/build/scss/mixins' as *;

.button {
  @include text-fixed-label-medium;
  background-color: $color-primary-500;
  padding: $spacing-medium;
}
```

### CSS Modules

```css
.button {
  background-color: var(--color-primary-500);
  padding: var(--spacing-medium);
}
```

### Styled Components

```tsx
import { GlobalTokenStyles } from '@seed-health/tokens/react';

function App() {
  return (
    <>
      <GlobalTokenStyles />
      {/* Your app content */}
    </>
  );
}
```
