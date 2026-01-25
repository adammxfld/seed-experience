import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import * as tokens from '@seed-health/tokens';

type TokenValue = string | number | boolean;

type TokenRow = {
  scssVarName: string;
  value: string;
  group: string;
  category: string;
};

function isPrimitive(v: unknown): v is TokenValue {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';
}

// Convert PascalCase to kebab-case for SCSS variable names
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function groupFromExportName(exportName: string): string {
  const m = exportName.match(/^[A-Z][a-z]+/);
  return m?.[0] ?? 'Other';
}

function categorizeToken(path: string[], value: string): string {
  const fullPath = path.join('.').toLowerCase();
  const val = value.toLowerCase();

  if (fullPath.includes('fontfamily') || fullPath.includes('font-family')) return 'font-family';
  if (fullPath.includes('fontsize') || fullPath.includes('font-size')) return 'font-size';
  if (fullPath.includes('fontweight') || fullPath.includes('font-weight')) return 'font-weight';
  if (fullPath.includes('lineheight') || fullPath.includes('line-height')) return 'line-height';
  if (fullPath.includes('letterspacing') || fullPath.includes('letter-spacing')) return 'letter-spacing';
  if (fullPath.includes('text') && isColorLike(val)) return 'text-color';
  if (fullPath.includes('color') || isColorLike(val)) return 'color';
  if (fullPath.includes('opacity')) return 'opacity';
  if (fullPath.includes('radius')) return 'radius';
  if (fullPath.includes('shadow')) return 'shadow';
  if (fullPath.includes('gap') || fullPath.includes('spacing') || fullPath.includes('margin') || fullPath.includes('gutter') || fullPath.includes('measurement')) return 'spacing';
  return 'other';
}

function toTokenRow(path: string[], value: TokenValue): TokenRow {
  const exportName = path[0] ?? 'Other';
  const scssVarName = `$${path.map(toKebabCase).join('-')}`;
  const strValue = String(value);

  return {
    scssVarName,
    value: strValue,
    group: groupFromExportName(exportName),
    category: categorizeToken(path, strValue),
  };
}

function flattenUnknown(
  obj: unknown,
  path: string[] = [],
  out: TokenRow[] = []
): TokenRow[] {
  if (isPrimitive(obj)) {
    out.push(toTokenRow(path, obj));
    return out;
  }

  if (!obj || typeof obj !== 'object') return out;

  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    flattenUnknown(val, [...path, key], out);
  }

  return out;
}

function isColorLike(value: string): boolean {
  const v = value.trim().toLowerCase();
  return (
    v.startsWith('#') ||
    v.startsWith('rgb(') ||
    v.startsWith('rgba(') ||
    v.startsWith('hsl(') ||
    v.startsWith('hsla(')
  );
}

function measurementToPx(value: string): number | null {
  const v = value.trim().toLowerCase();
  const match = v.match(/^(-?\d+(?:\.\d+)?)(rem|em|px)$/);
  if (!match) return null;

  const num = parseFloat(match[1]);
  const unit = match[2];

  if (unit === 'px') return num;
  if (unit === 'rem' || unit === 'em') return num * 16;
  return null;
}

const sampleText = 'The quick brown fox';
const multiLineText = 'The quick brown fox\njumps over the lazy dog';

