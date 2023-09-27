import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';

import {
  getUniswapAPIsByChainId,
  UniswapAPIEndpoints,
} from '../constants/getUniswapAPIsByChainId';

const apolloClientMap: Record<string, ApolloClient<NormalizedCacheObject>> = {};

function createApolloClient(uri: string) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(uri: string) {
  if (!apolloClientMap[uri]) {
    apolloClientMap[uri] = createApolloClient(uri);
  }

  return apolloClientMap[uri];
}

export function useApollo(apiType: keyof UniswapAPIEndpoints) {
  const [store, setStore] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >(undefined);
  const chainId = useChainId();
  const thegraphUriData = getUniswapAPIsByChainId(chainId);

  // Extract the specific URI based on the type of API needed (poolInformation, stakingAndPositions, poolDaysData)
  const thegraphUri = thegraphUriData ? thegraphUriData[apiType] : null;

  useEffect(() => {
    if (thegraphUri) {
      const apollo = initializeApollo(thegraphUri);
      setStore(apollo);
    }
  }, [thegraphUri]);

  return store;
}
