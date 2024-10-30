import { Address, parseUnits } from "viem";
import { generateTestEnv, TestEnv } from "../shared/helpers/deploy";
import { expect } from "chai";
import { TOKEN_DECIMALS } from "../shared/constants";

describe("LabitConfToken", function () {
  let testEnv: TestEnv;
  let ownerAddress: Address;

  beforeEach("Deploy Contract", async () => {
    testEnv = await generateTestEnv();
    const { labitConfToken } = testEnv;
    expect(labitConfToken).not.to.be.empty;
    ownerAddress = testEnv.clients.owner.account.address;
  });

  afterEach("Clean Up", async () => {
    // NOTHING TO DO IT HERE
  });

  it("Should mint only the owner", async function () {
    const { labitConfTokenService, clients } = testEnv;
    const { investorOne } = clients;

    const tokens = parseUnits("100", TOKEN_DECIMALS);
    await labitConfTokenService.mint(investorOne.account.address, tokens);

    const balance = await labitConfTokenService.getBalance(
      investorOne.account.address
    );

    expect(balance).to.be.equal(tokens);
  });

  it("Should transfer some tokens to another address", async function () {
    const { labitConfTokenService, clients } = testEnv;
    const investorTwo = clients.investorOne.account.address;

    const tokens = parseUnits("100", TOKEN_DECIMALS);
    const tokensToTransfer = parseUnits("100", TOKEN_DECIMALS);

    await labitConfTokenService.mint(ownerAddress, tokens);
    await labitConfTokenService.transfer(investorTwo, tokensToTransfer);

    const balance = await labitConfTokenService.getBalance(investorTwo);
    expect(balance).to.be.equal(tokensToTransfer);
  });
});
