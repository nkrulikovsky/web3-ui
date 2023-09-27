# Web3-UI

## Quick start

```bash
git clone <this repo url>
cd web3-ui
yarn install
yarn start
```

## Graphql codegen

This project is using uniswap subgraph to fetch pool information.
If you want to update the query, after updating the query in `src/query` folder and run `yarn codegen` to generate hook and types for query.
