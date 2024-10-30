import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenModule = buildModule("TokenModule", (m) => {
  const labitConfToken = m.contract("LabitConfToken", []);

  return { labitConfToken };
});

export default tokenModule;

