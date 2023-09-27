import { isAddress } from 'viem';

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);

  return parsed
    ? `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
    : '';
}
