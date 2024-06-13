const { Blockchain, Participant } = require("./Blockchain");

const BChain = new Blockchain();

// Adding participants
const participant1 = new Participant("Alice");
const participant2 = new Participant("Bob");
BChain.addParticipant(participant1);
BChain.addParticipant(participant2);

runTests(BChain);

/**
 * Runs tests on the blockchain instance.
 * @param {Blockchain} blockchain - The blockchain instance.
 */
function runTests(blockchain) {
  // Mining initial blocks to establish the chain
  for (let i = 0; i < 3; i++) {
    blockchain.mine(participant1.id);
  }

  // Simulate transactions and mining
  simulateChain(blockchain, 5, 8, participant2.id);

  // Validate blockchain
  const isValid = blockchain.chainIsValid();
  console.log("Blockchain is valid:", isValid);

  // Display final blockchain
  console.log("Final blockchain:");
  blockchain.chain.forEach((block) => {
    console.log({
      index: block.index,
      timestamp: block.timestamp,
      transactions: block.transactions.map((tx) => ({
        amount: tx.amount,
        sender: tx.sender,
        recipient: tx.recipient,
        tx_id: tx.tx_id,
        senderSignature: tx.senderSignature,
        senderPublicKey: tx.senderPublicKey,
      })),
      prevHash: block.prevHash,
      hash: block.hash,
      nonce: block.nonce,
      merkleRoot: block.merkleRoot,
      difficulty: block.difficulty,
      minerPublicKey: block.minerPublicKey,
    });
  });
}

/**
 * Simulates the blockchain by creating and mining transactions.
 * @param {Blockchain} blockchain - The blockchain instance.
 * @param {number} numTxs - Number of transactions per block.
 * @param {number} numBlocks - Number of blocks to mine.
 * @param {string} minerId - ID of the miner participant.
 */
function simulateChain(blockchain, numTxs, numBlocks, minerId) {
  for (let i = 0; i < numBlocks; i++) {
    const numTxsRand = Math.floor(Math.random() * Math.floor(numTxs));
    for (let j = 0; j < numTxsRand; j++) {
      const sender = j % 2 === 0 ? "Alice" : "Bob";
      const receiver = j % 2 === 0 ? "Bob" : "Alice";
      blockchain.createTransaction(
        Math.floor(Math.random() * 1000),
        sender,
        receiver
      );
    }
    blockchain.mine(minerId);
  }
}
