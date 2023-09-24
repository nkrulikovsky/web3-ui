import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import { useEffect, useState } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  const uri = process.env.NEXT_PUBLIC_GRAPHQL_API;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri,
      headers,
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache);
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null = null) {
  const [store, setStore] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    (async () => {
      const apollo = initializeApollo(initialState);
      setStore(apollo);
    })();
  }, [initialState]);

  return store;
}
