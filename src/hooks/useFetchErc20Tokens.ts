import { Address, erc20ABI, multicall } from '@wagmi/core';
import { useEffect, useState } from 'react';

import { useCoingeckoTokenPrices } from './useCoingeckoTokenPrices';

export type TokenInterface = {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  priceInUSD?: number;
};

type ChainId = number;

const useFetchStandardTokens = (chainId: ChainId, addresses: Address[]) => {
  const [tokens, setTokens] = useState<TokenInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: tokenPrices } = useCoingeckoTokenPrices(1, addresses, ['usd']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const contracts = addresses
          .map((address) => {
            return [
              {
                address,
                abi: erc20ABI,
                functionName: 'name',
                args: [],
              },
              {
                address,
                abi: erc20ABI,
                functionName: 'symbol',
                args: [],
              },
              {
                address,
                abi: erc20ABI,
                functionName: 'decimals',
                args: [],
              },
              {
                address,
                abi: erc20ABI,
                functionName: 'totalSupply',
                args: [],
              },
            ];
          })
          .flat();

        const response = await multicall({
          contracts,
          chainId,
          batchSize: 4,
        });

        const res = response.reduce((accum: TokenInterface[], item, index) => {
          const chunk = Math.floor(index / 4);
          if (!accum[chunk]) {
            accum[chunk] = {
              totalSupply: BigInt(0),
              decimals: 0,
              name: '',
              symbol: '',
              address: '0x',
            };
          }
          const field = ['name', 'symbol', 'decimals', 'totalSupply'][
            index % 4
          ] as keyof TokenInterface;

          if (field === 'name') {
            accum[chunk].name = item.result as string;
          } else if (field === 'symbol') {
            accum[chunk].symbol = item.result as string;
          } else if (field === 'decimals') {
            accum[chunk].decimals = item.result as number;
          } else if (field === 'totalSupply') {
            accum[chunk].totalSupply = item.result as bigint;
          }

          accum[chunk].address = addresses[chunk];

          return accum;
        }, []);

        // Merge in the pricing data
        const mergedTokens = res.map((token) => {
          const priceData = tokenPrices?.[token.address];

          return {
            ...token,
            priceInUSD: priceData?.usd,
          };
        });

        setTokens(mergedTokens);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    fetchData();
  }, [chainId, tokenPrices]);

  return { tokens, loading };
};

export default useFetchStandardTokens;
