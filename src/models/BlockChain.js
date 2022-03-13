const Block = require('./Block');
const Transaction = require('./Transaction');
/**
 * Class for maintaining the blockchain
 */
class BlockChain {
    /**
     * constructor function
     */
    constructor() {
        this.chain = [this.createGenesisBlock()]; //blockchain initialisation
        //todo : as we raise the value of the difficulty more computation => time is being 
        //todo : is being put to generate the block.
        this.difficulty = 2; //defined for making the mining of the block difficult | reducing difficulty to test it earlier.
        this.pendingTransactions = []; //since every 10 mins we have to generate a block need to store pending in array
        this.miningReward = 100;//if miner successfully mines a block
    }
    /**
     * this is first block in the chain.
     * This has to be manually created and added to the chain.
     */
    createGenesisBlock() {
        return new Block('01/01/2017', 'Genesis Block', '0');
    }
    /**
     * returns the latest block in the chain
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    /**
     * adding a block in the chain
     * @param {*} newBlock 
     */
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash(); //todo removing this so that difficulty can be defined 

        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    minePendingTransactions(miningRewardAddress) {
        /**
         * adding all the transactions to block is not possible because 
         * there are way too many transactions and the block size cannot 
         * exceed 1MB so in reality miners are going to choose which transactions 
         * to mine which they don't want but here we are not going to do that.
         */
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined');
        this.chain.push(block);
        /**
         * Next we have to do 
         * 1. reset the pending transaction array 
         * 2. give miner reward
         * if we try to udpate or give more coins other nodes in the network will ignore you.
         */
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }
    /**
     * Creating transactions in the pending transaction array
     * @param {*} transaction 
     */
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    /**
     * checking whether chain is valid
     * we won't be validating 1st block @0 index because that's a genesis block.
     */
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = BlockChain;