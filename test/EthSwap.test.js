const { assert } = require("chai");

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("EthSwap", (accounts) => {
  describe("Token deployment", async () => {
    it("token has a name", async () => {
      const token = await Token.new();
      const name = await token.name();

      assert.equal(name, "DApp Token");
    });
  });

  describe("EthSwap deployment", async () => {
    it("contract has a name", async () => {
      const ethSwap = await EthSwap.new();
      const name = await ethSwap.name();

      assert.equal(name, "EthSwap Instant Exchange");
    });

    it("should have tokens", async () => {
      let token = await Token.new();
      let ethSwap = await EthSwap.new();
      await token.transfer(ethSwap.address, "1000000000000000000000000");
      let balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), "1000000000000000000000000");
    });
  });
});
