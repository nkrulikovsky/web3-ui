import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    'https://api.thegraph.com/subgraphs/name/wshbair/uniswap-v3-subgraph',
    'https://api.thegraph.com/subgraphs/name/wshbair/uniswap-v3-subgraph',
  ],
  documents: 'src/query/**/*.graphql',
  generates: {
    generated: {
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
