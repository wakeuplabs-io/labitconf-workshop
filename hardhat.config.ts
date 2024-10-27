import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-chai-matchers";
import "solidity-coverage";

import * as dotenv from "dotenv";
import { getNetwork, Networks } from "./networks";

dotenv.config();

const NETWORK_TESTNET = process.env.NETWORK_TESTNET! as Networks;
const NETWORK_MAINNET = process.env.NETWORK_MAINNET! as Networks;

const networkTestnet = getNetwork(NETWORK_TESTNET, true);
const networkMainnet = getNetwork(NETWORK_MAINNET, false);

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.24" }],
  },
  networks: {
    testnet: networkTestnet.network,
    mainnet: networkMainnet.network,
  },

  etherscan: {
    apiKey: networkTestnet.apiKeys,
    customChains: networkTestnet.customChains,
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
