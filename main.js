const Block = require("./src/models/Block");

const BlockChain = require('./src/models/BlockChain.js');
const Transaction = require("./src/models/Transaction");

let pvCoin = new BlockChain();
/**
 * address1 and address2 are the public key over the network of someones wallet.
 */
pvCoin.createTransaction(new Transaction('address1', 'address2', 100))
pvCoin.createTransaction(new Transaction('address2', 'address3', 50))
console.log(pvCoin);
/**
 * After this we have to start the miner since the transactions are in the 
 * pending transactions array.
 */
console.log('\n Starting the miner....');
pvCoin.minePendingTransactions('pv-minining-address');
/**
 * todo this will be printing 0 as the reward because we have 
 * todo placed the transaction in pending state and to be mined
 * so we have to mine again.
 */
console.log('\n Balance of PV mining address is', pvCoin.getBalanceOfAddress('pv-minining-address'));

console.log('\n Starting the miner again....');
pvCoin.minePendingTransactions('pv-minining-address');
console.log('\n Balance of PV mining address is', pvCoin.getBalanceOfAddress('pv-minining-address'));