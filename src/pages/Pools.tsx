import React from 'react';
import { useChainId } from 'wagmi';

import { useApollo } from '../apollo/client';
import Pool from '../components/Pool';
import { poolAddressesByChain } from '../constants/poolAddress';
import { useGetIncentiveQuery } from '../generated/gql/graphql';

export default function Pools() {
  const client = useApollo('poolInformation');
  const chainId = useChainId();
  const pools = poolAddressesByChain[chainId];
  const { data: incentiveData } = useGetIncentiveQuery({
    variables: { poolId: pools.map((pool) => pool.address) },
  });
  console.log('incentive data ==.', incentiveData);
  return (
    <div>
      {poolAddressesByChain[chainId].map((eachPool) => (
        <Pool address={eachPool.address} key={eachPool.address} />
      ))}
    </div>
  );
}
