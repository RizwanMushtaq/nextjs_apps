import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { PartsContainer } from './components/partsContainer';

const queryClient = new QueryClient();
export const AppRoot: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PartsContainer />
        </QueryClientProvider>
    );
};
