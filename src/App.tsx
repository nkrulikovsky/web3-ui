import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { WagmiConfig } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';
import './App.css';

import { availableChains, wagmiConfig } from './connectors/config';

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={availableChains}>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
