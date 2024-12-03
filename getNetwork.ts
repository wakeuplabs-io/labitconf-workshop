import envParsed from "./envParsed";
import { networks, Networks } from "./networks";

const API_KEY = envParsed().ETHERSCAN_API_KEY;
const TESTNET_PRIVATE_KEY = envParsed().TESTNET_PRIVATE_KEY;
const MAINNET_PRIVATE_KEY = envParsed().MAINNET_PRIVATE_KEY;

export const getNetwork = (key: Networks, isTestnet: boolean) => {
  if (!key) {
    return undefined;
  }
  const network = networks[key];
  const networkKey = isTestnet ? "testnet" : "mainnet";
  const privateKey = isTestnet ? TESTNET_PRIVATE_KEY : MAINNET_PRIVATE_KEY;
  const rpcUrl = isTestnet ? process.env.RPC_TESTNET : process.env.RPC_MAINNET;

  const customChain = {
    chainId: network.chainId,
    network: networkKey,
    urls: network.urls,
  };
  return {
    network: {
      url: rpcUrl ?? network.url,
      accounts: [privateKey],
    },
    apiKeys: {
      [networkKey]: API_KEY,
    },
    customChains: [customChain],
  };
};
