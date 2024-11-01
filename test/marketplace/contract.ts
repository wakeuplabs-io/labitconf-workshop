import { parseUnits } from "viem";
import { generateTestEnv, TestEnv } from "../shared/helpers/deploy";
import { expect } from "chai";
import { TOKEN_DECIMALS } from "../shared/constants";
import { LabitConfTokenService } from "../labitConfToken/service";

describe("Marketplace", function () {
  let testEnv: TestEnv;
  let labitConfTokenService: LabitConfTokenService;

  const USDT_AMOUNT_MOCK = parseUnits("100", TOKEN_DECIMALS);
  const TOKENS_AMOUNT = BigInt(10);

  beforeEach("Deploy Contract", async () => {
    testEnv = await generateTestEnv();
    const { paymentToken, marketplaceService } = testEnv;
    expect(paymentToken).not.to.be.empty;

    labitConfTokenService = new LabitConfTokenService(
      testEnv.clients.publicClient,
      testEnv.clients.owner,
      await marketplaceService.labitConfToken()
    );
  });

  afterEach("Clean Up", async () => {
    // NOTHING TO DO IT HERE
  });

  async function buyTokens() {
    const { marketplaceService, paymentTokenService, marketplace, clients } =
      testEnv;
    const { investorOne } = clients;

    await paymentTokenService
      .connect(investorOne)
      .mint(investorOne.account.address, USDT_AMOUNT_MOCK);

    await paymentTokenService
      .connect(investorOne)
      .approve(marketplace, USDT_AMOUNT_MOCK);
    await marketplaceService.connect(investorOne).buy(TOKENS_AMOUNT);
  }

  describe("Buy LabitConf tokens", function () {
    it("Should buy LabitConf tokens", async function () {
      const { clients } = testEnv;
      const { investorOne } = clients;

      await buyTokens();

      const balance = await labitConfTokenService.getBalance(
        investorOne.account.address
      );
      expect(balance).to.be.equal(TOKENS_AMOUNT * BigInt(10 ** TOKEN_DECIMALS));
    });
  });

  describe("Withdraw payment tokens", function () {
    it("Should withdraw only the owner", async function () {
      const { paymentTokenService, marketplace, marketplaceService, clients } =
        testEnv;
      const { owner } = clients;

      await buyTokens();

      const balance = await paymentTokenService.getBalance(marketplace);
      expect(balance).to.be.gt(0);

      await marketplaceService.connect(owner).withdraw();

      const balanceAfterWithdraw =
        await paymentTokenService.getBalance(marketplace);
      expect(balanceAfterWithdraw).to.be.equal(0);
    });

    it("Should not withdraw a non-owner", async function () {
      const { paymentTokenService, marketplace, marketplaceService, clients } =
        testEnv;
      const { investorOne } = clients;

      await buyTokens();

      try {
        await marketplaceService.connect(investorOne).withdraw();
        throw new Error(
          "Expected transaction to be reverted, but it succeeded"
        );
      } catch (error: any) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
        expect(error.message).to.include(
          investorOne.account.address.toLowerCase()
        );
      }
    });
  });
});
