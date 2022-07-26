import '../styles/globals.css';
import 'dayjs/locale/tr';
import dayjs from 'dayjs';
import { useRef } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store';
import FaviconSetterByPriority from '../components/FaviconSetterByPriority';

dayjs.locale('tr');

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = useRef(new QueryClient());

    return (
        <QueryClientProvider client={queryClient.current}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Component {...pageProps} />
                    <FaviconSetterByPriority />
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