function TokenPreview({ token }: { token: TokenRow }) {
  const { value, category } = token;

  switch (category) {
    case 'font-family':
      return (
        <span style={{ fontFamily: value, fontSize: 16 }}>
          {sampleText}
        </span>
      );

    case 'font-size': {
      const px = measurementToPx(value);
      const displaySize = px && px > 32 ? 32 : px || 16;
      return (
        <span style={{ fontSize: displaySize, lineHeight: 1.2 }}>
          Aa
        </span>
      );
    }

    case 'font-weight':
      return (
        <span style={{ fontWeight: value, fontSize: 16 }}>
          {sampleText}
        </span>
      );

    case 'line-height':
      return (
        <span style={{ lineHeight: value, fontSize: 12, display: 'block', maxWidth: 120 }}>
          {multiLineText}
        </span>
      );

    case 'letter-spacing':
      return (
        <span style={{ letterSpacing: value, fontSize: 14 }}>
          {sampleText}
        </span>
      );

    case 'text-color':
      return (
        <span style={{ color: value, fontSize: 16, fontWeight: 500 }}>
          {sampleText}
        </span>
      );

    case 'color':
      return (
        <div
          style={{
            width: 48,
            height: 32,
            borderRadius: 6,
            border: '1px solid #ddd',
            background: value,
          }}
          title={value}
        />
      );

    case 'opacity': {
      const opacity = parseFloat(value);
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 48,
              height: 32,
              borderRadius: 6,
              border: '1px solid #ddd',
              background: `rgba(28, 58, 19, ${opacity})`,
            }}
          />
          <span style={{ fontSize: 12, color: '#666' }}>{Math.round(opacity * 100)}%</span>
        </div>
      );
    }

    case 'radius': {
      const px = measurementToPx(value);
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 48,
              height: 32,
              border: '2px solid #1c3a13',
              borderRadius: value,
              background: '#f5f5f5',
            }}
          />
          {px !== null && <span style={{ fontSize: 12, color: '#666' }}>{px}px</span>}
        </div>
      );
    }

    case 'shadow':
      return (
        <div
          style={{
            width: 48,
            height: 32,
            borderRadius: 6,
            background: '#fff',
            boxShadow: value,
          }}
        />
      );

    case 'spacing': {
      const px = measurementToPx(value);
      if (px === null || px === 0) {
        return <span style={{ fontSize: 12, color: '#666' }}>0</span>;
      }
      const displayWidth = Math.min(px, 80);
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: displayWidth,
              height: 16,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #1c3a13 0%, #3d5b34 100%)',
            }}
            title={`${px}px`}
          />
          <span style={{ fontSize: 12, color: '#666' }}>{px}px</span>
        </div>
      );
    }

    default:
      return <span style={{ fontSize: 12, color: '#999' }}>{value}</span>;
  }
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', 'true');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}

export default function VariablesPage() {
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<'all' | string>('all');

  const allTokens = useMemo(() => {
    const out: TokenRow[] = [];
    const tokenExports = tokens as unknown as Record<string, unknown>;

    for (const [exportName, exportVal] of Object.entries(tokenExports)) {
      if (exportName === '__esModule') continue;
      flattenUnknown(exportVal, [exportName], out);
    }

    out.sort((a, b) => a.scssVarName.localeCompare(b.scssVarName));
    return out;
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const groups = useMemo(() => {
    const set = new Set<string>();
    for (const t of allTokens) set.add(t.group);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allTokens]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allTokens.filter((t) => {
      if (group !== 'all' && t.group !== group) return false;
      if (!q) return true;

      return (
        t.scssVarName.toLowerCase().includes(q) ||
        t.value.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [allTokens, query, group]);

  return (
    <>
      <Head>
        <title>SCSS Variables | Design Tokens</title>
      </Head>

      <main style={{ padding: 24, fontFamily: 'Seed Sans, system-ui, sans-serif' }}>
        <h1 style={{ margin: 0, marginBottom: 8 }}>SCSS Variables</h1>
        <p style={{ margin: '0 0 16px', opacity: 0.7, fontSize: 14 }}>
          Import with: <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: 4 }}>@use &apos;@seed-health/tokens/scss/variables&apos; as *;</code>
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search variables..."
            style={{
              flex: 1,
              padding: '8px 10px',
              border: '1px solid #ccc',
              borderRadius: 8,
            }}
          />

          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            style={{ padding: '8px 10px', border: '1px solid #ccc', borderRadius: 8 }}
          >
            <option value="all">All groups</option>
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <div style={{ fontSize: 13, opacity: 0.8 }}>
            <b>{filtered.length}</b> / {allTokens.length}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>
                <th style={{ padding: '10px 8px', width: '35%' }}>SCSS Variable</th>
                <th style={{ padding: '10px 8px', width: '25%' }}>Value</th>
                <th style={{ padding: '10px 8px' }}>Preview</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr key={t.scssVarName} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 8px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ color: '#1c3a13' }}>{t.scssVarName}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(t.scssVarName)}
                        style={{ padding: '2px 8px', borderRadius: 999, border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: 11 }}
                        title="Copy"
                      >
                        Copy
                      </button>
                    </div>
                  </td>

                  <td style={{ padding: '10px 8px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12, color: '#666' }}>
                    {t.value}
                  </td>

                  <td style={{ padding: '10px 8px' }}>
                    <TokenPreview token={t} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loaded ? (
          <p style={{ marginTop: 16, opacity: 0.8 }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ marginTop: 16, opacity: 0.8 }}>No tokens found.</p>
        ) : null}
      </main>
    </>
  );
}
