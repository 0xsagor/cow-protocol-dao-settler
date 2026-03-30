# CoW Protocol DAO Settler

Large treasury rebalances often bleed value to MEV (Maximal Extractable Value) bots. This repository integrates **CoW Protocol** (Conditional-Order-on-Gnosis) to ensure every swap is executed with maximum protection.

## Why CoW Protocol?
* **MEV Resistance**: Trades are matched off-chain and settled in batches, making sandwich attacks impossible.
* **Surplus Capture**: If a solver finds a better price than the one requested, the "surplus" is passed back to the DAO Treasury.
* **Gasless Orders**: The DAO signs a message (EIP-712) to create an order; gas is only paid upon successful execution and taken from the sell token.

## The Strategy
When the `v3-liquidity-rebalancer` (Repo 43) needs to shift assets, it triggers this module to place a limit order. Only once the assets are swapped at the target price does the rebalancer mint the new Uniswap V3 position.
