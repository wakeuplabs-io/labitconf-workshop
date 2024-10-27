import * as dotenv from "dotenv";

const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY!;
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY!;
const API_KEY = process.env.ETHERSCAN_API_KEY!;

const sepolia = {
  url: "https://sepolia.drpc.org",
  chainId: 11155420,
  urls: {
    apiURL: "https://api-sepolia-optimism.etherscan.io/api",
    browserURL: "https://sepolia-optimism.etherscan.io",
  },
};

const optimism_sepolia = {
  url: "https://endpoints.omniatech.io/v1/op/sepolia/public",
  chainId: 11155420,
  urls: {
    apiURL: "https://api-sepolia-optimism.etherscan.io/api",
    browserURL: "https://sepolia-optimism.etherscan.io",
  },
};

const base_sepolia = {
  url: "https://base-sepolia.public.blastapi.io",
  chainId: 84531,
  urls: {
    apiURL: "https://base-sepolia.explorer.gobob.xyz/api",
    browserURL: "https://base-sepolia.explorer.gobob.xyz/",
  },
};

const networks = {
  sepolia,
  ["optimism-sepolia"]: optimism_sepolia,
  ["base-sepolia"]: base_sepolia,
} as const;

export type Networks = keyof typeof networks;

export const getNetwork = (key: Networks, isTestnet: boolean) => {
  const network = networks[key];
  const networkKey = isTestnet ? "testnet" : "mainnet";
  const privateKey = isTestnet ? TESTNET_PRIVATE_KEY : MAINNET_PRIVATE_KEY;

  const customChain = {
    chainId: network.chainId,
    network: networkKey,
    urls: network.urls,
  };

  return {
    network: {
      url: network.url,
      accounts: [privateKey],
    },
    apiKeys: {
      [networkKey]: API_KEY,
    },
    customChains: [customChain],
  };
};