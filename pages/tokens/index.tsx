import dynamic from 'next/dynamic';

// This disables SSR for the tokens viewer page (prevents hydration mismatch)
const TokensPage = dynamic(() => import('./TokensPage'), { ssr: false });

export default TokensPage;