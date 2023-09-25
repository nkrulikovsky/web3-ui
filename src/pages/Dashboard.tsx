import { useChainId } from 'wagmi';

import Token from './Token';
import { poolTokens } from '../constants/poolTokens';
import useFetchStandardTokens from '../hooks/useFetchErc20Tokens';

export default function Dashboard() {
  const data = useChainId();
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
