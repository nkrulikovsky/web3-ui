export enum NETWORK {
  'mainnet' = 1,
  'goerli' = 5,
  'sepolia' = 11155111,
  'bsc' = 56,
  'bsc-testnet' = 97,
  'xdai' = 100,
  'polygon' = 137,
  'mumbai' = 80001,
  'optimism' = 10,
  'optimism-goerli' = 420,
  'avalanche' = 43114,
  'fuji' = 43113,
  'celo' = 42220,
  'celo-testnet' = 44787,
  'arbitrum' = 42161,
  'arbitrum-goerli' = 421613,
}
export type NETWORK_NAME = keyof typeof NETWORK;

/**
 * Second constants
 */
export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 3_600;
export const SECONDS_PER_DAY = 86_400;
export const SECONDS_PER_YEAR = 31_536_000;

/**
 * Minute constants
 */
export const MINUTES_PER_HOUR = 60;
export const MINUTES_PER_DAY = 1_440;

/**
 * CoinGecko API URL
 */
export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

/**
 * Prize Pool Graph API URLs
 */
export const PRIZE_POOL_GRAPH_API_URLS = Object.freeze({
  [NETWORK.sepolia]:
    'https://api.studio.thegraph.com/query/41211/v5-prize-pool-eth-sepolia/v0.0.3',
});

/**
 * CoinGecko platform IDs
 */
export const COINGECKO_PLATFORMS = Object.freeze({
  [NETWORK.mainnet]: 'ethereum',
  [NETWORK.bsc]: 'binance-smart-chain',
  [NETWORK.xdai]: 'xdai',
  [NETWORK.polygon]: 'polygon-pos',
  [NETWORK.optimism]: 'optimistic-ethereum',
  [NETWORK.avalanche]: 'avalanche',
  [NETWORK.celo]: 'celo',
  [NETWORK.arbitrum]: 'arbitrum-one',
});
export type COINGECKO_PLATFORM = keyof typeof COINGECKO_PLATFORMS;

export const tokenBaseURL =
  'https://vnx-token-pics.s3.eu-central-1.amazonaws.com/';
