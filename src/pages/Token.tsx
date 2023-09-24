import React from 'react';

import { TokenInterface } from '../hooks/useFetchErc20Tokens';

interface TokenItem {
  token: TokenInterface;
}
export default function Token({ token }: TokenItem) {
  return (
    <div className='flex gap-4 m-4 border rounded-lg border-gray-400 p-4'>
      <div>{token.name}</div>
      <div>{token.symbol}</div>
      <div>{token.address}</div>
      <div>{token.priceInUSD}</div>
    </div>
  );
}
