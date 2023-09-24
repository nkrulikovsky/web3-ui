import Token from './Token';
import useFetchStandardTokens from '../hooks/useFetchErc20Tokens';

export default function Dashboard() {
  const { tokens } = useFetchStandardTokens(1, [
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  ]);

  return (
    <div>
      Dashboard
      {tokens.map((token) => (
        <Token key={token.name} token={token} />
      ))}
    </div>
  );
}
