import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { Address } from "viem";

function getMarketplaceModule(paymentToken: Address, tokenPrice: number) {
  const marketplaceModule = buildModule("MarketplaceModule", (m) => {
    const marketplace = m.contract("Marketplace", [paymentToken, tokenPrice]);

    return { marketplace };
  });
  return marketplaceModule;
}

export default getMarketplaceModule;
