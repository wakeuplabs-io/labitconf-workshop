import { PublicClient, WalletClient, Address } from "viem";
import { ZERO_ADDRESS } from "../shared/constants";
import { paymentTokenAbi } from "../shared/abis";

/**
 * A service class for interacting with the Payment token contract.
 */
export class PaymentTokenService {
  private publicClient: PublicClient;
  private ownerClient: WalletClient;
  private address: Address;
  private abi = paymentTokenAbi;

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
   * Retrieves the token balance of a specific account.
   * @param account - The address of the account to check.
   * @returns The balance of the specified account.
   */
  async getBalance(account: Address) {
    const balance = await this.publicClient.readContract({
      address: this.address,
      abi: this.abi,
      functionName: "balanceOf",
      args: [account],
    });

    return balance;
  }

  /**
   * Transfers tokens to a specified address.
   * @param to - The recipient address.
   * @param amount - The amount of tokens to transfer.
   * @returns A promise that resolves once the transaction is confirmed.
   */
  async transfer(to: Address, amount: bigint) {
    const { request: transferRequest } =
      await this.publicClient.simulateContract({
        address: this.address,
        abi: this.abi,
        functionName: "transfer",
        args: [to, amount],
        account: this.ownerClient.account,
      });

    const transferTx = await this.ownerClient.writeContract(transferRequest);

    return this.publicClient.waitForTransactionReceipt({
      hash: transferTx,
      confirmations: 1,
    });
  }

  /**
   * Retrieves the name, symbol, and decimals of the token.
   * @returns An object containing the token's name, symbol, and decimals.
   */
  async getDetails() {
    const [name, symbol, decimals] = await Promise.all([
      this.publicClient.simulateContract({
        address: this.address,
        abi: this.abi,
        functionName: "name" as any,
        args: [] as any,
      }),
      this.publicClient.simulateContract({
        address: this.address,
        abi: this.abi,
        functionName: "symbol" as any,
        args: [] as any,
      }),
      this.publicClient.simulateContract({
        address: this.address,
        abi: this.abi,
        functionName: "decimals" as any,
        args: [] as any,
      }),
    ]);

    return {
      name: name.result,
      symbol: symbol.result,
      decimals: decimals.result,
    };
  }

  /**
   * Approves a specified address to spend tokens on behalf of the owner.
   * @param spender - The address allowed to spend tokens.
   * @param amount - The amount of tokens to approve.
   * @returns A promise that resolves once the approval transaction is confirmed.
   */
  async approve(spender: Address, amount: bigint) {
    const { request } = await this.publicClient.simulateContract({
      address: this.address,
      abi: this.abi,
      functionName: "approve",
      args: [spender, amount],
      account: this.ownerClient.account,
    });

    const transferTx = await this.ownerClient.writeContract(request);

    return this.publicClient.waitForTransactionReceipt({
      hash: transferTx,
      confirmations: 1,
    });
  }

  async mint(user: Address, amount: bigint) {
    const { request } = await this.publicClient.simulateContract({
      address: this.address,
      abi: this.abi,
      functionName: "mint",
      args: [user, amount],
      account: this.ownerClient.account,
    });

    const transferTx = await this.ownerClient.writeContract(request);

    return this.publicClient.waitForTransactionReceipt({
      hash: transferTx,
      confirmations: 1,
    });
  }

  /**
   * Retrieves the total supply of tokens.
   * @returns The total supply of tokens.
   */
  async totalSupply() {
    return this.publicClient.readContract({
      address: this.address,
      abi: this.abi,
      functionName: "totalSupply",
      args: [],
    });
  }
}
