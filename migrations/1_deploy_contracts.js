const Deposit = artifacts.require('Deposit');
const BigNumber = require('bignumber.js');

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(Deposit,
      '0x498966e1bBa2f1B1673d5997EF59aca357a8b3AA',
      '0xCf75bD1fB46a9c2679BcC8815Eae883dd76780bD'
    );
  });
};
