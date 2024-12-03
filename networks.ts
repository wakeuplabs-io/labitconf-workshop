const sepolia = {
  url: "https://sepolia.drpc.org",
  chainId: 11155420,
  urls: {
    apiURL: "https://api-sepolia-optimism.etherscan.io/api",
    browserURL: "https://sepolia-optimism.etherscan.io",
  },
};

const optimism_sepolia = {
  url: "https://sepolia.optimism.io",
  chainId: 11155420,
  urls: {
    apiURL: "https://api-sepolia-optimism.etherscan.io/api",
    browserURL: "https://sepolia-optimism.etherscan.io",
  },
};

const base_sepolia = {
  url: "https://base-sepolia.public.blastapi.io",
  chainId: 84532,
  urls: {
    apiURL: "https://base-sepolia.explorer.gobob.xyz/api",
    browserURL: "https://base-sepolia.explorer.gobob.xyz/",
  },
};

const base = {
  url: "https://mainnet.base.org",
  chainId: 8453,
  urls: {
    apiURL: "https://basescan.org/api",
    browserURL: "https://basescan.org/",
  },
};

export const networks = {
  sepolia,
  ["optimism-sepolia"]: optimism_sepolia,
  ["base-sepolia"]: base_sepolia,
  base,
} as const;

export type Networks = keyof typeof networks;
