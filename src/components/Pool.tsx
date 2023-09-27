import React from 'react';
import { Address } from 'viem';

import Skeleton from './Skeleton';
import { useApollo } from '../apollo/client';
import { useGetPoolInfoQuery } from '../generated/gql/graphql';
import { getTokenIconURL } from '../utils/getTokenIconURL';
import { shortenAddress } from '../utils/shortenAddress';

interface PoolInterface {
  address: Address;
  rewardTokenAddress: Address;
}

export default function Pool({ address, rewardTokenAddress }: PoolInterface) {
  const client = useApollo('poolInformation');
  const { data: poolData, loading: poolLoading } = useGetPoolInfoQuery({
    variables: { poolId: address },
    client,
  });

  const poolInfo = poolData?.pool;
  const poolName = poolInfo
    ? `${poolInfo.token0.symbol} - ${poolInfo.token1.symbol}`
    : '_';

  if (poolLoading) return <Skeleton />;

  return (
    <div className='flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-400 rounded-lg'>
      <div className='flex flex-col items-start mb-4 md:mb-0'>
        <div className='flex items-center mb-2'>
          <img
            src={getTokenIconURL(poolInfo?.token0.symbol)}
            alt={poolInfo?.token0.symbol}
            className='w-8 h-8 rounded-full'
          />
          <img
            src={getTokenIconURL(poolInfo?.token1.symbol)}
            alt={poolInfo?.token1.symbol}
            className='w-8 h-8 rounded-full'
          />
        </div>
        <div>
          <span className='text-sm md:text-base'>Uniswap V3</span>
          <div className='flex items-center'>
            <span className='text-lg md:text-xl font-semibold'>{poolName}</span>
          </div>
        </div>
      </div>

      <div className='ml-0 md:ml-8 mb-4 md:mb-0'>
        <p className='text-xs md:text-sm'>TVL</p>
        <p className='text-lg md:text-xl'>
          ${Number(poolInfo?.totalValueLockedUSD).toFixed(2)}
        </p>
      </div>

      <div className='ml-0 md:ml-8'>
        <p className='text-xs md:text-sm'>Volume</p>
        <p className='text-lg md:text-xl'>
          {(+poolInfo?.volumeUSD).toFixed(2)}
        </p>
      </div>
      <div className='ml-0 md:ml-8'>
        <p className='text-xs md:text-sm'>RewardToken Address</p>
        <p className='text-lg md:text-xl'>
          {shortenAddress(rewardTokenAddress)}
        </p>
      </div>
    </div>
  );
}
