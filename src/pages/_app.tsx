import '../styles/globals.css';
import { useRef } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = useRef(new QueryClient());

    return (
        <QueryClientProvider client={queryClient.current}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}

export default MyApp;
