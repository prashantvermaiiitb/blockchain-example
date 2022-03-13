const Block = require('./Block');
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
        this.difficulty =4; //defined for making the mining of the block difficult
    }
    /**
     * this is first block in the chain.
     * This has to be manually created and added to the chain.
     */
    createGenesisBlock() {
        return new Block(0, '01/01/2017', 'Genesis Block', '0');
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