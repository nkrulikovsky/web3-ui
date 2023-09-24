import {
  COINGECKO_API_URL,
  COINGECKO_PLATFORM,
  COINGECKO_PLATFORMS,
} from './constants';
import { CoingeckoTokenPrices } from '../type';
/**
 * Returns token prices from CoinGecko from provided token addresses on a given chain
 *
 * NOTE: Contract addresses returned are all lowercase
 * @param chainId chain ID where the token addresses provided are from
 * @param tokenAddresses token addresses to query prices for
 * @param currencies optional currency override (default is ['eth'])
 * @returns
 */
export const getCoingeckoTokenPrices = async (
  chainId: COINGECKO_PLATFORM,
  tokenAddresses: string[],
  currencies?: string[],
): Promise<CoingeckoTokenPrices> => {
  try {
    const platform = COINGECKO_PLATFORMS[chainId];
    const url = new URL(`${COINGECKO_API_URL}/simple/token_price/${platform}`);
    url.searchParams.set('contract_addresses', tokenAddresses.join(','));
    url.searchParams.set('vs_currencies', currencies?.join(',') ?? 'eth');
    const response = await fetch(url.toString());
    const tokenPrices: CoingeckoTokenPrices = await response.json();
    return tokenPrices;
  } catch (e) {
    console.error('error on fetching coingecko token price ==>', e);
    return {};
  }
};
