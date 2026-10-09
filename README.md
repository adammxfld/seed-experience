# Adam's notes

My app is available at [https://seed-nine-phi.vercel.app/](https://seed-nine-phi.vercel.app/).

## What's changed since my last commit

**It works better on smaller screens now.** 
- I set up proper breakpoints (500, 768, 1024, 1280 and 1440) in a new `styles/_layout.scss` and used them on the chapters (in place of hard-coded widths I had before).
- The screen gets taller on phones and tablets and only goes back to the wide Figma ratio at 1024 and up.
- The three intro statements stack down the left side on phones, then spread out into a row.
- On the days/weeks panels, the heading, media and copy stack vertically below 768, so the copy sits full width under the images.
- The whole page caps at 1440 wide and centers, headers included. Past that the page background is snow white.
- A few labels in the header and footer no longer wrap onto two lines.

**Going backward no longer plays everything in reverse.** 
- If you click an earlier step (or hit play at the end), the slideshow fades out, jumps to the new spot while hidden, and fades back in.
- Going forward is the same as before.
- The nav button still slides back, just faster (1 second instead of 4).

**The nav button doesn't slide in from the left on load anymore.**
- It stays hidden until it knows where it belongs, then just appears there.

**Leaving Weeks 2–4 looks more intentional.**
- The week panel stays fully visible as it slides away instead of fading out.
- Its text was quietly turning white on a near-white background as dark mode kicked in. Fixed by pinning the text color on that slide.
- The line figure now scales up and drifts as the slide leaves, the same way the sphere does. The exact numbers still need tuning against Figma.

**The big video waits its turn.** 
- The 38 MB video on First 7 Days used to start downloading on page load. Now it only loads and plays when that panel shows up, and pauses when you move on. 
- In reality it would be re-encoded or optimize to serve appropriate sizes for bandwidth/device, it's far too big.

**Housekeeping.**
- The journey definition (frames, timeline labels, timing) moved out of `Slideshow.tsx` into `components/JourneyScreen/journey.config.ts`. The labels now live on the frames, so the two lists can't get out of sync, and `Slideshow.tsx` is just the renderer.
- One shared `screen-radius` mixin for the screen and slide corners.
- Hover styles on the timeline arrows only apply on devices that can actually hover.
- Dropped `will-change` from the animated pieces.

This knocks out three things from my "Fixable" list below: the timeline button loading far left, the intro click rewinding, and animating the X+line on advance. I've left the list as it was so you can see where I started.

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
- Footer not visible in certain screen sizes
- Figma bg doesn't use DS colors. I chose to employ close DS colors. Sometimes non-DS is appropriate.
- 1st chapter video background doesn't match DS background color - creaes a mismatch transitioning to 2nd chapter
- Some DS font mixins needed extra CSS adjustments. Maybe bespoke treatment for Logo but not other places.
### Fixable:
- Timeline button loads far left of screen
- 1st Chapter text overlaps in smaller screens
- 1st chapter - initial load should cover footer, then animate to expose footer
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
- The package had token files internally, but its export map prevented me from deep-importing them per the instructions. I changed my imports to use the supported public CSS/SCSS paths.
-  For the token viewer, I used the exported raw token data directly. 


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
