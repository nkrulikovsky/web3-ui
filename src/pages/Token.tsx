import React from 'react';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';

import { TokenInterface } from '../hooks/useFetchErc20Tokens';

interface TokenItem {
  token: TokenInterface;
}
export default function Token({ token }: TokenItem) {
  const { address } = useAccount();
  const { data } = useContractRead({
    //TODO: update with useContractReads
    abi: erc20ABI,
    address: token.address,
    functionName: 'balanceOf',
    args: [address || '0x'],
  });

  return (
    <div className='flex items-center m-4 border rounded-lg border-gray-400 p-4'>
      <div className='w-1/6'>{token.name}</div>
      <div className='w-1/6'>{token.symbol}</div>
      <div className='w-3/5'>{token.address}</div>
      <div className='w-1/6'>{data?.toString()}</div>
      <div className='w-1/6'>{token.priceInUSD}</div>
    </div>
  );
}
