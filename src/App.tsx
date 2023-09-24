import { ApolloProvider } from '@apollo/client';
import { ConnectButton, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';
import './App.css';

import { useApollo } from './apollo/client';
import AppRouter from './AppRouter';
import Layout from './components/Layout';
import { availableChains, wagmiConfig } from './connectors/config';

export default function App() {
  const queryClient = new QueryClient();
  const apolloClient = useApollo();

  if (!apolloClient) {
    return <div className='h-screen w-screen'>loading ...</div>;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={availableChains}>
            <div className='flex justify-between py-5 mx-auto px-4 items-center'>
              <div className='flex-1 text-xl font-bold hidden md:block'>
                Trendsetters
              </div>
              <nav className='flex-1 flex gap-10 list-none'>
                <li>
                  <Link to='/'>Dashboard</Link>
                </li>
                <li>
                  <Link to='/pools'>Pools</Link>
                </li>
              </nav>
              <div>
                <ConnectButton />
              </div>
            </div>

            <Layout>
              <AppRouter />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
