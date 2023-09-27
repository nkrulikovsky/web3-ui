import React from 'react';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';

import { TokenInterface } from '../hooks/useFetchErc20Tokens';
import { getTokenIconURL } from '../utils/getTokenIconURL';
import { shortenAddress } from '../utils/shortenAddress';

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
    <div className='flex items-center flex-col md:flex-row m-4 border rounded-lg border-gray-400 p-4'>
      <div className='flex items-center w-1/6 font-bold'>
        <img
          src={getTokenIconURL(token.symbol)}
          alt={token.symbol}
          className='w-8 h-8 rounded-full mr-3'
        />
        <div>{token.symbol}</div>
      </div>
      <div className='w-3/5'>{shortenAddress(token.address)}</div>
      <div className='w-1/6'>{data?.toString()}</div>
      <div className='w-1/6'>{token.priceInUSD}</div>
    </div>
  );
}
