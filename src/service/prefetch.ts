import { QueryClient } from '@tanstack/react-query';
import { fetchPriority } from './priority';

export const prefetchGlobal = async (queryClient?: QueryClient) => {
    if (!queryClient) queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        fetchPriority.queryKey(true),
        fetchPriority(true),
    );

    return queryClient;
};
