import React from 'react';
import { Address } from 'viem';

import { useApollo } from '../apollo/client';
import { useGetPoolInfoQuery } from '../generated/gql/graphql';

interface PoolInterface {
  address: Address;
}

export default function Pool({ address }: PoolInterface) {
  const client = useApollo('poolInformation');
  const { data } = useGetPoolInfoQuery({
    variables: { poolId: address },
    client,
  }); //When we have a lots of pools, we can fetch pools in one query.

  console.log('data ==>', data);
  const poolInfo = data?.pool;

  return (
    <div>
      <div>{poolInfo?.token0.name}</div>
      <div>{poolInfo?.token1.name}</div>
      <div>{poolInfo?.totalValueLockedUSD}</div>
    </div>
  );
}
