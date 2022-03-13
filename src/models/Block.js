const SHA256 = require('crypto-js/sha256');
/**
 * Block in a block chain
 */
class Block {
    /**
     * @param {*} index : index in blockchain
     * @param {*} timestamp : time of creation of block
     * @param {*} data : data associated with a block 
     * @param {*} previousHash : hash of the previous block
     */
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; //added so that difficulty level can be risen for the blockchain
    }

    /**
     * Calculate the hash for the block by considering all the data 
     * inside the block. Stringify the output from SHA256 else object
     * will be returned.
     */
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            /**
             * since we cannot change the data / timestamp / index / previousHash of BC then we need some param to help us define
             * difficulty while generating the blocks to be appended in Chain.
             * This is called mining. 
             */
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined', this.hash);
    }
}

module.exports = Block;