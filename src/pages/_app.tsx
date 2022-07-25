import '../styles/globals.css';
import { useRef } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '../store';
import FaviconSetterByPriority from '../components/FaviconSetterByPriority';

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = useRef(new QueryClient());

    return (
        <QueryClientProvider client={queryClient.current}>
            <Provider store={store}>
                <Component {...pageProps} />
                <FaviconSetterByPriority />
            </Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
