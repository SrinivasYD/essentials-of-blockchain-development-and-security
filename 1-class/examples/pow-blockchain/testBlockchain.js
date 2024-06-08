const Blockchain = require("./Blockchain");

function runTests() {
  const BChain = new Blockchain();

  // Create some transactions
  console.log("Creating transactions...");
  BChain.createTransaction(10, "Alice", "Bob");
  BChain.createTransaction(20, "Bob", "Charlie");
  BChain.createTransaction(30, "Charlie", "Dave");

  // Mine a block and check hash
  console.log("Mining block...");
  BChain.mine();
  let lastBlock = BChain.chain[BChain.chain.length - 1];
  let hashCheck = lastBlock.hash.startsWith("0".repeat(BChain.difficulty));
  console.log(
    `First block mined with hash: ${lastBlock.hash} (difficulty: ${BChain.difficulty})`
  );
  console.assert(hashCheck, "Hash does not meet difficulty requirement");

  // Mine additional blocks to trigger difficulty increase
  console.log("Mining additional blocks to test difficulty adjustment...");
  for (let i = 0; i < 9; i++) {
    BChain.createTransaction(Math.random() * 100, "UserA", "UserB");
    BChain.mine();
  }

  // Check if difficulty increased
  console.log("Checking difficulty adjustment...");
  let currentDifficulty = BChain.difficulty;
  console.log(`Current difficulty: ${currentDifficulty}`);
  console.assert(currentDifficulty > 3, "Difficulty did not increase");

  // Check hash rate calculation
  console.log("Checking hash rate calculation...");
  BChain.createTransaction(50, "Eve", "Frank");
  BChain.mine(); // Mine one more block to get the hash rate log

  // Print the entire blockchain for verification
  console.log("Final blockchain:");
  console.dir(BChain, { depth: null });

  // Validate the entire blockchain
  console.log("Validating blockchain...");
  const isValid = BChain.chainIsValid();
  console.log("Blockchain is valid:", isValid);
  console.assert(isValid, "Blockchain is not valid");
}

runTests();
