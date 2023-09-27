import { useChainId } from 'wagmi';

import Pool from '../components/Pool';
import { poolAddressesByChain } from '../constants/poolAddress';
import { useGetIncentiveQuery } from '../generated/gql/graphql';

export default function Pools() {
  const chainId = useChainId();
  const pools = poolAddressesByChain[chainId];
  const { data: incentiveData } = useGetIncentiveQuery({
    variables: { poolId: pools.map((pool) => pool.address) },
  });

  return (
    <div>
      {poolAddressesByChain[chainId].map((eachPool) => (
        <Pool
          address={eachPool.address}
          rewardTokenAddress={incentiveData?.incentives[0].rewardToken} //TODO: this is wrong and need to find by pooladdress
          key={eachPool.address}
        />
      ))}
    </div>
  );
}
