import Head from 'next/head';
import Link from 'next/link';

export default function DSLibraryIndex() {
  return (
    <>
      <Head>
        <title>Design System Library | Seed</title>
      </Head>

      <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ margin: '0 0 24px' }}>Design System Library</h1>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: 16 }}>
          <li>
            <Link
              href="/ds-library/variables"
              style={{
                display: 'block',
                padding: '16px 24px',
                border: '1px solid #e5e5e5',
                borderRadius: 8,
                textDecoration: 'none',
                color: '#1c3a13',
              }}
            >
              <strong>Variables</strong>
              <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: 14 }}>
                SCSS variables from @seed-health/tokens
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/ds-library/mixins"
              style={{
                display: 'block',
                padding: '16px 24px',
                border: '1px solid #e5e5e5',
                borderRadius: 8,
                textDecoration: 'none',
                color: '#1c3a13',
              }}
            >
              <strong>Mixins</strong>
              <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: 14 }}>
                SCSS mixins for typography & effects
              </p>
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}