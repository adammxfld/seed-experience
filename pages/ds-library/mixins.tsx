import Head from 'next/head';
import styles from './mixins.module.scss';

type TypographyToken = {
  className: string;
  mixinName: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
  fontFamily?: string;
};

const displayTokens: TypographyToken[] = [
  { className: 'desktop-display-large', mixinName: 'text-desktop-display-large', fontSize: '64px', fontWeight: '350', letterSpacing: '-1.28px', lineHeight: '110%' },
  { className: 'desktop-display-small', mixinName: 'text-desktop-display-small', fontSize: '48px', fontWeight: '350', letterSpacing: '-0.96px', lineHeight: '100%' },
  { className: 'mobile-display-large', mixinName: 'text-mobile-display-large', fontSize: '48px', fontWeight: '350', letterSpacing: '-0.96px', lineHeight: '110%' },
  { className: 'mobile-display-small', mixinName: 'text-mobile-display-small', fontSize: '40px', fontWeight: '350', letterSpacing: '-0.8px', lineHeight: '110%' },
];

const titleTokens: TypographyToken[] = [
  { className: 'fixed-title-large', mixinName: 'text-fixed-title-large', fontSize: '32px', fontWeight: '350', letterSpacing: '-0.64px', lineHeight: '110%' },
  { className: 'fixed-title-small', mixinName: 'text-fixed-title-small', fontSize: '24px', fontWeight: '350', letterSpacing: '-0.36px', lineHeight: '120%' },
];

const bodyTokens: TypographyToken[] = [
  { className: 'fixed-body-x-large', mixinName: 'text-fixed-body-x-large', fontSize: '20px', fontWeight: '350', letterSpacing: '-0.2px', lineHeight: '140%' },
  { className: 'fixed-body-large', mixinName: 'text-fixed-body-large', fontSize: '18px', fontWeight: '350', letterSpacing: '-0.18px', lineHeight: '140%' },
  { className: 'fixed-body-medium', mixinName: 'text-fixed-body-medium', fontSize: '16px', fontWeight: '350', letterSpacing: '-0.16px', lineHeight: '140%' },
  { className: 'fixed-body-small', mixinName: 'text-fixed-body-small', fontSize: '14px', fontWeight: '350', letterSpacing: '-0.14px', lineHeight: '140%' },
  { className: 'fixed-body-x-small', mixinName: 'text-fixed-body-x-small', fontSize: '12px', fontWeight: '350', letterSpacing: '-0.06px', lineHeight: '140%' },
  { className: 'fixed-body-xx-small', mixinName: 'text-fixed-body-xx-small', fontSize: '10px', fontWeight: '350', letterSpacing: '-0.05px', lineHeight: '140%' },
];

const labelTokens: TypographyToken[] = [
  { className: 'fixed-label-x-large', mixinName: 'text-fixed-label-x-large', fontSize: '20px', fontWeight: '500', letterSpacing: '-0.2px', lineHeight: '140%' },
  { className: 'fixed-label-large', mixinName: 'text-fixed-label-large', fontSize: '18px', fontWeight: '500', letterSpacing: '-0.18px', lineHeight: '140%' },
  { className: 'fixed-label-medium', mixinName: 'text-fixed-label-medium', fontSize: '16px', fontWeight: '500', letterSpacing: '-0.16px', lineHeight: '140%' },
  { className: 'fixed-label-small', mixinName: 'text-fixed-label-small', fontSize: '14px', fontWeight: '500', letterSpacing: '-0.14px', lineHeight: '140%' },
  { className: 'fixed-label-x-small', mixinName: 'text-fixed-label-x-small', fontSize: '12px', fontWeight: '500', letterSpacing: '-0.06px', lineHeight: '140%' },
];

const monoTokens: TypographyToken[] = [
  { className: 'fixed-mono-large', mixinName: 'text-fixed-mono-large', fontSize: '16px', fontWeight: '400', letterSpacing: '0px', lineHeight: '110%', fontFamily: 'Seed Sans Mono' },
  { className: 'fixed-mono-small', mixinName: 'text-fixed-mono-small', fontSize: '12px', fontWeight: '400', letterSpacing: '0px', lineHeight: '110%', fontFamily: 'Seed Sans Mono' },
];

const eyebrowTokens: TypographyToken[] = [
  { className: 'fixed-eyebrow', mixinName: 'text-fixed-eyebrow', fontSize: '12px', fontWeight: '500', letterSpacing: '0.24px', lineHeight: '110%' },
];

type EffectToken = {
  className: string;
  mixinName: string;
  description: string;
};

const effectTokens: EffectToken[] = [
  { className: 'frosted-glass-light', mixinName: 'effect-frosted-glass-light', description: 'backdrop-filter: blur(38px)' },
  { className: 'frosted-glass-strong', mixinName: 'effect-frosted-glass-strong', description: 'backdrop-filter: blur(75px)' },
  { className: 'shadow-subtle', mixinName: 'shadow-subtle-shadow', description: 'box-shadow: 0px 4px 30px rgba(0,0,0,0.08)' },
];

function TypographyCard({ token }: { token: TypographyToken }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.sample} ${styles[token.className]}`}>
        The quick brown fox jumps over the lazy dog
      </div>
      <div className={styles.meta}>
        <span className={styles.mixinName}>@include {token.mixinName}</span>
        <span className={styles.prop}>{token.fontSize}</span>
        <span className={styles.prop}>weight: {token.fontWeight}</span>
        <span className={styles.prop}>leading: {token.lineHeight}</span>
        <span className={styles.prop}>tracking: {token.letterSpacing}</span>
      </div>
    </div>
  );
}

function EffectCard({ token }: { token: EffectToken }) {
  return (
    <div className={styles.card}>
      <div className={`${styles['effect-card']} ${styles[token.className]}`}>
        Effect Preview
      </div>
      <div className={styles.meta}>
        <span className={styles.mixinName}>@include {token.mixinName}</span>
        <span className={styles.prop}>{token.description}</span>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}

export default function TypographyPage() {
  return (
    <>
      <Head>
        <title>Typography Tokens | Design System</title>
      </Head>

      <main className={styles.page}>
        <h1 className={styles.heading}>Typography & Effect Mixins</h1>
        <p style={{ marginBottom: 32, opacity: 0.7 }}>
          SCSS mixins from <code>@seed-health/tokens/scss/mixins</code>
        </p>

        <Section title="Display">
          {displayTokens.map((t) => <TypographyCard key={t.className} token={t} />)}
        </Section>

        <Section title="Title">
          {titleTokens.map((t) => <TypographyCard key={t.className} token={t} />)}
        </Section>

        <Section title="Body">
          {bodyTokens.map((t) => <TypographyCard key={t.className} token={t} />)}
        </Section>

        <Section title="Label">
          {labelTokens.map((t) => <TypographyCard key={t.className} token={t} />)}
        </Section>

        <Section title="Mono">
          {monoTokens.map((t) => <TypographyCard key={t.className} token={t} />)}
        </Section>

        <Section title="Eyebrow">
          {eyebrowTokens.map((t) => <TypographyCard key={t.className} token={t} />)}
        </Section>

        <Section title="Effects">
          {effectTokens.map((t) => <EffectCard key={t.className} token={t} />)}
        </Section>
      </main>
    </>
  );
}
