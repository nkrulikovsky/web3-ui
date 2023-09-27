import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    'https://api.thegraph.com/subgraphs/name/wshbair/uniswap-v3-subgraph',
    'https://api.thegraph.com/subgraphs/name/wshbair/uniswap-v3-subgraph',
  ],
  documents: 'src/query/**/*.graphql',
  generates: {
    'src/generated/gql/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      overwrite: true,
      hooks: {
        afterOneFileWrite: ['prettier --write'],
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
