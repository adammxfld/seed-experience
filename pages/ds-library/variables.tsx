import dynamic from 'next/dynamic';

// This disables SSR for the variables viewer page (prevents hydration mismatch)
const VariablesPage = dynamic(() => import('./VariablesPage'), { ssr: false });

export default VariablesPage;
