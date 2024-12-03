import { z } from "zod";
import dotenv from "dotenv";
import { Address } from "viem";
import { networks } from "./networks";

dotenv.config();

const env = {
  NETWORK_TESTNET: process.env.NETWORK_TESTNET,
  NETWORK_MAINNET: process.env.NETWORK_MAINNET,
  TESTNET_PRIVATE_KEY: process.env.TESTNET_PRIVATE_KEY,
  MAINNET_PRIVATE_KEY: process.env.MAINNET_PRIVATE_KEY,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
};

const envSchema = z
  .object({
    NETWORK_TESTNET: z
      .string()
      .refine((x) => Object.keys(networks ?? {}).includes(x), {
        message: "Invalid testnet network key",
      }),
    NETWORK_MAINNET: z
      .string()
      .refine((x) => Object.keys(networks ?? {}).includes(x), {
        message: "Invalid mainnet network key",
      }),
    TESTNET_PRIVATE_KEY: z.string().transform((x) => x as Address),
    MAINNET_PRIVATE_KEY: z.string().transform((x) => x as Address),
    ETHERSCAN_API_KEY: z.string().transform((x) => x as Address),
  })
  .required();

const envParsed = () => envSchema.parse(env);

export default envParsed;
