// src/tokens/TokensPage.tsx

import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import * as tokens from '@seed-health/tokens';

type TokenValue = string | number | boolean;

type TokenRow = {
  tokenPath: string; // e.g. "DesktopDisplayLarge.fontSize"
  cssVarName: string; // e.g. "--DesktopDisplayLarge-fontSize"
  value: string; // normalized
  group: string; // derived from export name prefix (heuristic)
};

function isPrimitive(v: unknown): v is TokenValue {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';
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

function groupFromExportName(exportName: string): string {
  // e.g. "DesktopDisplayLarge" -> "Desktop"
  // e.g. "ColorPrimarySeedGreen" -> "Color"
  const m = exportName.match(/^[A-Z][a-z]+/);
  return m?.[0] ?? 'Other';
}

function toTokenRow(path: string[], value: TokenValue): TokenRow {
  const exportName = path[0] ?? 'Other';
  return {
    tokenPath: path.join('.'),
    cssVarName: `--${path.join('-')}`,
    value: String(value),
    group: groupFromExportName(exportName),
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

export default function TokensPage() {
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<'all' | string>('all');

  const allTokens = useMemo(() => {
    const out: TokenRow[] = [];
    const tokenExports = tokens as unknown as Record<string, unknown>;

    for (const [exportName, exportVal] of Object.entries(tokenExports)) {
      // Skip non-token exports if any ever appear
      if (exportName === '__esModule') continue;

      // Each named export becomes the top of the path
      flattenUnknown(exportVal, [exportName], out);
    }

    out.sort((a, b) => a.tokenPath.localeCompare(b.tokenPath));
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
        t.tokenPath.toLowerCase().includes(q) ||
        t.cssVarName.toLowerCase().includes(q) ||
        t.value.toLowerCase().includes(q)
      );
    });
  }, [allTokens, query, group]);

  return (
    <>
      <Head>
        <title>Design Tokens</title>
      </Head>

      <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
        <h1 style={{ margin: 0, marginBottom: 16 }}>Design System Tokens</h1>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by token path, CSS var, or value…"
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
            Showing <b>{filtered.length}</b> / {allTokens.length}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>
                <th style={{ padding: '10px 8px' }}>Token path</th>
                <th style={{ padding: '10px 8px' }}>CSS var</th>
                <th style={{ padding: '10px 8px' }}>Value</th>
                <th style={{ padding: '10px 8px' }}>Preview</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr key={t.tokenPath} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 8px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span>{t.tokenPath}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(t.tokenPath)}
                        style={{ padding: '2px 8px', borderRadius: 999, border: '1px solid #ddd', background: 'white' }}
                        title="Copy token path"
                      >
                        Copy
                      </button>
                    </div>
                  </td>

                  <td style={{ padding: '10px 8px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span>{t.cssVarName}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(t.cssVarName)}
                        style={{ padding: '2px 8px', borderRadius: 999, border: '1px solid #ddd', background: 'white' }}
                        title="Copy CSS variable name"
                      >
                        Copy
                      </button>
                    </div>
                  </td>

                  <td style={{ padding: '10px 8px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span>{t.value}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(t.value)}
                        style={{ padding: '2px 8px', borderRadius: 999, border: '1px solid #ddd', background: 'white' }}
                        title="Copy value"
                      >
                        Copy
                      </button>
                    </div>
                  </td>

                  <td style={{ padding: '10px 8px' }}>
                    {isColorLike(t.value) ? (
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: '1px solid #ddd',
                          background: t.value,
                        }}
                        title={t.value}
                      />
                    ) : (
                      <span style={{ opacity: 0.6 }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loaded ? (
          <p style={{ marginTop: 16, opacity: 0.8 }}>Loading tokens…</p>
        ) : allTokens.length === 0 ? (
          <p style={{ marginTop: 16, opacity: 0.8 }}>
            Loaded, but found 0 tokens. If this happens, the package may be tree-shaken or require a different import style.
          </p>
        ) : filtered.length === 0 ? (
          <p style={{ marginTop: 16, opacity: 0.8 }}>No tokens found.</p>
        ) : null}
      </main>
    </>
  );
}