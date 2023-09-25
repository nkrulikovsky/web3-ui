export type UniswapAPIEndpoints = {
  poolDaysData: string | null;
  poolInformation: string;
  stakingAndPositions: string;
};

type ChainIdToEndpointsMap = {
  [chainId: number]: UniswapAPIEndpoints;
};

const uniswapAPIs: ChainIdToEndpointsMap = {
  1: {
    poolDaysData:
      'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph',
    poolInformation:
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    stakingAndPositions:
      'https://api.thegraph.com/subgraphs/name/wshbair/subgraph',
  },
  5: {
    poolDaysData: null, // None available for testing
    poolInformation:
      'https://api.thegraph.com/subgraphs/name/wshbair/uniswap-v3-subgraph',
    stakingAndPositions:
      'https://api.thegraph.com/subgraphs/name/wshbair/uniswap-v3-subgraph',
  },
};

export const getUniswapAPIsByChainId = (
  chainId: number,
): UniswapAPIEndpoints | null => {
  return uniswapAPIs[chainId] || null;
};
