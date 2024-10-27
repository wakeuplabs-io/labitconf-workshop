import { Abi } from "viem";
import { defineConfig } from "@wagmi/cli";

import labitConfTokenAbi from "./artifacts/contracts/labitConfToken/contract.sol/LabitConfToken.json";

export default defineConfig({
  out: "./test/shared/abis/index.ts",
  contracts: [
    {
      name: "labitConfToken",
      abi: labitConfTokenAbi.abi as Abi,
    },
  ],
});
