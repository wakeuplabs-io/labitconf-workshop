import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const paymentTokenModule = buildModule("PaymentTokenModule", (m) => {
  const paymentToken = m.contract("PaymentToken", []);

  return { paymentToken };
});

export default paymentTokenModule;
