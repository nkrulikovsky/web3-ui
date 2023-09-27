import { useChainId } from 'wagmi';

import Token from './Token';
import { poolTokens } from '../constants/poolTokens';
import { useGetIncentiveQuery } from '../generated/gql/graphql';
import useFetchStandardTokens from '../hooks/useFetchErc20Tokens';

export default function Dashboard() {
  const data = useChainId();
  const { data: incentiveData } = useGetIncentiveQuery({
    variables: { poolId: '0x66d1b94f81fba13efbd5307db63dde8cc810ffdf' },
  });

  console.log('data ==<>', incentiveData);
  const { tokens } = useFetchStandardTokens(
    1,
    poolTokens.map((token) => token.address),
  );

  return (
    <div>
      <div className='font-bold text-lg'>Dashboard</div>
      <div>
        <div className='flex items-center m-4 border rounded-lg border-gray-400 p-4 font-bold'>
          <div className='w-1/6'>Name</div>
          <div className='w-1/6'>Symbol</div>
          <div className='w-3/5'>Address</div>
          <div className='w-1/6'>Balance</div>
          <div className='w-1/6'>Price</div>
        </div>

        {tokens.map((token) => (
          <Token key={token.name} token={token} />
        ))}
      </div>
    </div>
  );
}
