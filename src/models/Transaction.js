/**
 * Transaction class 
 */
class Transaction {
    /**
     * construtor
     * @param {*} fromAddress : from address
     * @param {*} toAddress : to address
     * @param {*} amount : number of coins
     */
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

module.exports = Transaction;