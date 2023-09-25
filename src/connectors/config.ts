import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import envVars from '../config';

export const availableChains = [mainnet, goerli];

const { chains, publicClient } = configureChains(availableChains, [
  alchemyProvider({ apiKey: envVars.REACT_APP_ALCHEMY_ID }),
  publicProvider(),
]);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
