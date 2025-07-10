/**
 * Network configuration type definitions
 */

export type NetworkAlias = 'mainnet' | 'optimism' | 'arbitrum' | 'base' | 'sepolia' | 'op-sepolia' | 'map';

export interface NetworkConfig {
  /** Network alias/name */
  alias: NetworkAlias;
  /** RPC endpoint URL */
  rpcUrl: string;
  /** Faucet service URL if available */
  faucetUrl?: string;
  /** USDT contract address on this network */
  // usdtContractAddress: string;
  /** Additional token contract addresses */
  tokensAddresses: string[];
  /** Minimum balance required for operations (in ETH) */
  minBalance: string;
  /** Default gas allocation for sweep operations (in ETH) */
  gasForSweep?: string;
} 