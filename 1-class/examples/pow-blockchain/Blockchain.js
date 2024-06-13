const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const forge = require("node-forge");

// Function to generate key pairs
function generateKeyPair() {
  return forge.pki.rsa.generateKeyPair(2048);
}

// Class to represent a participant with a key pair
class Participant {
  constructor(id) {
    this.id = id;
    const { publicKey, privateKey } = generateKeyPair();
    this.publicKey = forge.pki.publicKeyToPem(publicKey);
    this.privateKey = privateKey;
  }

  sign(data) {
    const md = forge.md.sha256.create();
    md.update(data, "utf8");
    return forge.util.encode64(this.privateKey.sign(md));
  }

  verify(signature, data) {
    const publicKey = forge.pki.publicKeyFromPem(this.publicKey);
    const md = forge.md.sha256.create();
    md.update(data, "utf8");
    return publicKey.verify(
      md.digest().bytes(),
      forge.util.decode64(signature)
    );
  }
}

/**
 * Represents a block in the blockchain.
 * @class Block
 */
class Block {
  constructor(
    index,
    transactions,
    prevHash,
    nonce,
    hash,
    merkleRoot,
    difficulty,
    minerPublicKey
  ) {
    this.index = index;
    this.timestamp = Math.floor(Date.now() / 1000);
    this.transactions = transactions;
    this.prevHash = prevHash;
    this.hash = hash;
    this.nonce = nonce;
    this.merkleRoot = merkleRoot;
    this.difficulty = difficulty;
    this.minerPublicKey = minerPublicKey;
  }
}

/**
 * Represents a transaction in the blockchain.
 * @class Transaction
 */
class Transaction {
  constructor(amount, sender, recipient, senderSignature, senderPublicKey) {
    this.amount = amount;
    this.sender = sender;
    this.recipient = recipient;
    this.tx_id = uuidv4().replace(/-/g, "");
    this.senderSignature = senderSignature;
    this.senderPublicKey = senderPublicKey;
  }
}

/**
 * Represents the entire blockchain.
 * @class Blockchain
 */
class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.participants = {};
    this.difficulty = 3; // Initial difficulty level
    this.addBlock("0", "genesis");
  }

  addParticipant(participant) {
    this.participants[participant.id] = participant;
  }

  createTransaction(amount, senderId, recipientId) {
    const sender = this.participants[senderId];
    if (!sender) {
      throw new Error("Sender does not exist");
    }

    const transaction = new Transaction(
      amount,
      senderId,
      recipientId,
      sender.sign(amount + senderId + recipientId),
      sender.publicKey
    );
    if (!this.validateTransaction(transaction)) {
      throw new TypeError(
        "Invalid transaction: Transaction must have a valid tx_id and signature"
      );
    }
    this.pendingTransactions.push(transaction);
  }

  validateTransaction(transaction) {
    if (!transaction || typeof transaction.tx_id !== "string") {
      return false;
    }
    const sender = this.participants[transaction.sender];
    if (!sender) {
      return false;
    }
    return sender.verify(
      transaction.senderSignature,
      transaction.amount + transaction.sender + transaction.recipient
    );
  }

  validatePendingTransactions() {
    for (const transaction of this.pendingTransactions) {
      if (!this.validateTransaction(transaction)) {
        return false;
      }
    }
    return true;
  }

  addBlock(nonce, minerPublicKey) {
    const index = this.chain.length;
    const prevHash =
      this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : "0";
    const merkleRoot = this.constructMerkleRoot(this.pendingTransactions);
    const hash = this.getHash(prevHash, merkleRoot, nonce);
    const block = new Block(
      index,
      this.pendingTransactions,
      prevHash,
      nonce,
      hash,
      merkleRoot,
      this.difficulty,
      minerPublicKey
    );

    this.pendingTransactions = [];
    this.chain.push(block);

    this.adjustDifficulty();
  }

  adjustDifficulty() {
    if (this.chain.length % 10 === 0) {
      this.difficulty++;
    }
  }

  getHash(prevHash, merkleRoot, nonce) {
    const encrypt = prevHash + merkleRoot + nonce;
    return crypto.createHmac("sha256", "secret").update(encrypt).digest("hex");
  }

  proofOfWork(prevHash, merkleRoot, difficulty) {
    let nonce = 0;
    let hash = this.getHash(prevHash, merkleRoot, nonce);
    const target = "0".repeat(difficulty);

    while (!hash.startsWith(target)) {
      nonce++;
      hash = this.getHash(prevHash, merkleRoot, nonce);
    }

    return nonce;
  }

  mine(minerId) {
    if (!this.validatePendingTransactions()) {
      console.error("Invalid transactions detected. Aborting mining.");
      return;
    }

    const startTime = Date.now();
    const miner = this.participants[minerId];
    const prevHash =
      this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : "0";
    const merkleRoot = this.constructMerkleRoot(this.pendingTransactions);
    const nonce = this.proofOfWork(prevHash, merkleRoot, this.difficulty);
    this.addBlock(nonce, miner.publicKey);
    const endTime = Date.now();

    const timeTaken = (endTime - startTime) / 1000;
    console.log(`Block mined in ${timeTaken.toFixed(3)} seconds`);
    console.log(
      `Average hash rate: ${(nonce / timeTaken).toFixed(2)} hashes per second`
    );
    console.log(`Difficulty: ${this.difficulty}`);
  }

  chainIsValid() {
    for (let i = 0; i < this.chain.length; i++) {
      const block = this.chain[i];
      const merkleRoot = this.constructMerkleRoot(block.transactions);

      if (i === 0 && block.hash !== this.getHash("0", merkleRoot, "0")) {
        return false;
      }
      if (
        i > 0 &&
        block.hash !==
          this.getHash(this.chain[i - 1].hash, merkleRoot, block.nonce)
      ) {
        return false;
      }
      if (i > 0 && block.prevHash !== this.chain[i - 1].hash) {
        return false;
      }
    }
    return true;
  }

  constructMerkleRoot(transactions) {
    if (transactions.length === 0) {
      return "";
    }

    let hashes = transactions.map((tx) => this.hashTransaction(tx));

    while (hashes.length > 1) {
      if (hashes.length % 2 !== 0) {
        hashes.push(hashes[hashes.length - 1]);
      }

      const newLevel = [];
      for (let i = 0; i < hashes.length; i += 2) {
        newLevel.push(this.hashPair(hashes[i], hashes[i + 1]));
      }
      hashes = newLevel;
    }

    return hashes[0];
  }

  hashPair(left, right) {
    return crypto
      .createHmac("sha256", "secret")
      .update(left + right)
      .digest("hex");
  }

  hashTransaction(transaction) {
    return crypto
      .createHmac("sha256", "secret")
      .update(transaction.tx_id)
      .digest("hex");
  }
}

module.exports = { Blockchain, Participant };
