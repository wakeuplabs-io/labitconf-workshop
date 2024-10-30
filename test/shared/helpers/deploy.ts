import { Address } from "viem";
import { ignition } from "hardhat";
import tokenModule from "../../../ignition/token";
import { Clients, getClient } from "./client";
import { LabitConfTokenService } from "../../labitConfToken/service";
import paymentTokenModule from "../../../ignition/paymentToken";
import { PaymentTokenService } from "../../marketplace/service";

/**
 * Interface for the result of a token deployment.
 */
interface DeployResult {
  address: Address;
}

/**
 * Deploys the LabitConf token contract using the Ignition deployment framework.
 *
 * @returns A promise that resolves with the address of the deployed token.
 * @throws If the deployment fails.
 */
export const deployToken = async (): Promise<Address> => {
  try {
    const { labitConfToken } = await ignition.deploy(tokenModule);
    if (!labitConfToken) throw new Error("Token deployment failed.");

    return (labitConfToken as DeployResult).address;
  } catch (error) {
    console.error("Error deploying token:", error);
    throw error;
  }
};

/**
 * Deploys the mock of the payment token contract using the Ignition deployment framework.
 *
 * @returns A promise that resolves with the address of the deployed token.
 * @throws If the deployment fails.
 */
export const deployPaymentToken = async (): Promise<Address> => {
  try {
    const { paymentToken } = await ignition.deploy(paymentTokenModule);
    if (!paymentToken) throw new Error("Token deployment failed.");

    return (paymentToken as DeployResult).address;
  } catch (error) {
    console.error("Error deploying token:", error);
    throw error;
  }
};

/**
 * Type representing the test environment for LabitConf token interactions.
 */
export type TestEnv = {
  labitConfToken: Address;
  paymentToken: Address;
  clients: Clients;
  labitConfTokenService: LabitConfTokenService;
  paymentTokenService: PaymentTokenService;
};

/**
 * Generates a test environment for LabitConf token interactions.
 *
 * @returns A promise that resolves with a TestEnv object containing the token address, clients, and service.
 * @throws If the test environment setup fails.
 */
export const generateTestEnv = async (): Promise<TestEnv> => {
  try {
    const labitConfToken = await deployToken();
    const paymentToken = await deployPaymentToken();
    const clients = await getClient();

    const labitConfTokenService = new LabitConfTokenService(
      clients.publicClient,
      clients.owner,
      labitConfToken
    );

    const paymentTokenService = new PaymentTokenService(
      clients.publicClient,
      clients.owner,
      paymentToken
    );

    return {
      labitConfToken,
      paymentToken,
      clients,
      labitConfTokenService,
      paymentTokenService,
    };
  } catch (error) {
    console.error("Error generating test environment:", error);
    throw error;
  }
};
