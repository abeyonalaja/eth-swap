const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  // transfer all tokens to ethswap
  const supply = await token.totalSupply();
  await token.transfer(ethSwap.address, supply);
};
