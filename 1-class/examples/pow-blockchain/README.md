# Blockchain Simulator

This is a blockchain simulator where transactions can be added to a mempool and can be mined into a block using PoW.

## Running

1. Install required modules: `npm install #might need sudo`
2. Run a node on one terminal by specifying a port: `PORT=8000 && node blockchain-peer.js`
3. Run as many nodes as you want in separate terminals using the above command with different ports

## Interacting with the blockchain

You can simulate transactions using some HTTP request client like cURL (terminal) or [Postman](https://www.postman.com/) (GUI).

- You can start by making nodes find each other using this request body `{ "peer": "http://localhost:8081" }` and sending it to one of the nodes as a POST request to the endpoint `http://localhost:8080/add_known_peer`
- Then, you can make nodes broadcast by passing this request body `{ "msg": "Hello world!"}` as a POST request to the endpoint `http://localhost:8080/broadcast`
- You can then interact with the blockchain API methods as documented in the code

## Docker

You can run a node as a docker container.

- First, build the container using: `docker build .`. This will generate a random container ID.
- Then, you can run the node by specifying a port (such as 8080): `export PORT=8000 && docker run -e PORT=$PORT --expose $PORT -p $PORT:$PORT <CONTAINER-ID>`
- This will spin up a node you on your port that you can make requests to

---

# Proof of Work Blockchain Assignment

## Name: Durga Srinivas Yerasuri

## Student Number: 220936027

## Assignment: 1

### Project Overview

This project implements a basic proof of work (PoW) blockchain in Node.js. The blockchain supports transaction creation, block mining, and validation. The difficulty of mining increases after every 10 blocks to simulate a more challenging mining environment.

### Approach

1. **Class Design:**

   - `Block` class to represent individual blocks.
   - `Transaction` class to represent transactions.
   - `Blockchain` class to manage the chain of blocks, transaction pool, and mining process.

2. **Proof of Work Algorithm:**

   - Implemented in the `proofOfWork` method of the `Blockchain` class.
   - The method calculates the nonce such that the hash of the block starts with a specified number of leading zeros based on the difficulty level.

3. **Difficulty Adjustment:**

   - The difficulty increases after every 10 blocks, making the mining process more challenging.

4. **Hash Rate Calculation:**
   - During the mining process, the time taken to find a valid nonce is recorded, and the hash rate is calculated and logged.

### How to Test the Functionality

1. **Install Dependencies:**

   - Ensure Node.js is installed.
   - Run `npm install` to install the required dependencies listed in `package.json`.

2. **Run the Test Script:**
   - Execute `node testBlockchain.js` to run the test script.
   - The script will create transactions, mine blocks, and validate the blockchain.
   - Check the console output to verify the following:
     - Hashes of the blocks meet the difficulty requirement.
     - Difficulty increases after 10 blocks.
     - Hash rate is calculated and logged.
     - The blockchain is valid.

### Project Files

- `Blockchain.js`: Contains the implementation of the blockchain, block, and transaction classes.
- `blockchain-peer.js`: Provides an Express server to interact with the blockchain.
- `Dockerfile`: Configuration for Docker to run the blockchain application.
- `package.json`: Lists project dependencies.
- `testBlockchain.js`: Script to test the blockchain functionality.
- `README.md`: Documentation file.

### Example Output

```plaintext
Block mined in 0.115 seconds
Average hash rate: 94895.65217391304 hashes per second
Block mined in 0.031 seconds
Average hash rate: 95064.51612903226 hashes per second
Block mined in 0.025 seconds
Average hash rate: 81200 hashes per second

Creating transactions...
Mining block...
Block mined in 0.149 seconds
Average hash rate: 94315.43624161075 hashes per second
First block mined with hash: 0005cfaedf2fa8ac6d529c7e613d51b1ded3f8bfcb844c89ddbeff5c79f328c0 (difficulty: 3)
Mining additional blocks to test difficulty adjustment...
Block mined in 0.025 seconds
Average hash rate: 92120 hashes per second
Block mined in 0.037 seconds
Average hash rate: 126378.37837837839 hashes per second
Block mined in 0.028 seconds
Average hash rate: 125714.28571428571 hashes per second
Block mined in 0.027 seconds
Average hash rate: 129444.44444444445 hashes per second
Block mined in 0.011 seconds
Average hash rate: 97454.54545454546 hashes per second
Block mined in 0.017 seconds
Average hash rate: 125294.11764705881 hashes per second
Block mined in 0.009 seconds
Average hash rate: 85888.88888888889 hashes per second
Block mined in 0.055 seconds
Average hash rate: 126054.54545454546 hashes per second
Block mined in 0.896 seconds
Average hash rate: 144213.16964285713 hashes per second

Checking difficulty adjustment...
Current difficulty: 4
Checking hash rate calculation...
Block mined in 0.34 seconds
Average hash rate: 138355.88235294117 hashes per second

Final blockchain:
Blockchain {
  chain: [
    Block {
      index: 0,
      timestamp: 1717840207,
      transactions: [],
      prevHash: '0',
      hash: '3a17d38f56ca57a0af46641df698103964e32832fafb27419a19232fe42e64a6',
      nonce: '0'
    },
    Block {
      index: 1,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 10,
          sender: 'Alice',
          recipient: 'Bob',
          tx_id: '8d2e3f24,fbf2,4106,aa47,54c66d16dbac'
        },
        Transaction {
          amount: 20,
          sender: 'Bob',
          recipient: 'Charlie',
          tx_id: '65517ed9,9fba,4203,b51c,0bc93fa991a9'
        },
        Transaction {
          amount: 30,
          sender: 'Charlie',
          recipient: 'Dave',
          tx_id: '5892a371,5876,42a1,8a27,5f755097f6f6'
        }
      ],
      prevHash: '3a17d38f56ca57a0af46641df698103964e32832fafb27419a19232fe42e64a6',
      hash: '0005cfaedf2fa8ac6d529c7e613d51b1ded3f8bfcb844c89ddbeff5c79f328c0',
      nonce: 14052
    },
    Block {
      index: 2,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 69.33215385991427,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: 'a3602d37,000e,4287,a5f6,269f67188940'
        }
      ],
      prevHash: '0005cfaedf2fa8ac6d529c7e613d51b1ded3f8bfcb844c89ddbeff5c79f328c0',
      hash: '000cc87b47b44d9f6466c2aae5015c0625587b8d116afbfbf22c48445ffe0a43',
      nonce: 2302
    },
    Block {
      index: 3,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 97.78988926664742,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: 'fa2cafed,695c,45fe,a15a,760d3c59aef6'
        }
      ],
      prevHash: '000cc87b47b44d9f6466c2aae5015c0625587b8d116afbfbf22c48445ffe0a43',
      hash: '000fd3dee6aaec8b0edf2a22dd815924824fc81e2dce8598ded441a711d10fb3',
      nonce: 4675
    },
    Block {
      index: 4,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 84.34898391220096,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: '0b9151a1,d589,41a2,bc5f,dcdb5d85f93c'
        }
      ],
      prevHash: '000fd3dee6aaec8b0edf2a22dd815924824fc81e2dce8598ded441a711d10fb3',
      hash: '000a9374a77644a619c4945bf4feecfdbc1be25d1b2a8e82a117ca00a212456c',
      nonce: 3519
    },
    Block {
      index: 5,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 43.16201525650287,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: '5cd091ed,c461,4d04,9960,51de91c2953d'
        }
      ],
      prevHash: '000a9374a77644a619c4945bf4feecfdbc1be25d1b2a8e82a117ca00a212456c',
      hash: '000fb8a7d68ef68a5df38fe5037275c34628434b0e78a29576532fbc74e3a63d',
      nonce: 3494
    },
    Block {
      index: 6,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 29.76508092302801,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: '9308886d,66a4,40e2,aa5a,785ea3565236'
        }
      ],
      prevHash: '000fb8a7d68ef68a5df38fe5037275c34628434b0e78a29576532fbc74e3a63d',
      hash: '000006878ee6b974c6ad11078e377a2c6eac9ea8fede796287c717aa16d1396b',
      nonce: 1071
    },
    Block {
      index: 7,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 87.34576692050213,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: '105a497f,b7c2,4388,86f0,59301c58a552'
        }
      ],
      prevHash: '000006878ee6b974c6ad11078e377a2c6eac9ea8fede796287c717aa16d1396b',
      hash: '000b0bedd9061b3ed294b4942afb459eaf00a1f897b6f17d3de6889fbefef8be',
      nonce: 2129
    },
    Block {
      index: 8,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 13.019188632498357,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: 'ced415ec,bca4,4f30,886f,171b5a2284ba'
        }
      ],
      prevHash: '000b0bedd9061b3ed294b4942afb459eaf00a1f897b6f17d3de6889fbefef8be',
      hash: '000235d64a8a519ae6cc5345061ec1ca87d3f2a5dcfa3c271e6a220f22437286',
      nonce: 772
    },
    Block {
      index: 9,
      timestamp: 1717840207,
      transactions: [
        Transaction {
          amount: 65.32793463912103,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: '995af4d2,3109,407d,bcc0,2fd574267d35'
        }
      ],
      prevHash: '000235d64a8a519ae6cc5345061ec1ca87d3f2a5dcfa3c271e6a220f22437286',
      hash: '000be81975b6bff99924f914dc32265fcdf5986426bc7b333cb201265938cce8',
      nonce: 6932
    },
    Block {
      index: 10,
      timestamp: 1717840208,
      transactions: [
        Transaction {
          amount: 42.922185898380214,
          sender: 'UserA',
          recipient: 'UserB',
          tx_id: 'a9a41dda,995c,4c92,9d0d,fa12daa9754d'
        }
      ],
      prevHash: '000be81975b6bff99924f914dc32265fcdf5986426bc7b333cb201265938cce8',
      hash: '0000911c501390212f2303d168a594532a51a48d7baa4f1ff139386164c9d0f5',
      nonce: 129214
    },
    Block {
      index: 11,
      timestamp: 1717840209,
      transactions: [
        Transaction {
          amount: 50,
          sender: 'Eve',
          recipient: 'Frank',
          tx_id: '1464c82c,4a05,4485,900a,beec3482a120'
        }
      ],
      prevHash: '0000911c501390212f2303d168a594532a51a48d7baa4f1ff139386164c9d0f5',
      hash: '0000a4471c6cb56ff187fc86931c01cc9fbd0af3a2fb44c79618bebf45913ff2',
      nonce: 47040
    }
  ],
  pendingTransactions: [],
  difficulty: 4
}
Validating blockchain...
Blockchain is valid: true
```
