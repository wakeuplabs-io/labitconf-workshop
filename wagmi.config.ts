import { Abi } from "viem";
import { defineConfig } from "@wagmi/cli";

import labitConfTokenAbi from "./artifacts/contracts/labitConfToken/contract.sol/LabitConfToken.json";
import paymentTokenAbi from "./artifacts/contracts/mocks/PaymentToken.sol/PaymentToken.json";
import marketplaceAbi from "./artifacts/contracts/marketplace/contract.sol/Marketplace.json";

export default defineConfig({
  out: "./test/shared/abis/index.ts",
  contracts: [
    {
      name: "labitConfToken",
      abi: labitConfTokenAbi.abi as Abi,
    },
    {
      name: "paymentToken",
      abi: paymentTokenAbi.abi as Abi,
    },
    {
      name: "marketplace",
      abi: marketplaceAbi.abi as Abi,
    },
  ],
});
