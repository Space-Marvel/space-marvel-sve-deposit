const abi = require('./depositPackage.abi.json')

const privateKey = 'c0a8abf9ce2cb1b971bb2165c81ac08b771628d7dbb9f53aabc9e75e50b8cff2'

const BigNumber = require("bignumber.js");
const web3 = require('web3')
const rpc_node_mainnet = 'https://bsc-dataseed.binance.org/'
const bscWeb3 = new web3(rpc_node_testnet)
const depositPackageMATAddress = '0x4B44234b39E94cd5ff7AAc03B2Aa579dB829c2b3'
const DepositPackageMAT = new bscWeb3.eth.Contract(abi, depositPackageMATAddress)

/*
 6 decimal
  0.123456 => input 123456
*/
async function setPrice(price) {
    let gasPrice = await bscWeb3.eth.getGasPrice()
    const method = DepositPackageMAT.methods.setPrice(
        new BigNumber(
            price
        ).multipliedBy(10 ** 18).integerValue(),
    );

    const txData = method.encodeABI();
    let tx = {
        to: depositPackageMATAddress,
        value: 0,
        gas: 3000000,
        gasPrice: gasPrice * 2,
        data: txData
    };

    const signed = await bscWeb3.eth.accounts.signTransaction(tx, privateKey)
    const receipt = await bscWeb3.eth.sendSignedTransaction(signed.rawTransaction)
    console.log("[", Date(), "]", 'META RECEIPT - tx:', receipt.transactionHash, " - block: ", receipt.blockNumber, " - blockHash: ", receipt.blockHash);
}