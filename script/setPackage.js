const abi = require('./depositPackage.abi.json')

const fs = require('fs');
// const privateKeys = fs.readFileSync('.secret').toString().split('\n');
const privateKey = '994d6d89fe9a62e1c24ccac5860907754f73360a5dec5eef17f99e8b958363c6'

const BigNumber = require("bignumber.js");
const web3 = require('web3')
const rpc_node_testnet = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const rpc_node_mainnet = 'https://bsc-dataseed.binance.org/'
const bscWeb3 = new web3(rpc_node_mainnet)
const depositPackageMATAddress = '0x7F910EB828831050c31A2dd0eBf37dF2179832a9'
const DepositPackageMAT = new bscWeb3.eth.Contract(abi, depositPackageMATAddress)

async function setPackage(listPackages, listAmounts) {
    let gasPrice = await bscWeb3.eth.getGasPrice()
    const method = DepositPackageMAT.methods.setPackage(
        listPackages,
        listAmounts,
    );

    const txData = method.encodeABI();
    let tx = {
        to: depositPackageMATAddress,
        value: 0,
        gas: 3000000,
        gasPrice: gasPrice * 1.5,
        data: txData
    };

    const signed = await bscWeb3.eth.accounts.signTransaction(tx, privateKey)
    const receipt = await bscWeb3.eth.sendSignedTransaction(signed.rawTransaction)
    console.log("[", Date(), "]", 'META RECEIPT - tx:', receipt.transactionHash, " - block: ", receipt.blockNumber, " - blockHash: ", receipt.blockHash);
}

const listPackages = [1101, 1102, 1001, 1002, 1003, 1004, 1005, 1006, 1201, 1301, 1302, 1303, 1401, 1402, 1403]
let listAmounts = [100, 220, 20, 100, 320, 640, 1050, 2080, 320, 160, 160, 160, 20, 40, 60]

for (let i = 0; i < listAmounts.length; i++) {
    listAmounts[i] = new BigNumber(
        listAmounts[i]
    ).multipliedBy(10 ** 18).integerValue()
}

setPackage(listPackages, listAmounts)