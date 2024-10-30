import { marketplaceAbi } from "../shared/abis";
import { PublicClient, WalletClient, Address } from "viem";
import { ZERO_ADDRESS } from "../shared/constants";

/**
 * A service class for interacting with the marketplace contract.
 */
export class MarketplaceService {
  private publicClient: PublicClient;
  private ownerClient: WalletClient;
  private address: Address;
  private abi = marketplaceAbi;

  /**
   * Creates a new instance of LabitConfTokenService.
   * @param _publicClient - The client for reading contract data.
   * @param _ownerClient - The client for signing transactions.
   * @param address - Optional. The address of the token contract. Defaults to `ZERO_ADDRESS`.
   */
  constructor(
    _publicClient: PublicClient,
    _ownerClient: WalletClient,
    address?: Address
  ) {
    this.publicClient = _publicClient;
    this.ownerClient = _ownerClient;
    this.address = address || ZERO_ADDRESS;
  }

  /**
   * Sets the address of the token contract.
   * @param adr - The new address of the token contract.
   */
  setAddress(adr: Address) {
    this.address = adr;
  }

  /**
   * Sets the owner client for transaction signing.
   * @param ownerClient - The new WalletClient to use as the owner client.
   */
  connect(ownerClient: WalletClient) {
    this.ownerClient = ownerClient;
    return this;
  }

  /**
   * Purchases a specified amount of tokens from the marketplace.
   * @param amount - The number of tokens to purchase.
   * @returns A promise that resolves once the purchase transaction is confirmed.
   */
  async buy(amount: bigint) {
    const { request: transferRequest } =
      await this.publicClient.simulateContract({
        address: this.address,
        abi: this.abi,
        functionName: "buyTokens",
        args: [amount],
        account: this.ownerClient.account,
      });

    const transferTx = await this.ownerClient.writeContract(transferRequest);

    return this.publicClient.waitForTransactionReceipt({
      hash: transferTx,
      confirmations: 1,
    });
  }

  async labitConfToken() {
    return this.publicClient.readContract({
      address: this.address,
      abi: this.abi,
      functionName: "labitConfToken",
      args: [],
    });
  }

  /**
   * Withdraws all available payment tokens from the marketplace to the owner.
   * @returns A promise that resolves once the withdrawal transaction is confirmed.
   */
  async withdraw() {
    const { request: withdrawRequest } =
      await this.publicClient.simulateContract({
        address: this.address,
        abi: this.abi,
        functionName: "withdraw",
        args: [],
        account: this.ownerClient.account,
      });

    return this.ownerClient.writeContract(withdrawRequest);
  }
}
