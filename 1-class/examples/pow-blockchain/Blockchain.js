const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

/**
 * Represents a block in the blockchain.
 * @class Block
 */
class Block {
  /**
   * Creates an instance of Block.
   * @param {number} index - Position of the block in the blockchain.
   * @param {Array} transactions - List of transactions in the block.
   * @param {string} prevHash - Hash of the previous block.
   * @param {number} nonce - Nonce value for proof of work.
   * @param {string} hash - Hash of the current block.
   */
  constructor(index, transactions, prevHash, nonce, hash) {
    this.index = index;
    this.timestamp = Math.floor(Date.now() / 1000);
    this.transactions = transactions;
    this.prevHash = prevHash;
    this.hash = hash;
    this.nonce = nonce;
  }
}

/**
 * Represents a transaction in the blockchain.
 * @class Transaction
 */
class Transaction {
  /**
   * Creates an instance of Transaction.
   * @param {number} amount - Amount of the transaction.
   * @param {string} sender - ID of the sender.
   * @param {string} recipient - ID of the recipient.
   */
  constructor(amount, sender, recipient) {
    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
    this.tx_id = uuidv4().split("-").join();
  }
}

/**
 * Represents the entire blockchain.
 * @class Blockchain
 */
class Blockchain {
  /**
   * Creates an instance of Blockchain.
   */
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.difficulty = 3; // Initial difficulty level
    this.addBlock("0");
  }

  /**
   * Creates a new transaction and adds it to the list of pending transactions.
   * @param {number} amount - Amount of the transaction.
   * @param {string} sender - ID of the sender.
   * @param {string} recipient - ID of the recipient.
   */
  createTransaction(amount, sender, recipient) {
    this.pendingTransactions.push(new Transaction(amount, sender, recipient));
  }

  /**
   * Adds a block to the blockchain.
   * @param {number} nonce - Nonce value found by the proof of work algorithm.
   */
  addBlock(nonce) {
    const index = this.chain.length;
    const prevHash =
      this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : "0";
    const hash = this.getHash(prevHash, this.pendingTransactions, nonce);
    const block = new Block(
      index,
      this.pendingTransactions,
      prevHash,
      nonce,
      hash
    );

    // Reset pending transactions
    this.pendingTransactions = [];
    this.chain.push(block);

    // Adjust difficulty if necessary
    this.adjustDifficulty();
  }

  /**
   * Adjusts the difficulty of the proof of work algorithm.
   */
  adjustDifficulty() {
    if (this.chain.length % 10 === 0) {
      // Increase difficulty every 10 blocks
      this.difficulty++;
    }
  }

  /**
   * Computes the hash of a block.
   * @param {string} prevHash - Hash of the previous block.
   * @param {Array} txs - List of transactions in the block.
   * @param {number} nonce - Nonce value.
   * @returns {string} - Computed hash of the block.
   */
  getHash(prevHash, txs, nonce) {
    let encrypt = prevHash + nonce;
    txs.forEach((tx) => {
      encrypt += tx.tx_id;
    });
    const hash = crypto
      .createHmac("sha256", "secret")
      .update(encrypt)
      .digest("hex");
    return hash;
  }

  /**
   * Finds a nonce that satisfies the proof of work requirement.
   * @param {string} prevHash - Hash of the previous block.
   * @param {Array} transactions - List of transactions in the block.
   * @param {number} difficulty - Difficulty level.
   * @returns {number} - Nonce value that satisfies the proof of work.
   */
  proofOfWork(prevHash, transactions, difficulty) {
    let nonce = 0;
    let hash = this.getHash(prevHash, transactions, nonce);
    const target = "0".repeat(difficulty); // Target hash must have leading zeros

    while (!hash.startsWith(target)) {
      nonce++;
      hash = this.getHash(prevHash, transactions, nonce);
    }

    return nonce;
  }

  /**
   * Mines a new block and adds it to the chain.
   */
  mine() {
    const startTime = Date.now();
    const prevHash =
      this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : "0";
    const nonce = this.proofOfWork(
      prevHash,
      this.pendingTransactions,
      this.difficulty
    );
    this.addBlock(nonce);
    const endTime = Date.now();

    const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
    console.log(`Block mined in ${timeTaken} seconds`);

    // Compute the average hash rate (hashes per second)
    const totalHashes = nonce + 1; // Since nonce starts at 0
    const hashRate = totalHashes / timeTaken;
    console.log(`Average hash rate: ${hashRate} hashes per second`);
  }

  /**
   * Validates the blockchain by ensuring the integrity of all blocks.
   * @returns {boolean} - True if the blockchain is valid, false otherwise.
   */
  chainIsValid() {
    for (let i = 0; i < this.chain.length; i++) {
      const tx_id_list = [];
      this.chain[i].transactions.forEach((tx) => tx_id_list.push(tx.tx_id));

      if (i === 0 && this.chain[i].hash !== this.getHash("0", [], "0")) {
        return false;
      }
      if (
        i > 0 &&
        this.chain[i].hash !==
          this.getHash(
            this.chain[i - 1].hash,
            this.chain[i].transactions,
            this.chain[i].nonce
          )
      ) {
        return false;
      }
      if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash) {
        return false;
      }
    }
    return true;
  }
}

/**
 * Constructs a Merkle tree (placeholder function).
 * @param {Array} inputs - Array of inputs for the Merkle tree.
 */
function constructMerkleTree(inputs) {
  // TODO: Implement Merkle tree construction
}

/**
 * Simulates the blockchain by creating and mining transactions.
 * @param {Blockchain} blockchain - The blockchain instance.
 * @param {number} numTxs - Number of transactions per block.
 * @param {number} numBlocks - Number of blocks to mine.
 */
function simulateChain(blockchain, numTxs, numBlocks) {
  for (let i = 0; i < numBlocks; i++) {
    const numTxsRand = Math.floor(Math.random() * Math.floor(numTxs));
    for (let j = 0; j < numTxsRand; j++) {
      const sender = uuidv4().substr(0, 5);
      const receiver = uuidv4().substr(0, 5);
      blockchain.createTransaction(
        Math.floor(Math.random() * 1000),
        sender,
        receiver
      );
    }
    blockchain.mine();
  }
}

// Create a new blockchain instance and simulate transactions
const BChain = new Blockchain();
simulateChain(BChain, 5, 3);

module.exports = Blockchain;

// Uncomment these lines to run a simulation and check the blockchain's validity
// console.dir(BChain, { depth: null });
// console.log("******** Validity of this blockchain: ", BChain.chainIsValid());
