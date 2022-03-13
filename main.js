const Block = require("./src/models/Block");

const BlockChain = require('./src/models/BlockChain.js');

let pvCoin = new BlockChain();
console.log('Mining Block 1...');
pvCoin.addBlock(new Block(1, '01/02/2017', { amount: 10 }));
console.log('Mining Block 2...');
pvCoin.addBlock(new Block(2, '01/03/2017', { amount: 15 }));
console.log('Mining Block 3...');
pvCoin.addBlock(new Block(3, '01/04/2017', { amount: 20 }));

console.log(JSON.stringify(pvCoin, null, 4));
console.log('isBlockChain valid..', pvCoin.isChainValid());

pvCoin.chain[1].data = { amount: 100 };
pvCoin.chain[1].hash = pvCoin.chain[1].calculateHash();

/**
 * todo : method to roll back the changes to bring back the chain in proper position
 * todo : method to detect whether transaction is possible or not 
 * todo : method to communicate with other MINERS over the network
 */
console.log('isBlockChain valid..', pvCoin.isChainValid());