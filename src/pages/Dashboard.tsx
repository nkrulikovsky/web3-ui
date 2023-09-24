import Token from './Token';
import { poolTokens } from '../constants/poolTokens';
import useFetchStandardTokens from '../hooks/useFetchErc20Tokens';

export default function Dashboard() {
  const { tokens } = useFetchStandardTokens(
    1,
    poolTokens.map((token) => token.address),
  );

  return (
    <div>
      Dashboard
      {tokens.map((token) => (
        <Token key={token.name} token={token} />
      ))}
    </div>
  );
}
