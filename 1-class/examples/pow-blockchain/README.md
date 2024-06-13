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

# Merkle root and PKI Blockchain Assignment

## Name: Durga Srinivas Yerasuri

## Student Number: 220936027

## Assignment: 2

### Project Overview

This project implements a basic proof of work (PoW) blockchain in Node.js. The blockchain supports transaction creation, block mining, and validation. The difficulty of mining increases after every 10 blocks to simulate a more challenging mining environment. It also utilize the Recursive Merkle Root concept for the transaction hash calculation and the transaction are secured using PKI mechanism.

### Approach

1. **Class Design:**

   - `Block` class to represent individual blocks.
   - `Participant` class to sign and verify the transactions.
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
     - Merkle root of the transactions is calculated and logged.
     - Hashes of the blocks meet the difficulty requirement.
     - Difficulty increases after 10 blocks.
     - Hash rate is calculated and logged.
     - The blockchain is valid.
     - Final blockchain with the transactions secured using PKI is logged.

### Project Files

- `Blockchain.js`: Contains the implementation of the blockchain, participant, block, and transaction classes.
- `blockchain-peer.js`: Provides an Express server to interact with the blockchain.
- `Dockerfile`: Configuration for Docker to run the blockchain application.
- `package.json`: Lists project dependencies.
- `testBlockchain.js`: Script to test the blockchain functionality.
- `README.md`: Documentation file.

### Example Output

```plaintext
Block mined in 0.104 seconds
Average hash rate: 104923.08 hashes per second
Difficulty: 3
Block mined in 0.036 seconds
Average hash rate: 81833.33 hashes per second
Difficulty: 3
Block mined in 0.025 seconds
Average hash rate: 81160.00 hashes per second
Difficulty: 3
Block mined in 0.020 seconds
Average hash rate: 124600.00 hashes per second
Difficulty: 3
Block mined in 0.059 seconds
Average hash rate: 119847.46 hashes per second
Difficulty: 3
Block mined in 0.132 seconds
Average hash rate: 129734.85 hashes per second
Difficulty: 3
Block mined in 0.013 seconds
Average hash rate: 128461.54 hashes per second
Difficulty: 3
Block mined in 0.083 seconds
Average hash rate: 141048.19 hashes per second
Difficulty: 3
Block mined in 0.034 seconds
Average hash rate: 121205.88 hashes per second
Difficulty: 4
Block mined in 0.295 seconds
Average hash rate: 140444.07 hashes per second
Difficulty: 4
Block mined in 0.295 seconds
Average hash rate: 138010.17 hashes per second
Difficulty: 4
Blockchain is valid: true
Final blockchain:
{
  index: 0,
  timestamp: 1718242775,
  transactions: [],
  prevHash: '0',
  hash: '3a17d38f56ca57a0af46641df698103964e32832fafb27419a19232fe42e64a6',
  nonce: '0',
  merkleRoot: '',
  difficulty: 3,
  minerPublicKey: 'genesis'
}
{
  index: 1,
  timestamp: 1718242776,
  transactions: [],
  prevHash: '3a17d38f56ca57a0af46641df698103964e32832fafb27419a19232fe42e64a6',
  hash: '000228c688c936ff0c3f135c2f25017971607e572c038848a3e50b0ddfd9ca9b',
  nonce: 10912,
  merkleRoot: '',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
    'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
    '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
    'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
    'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
    'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
    'tQIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 2,
  timestamp: 1718242776,
  transactions: [],
  prevHash: '000228c688c936ff0c3f135c2f25017971607e572c038848a3e50b0ddfd9ca9b',
  hash: '000d918cda0035f220eb8607296bfc9b1baf47fc1a3151c2021b48337c590b58',
  nonce: 2946,
  merkleRoot: '',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
    'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
    '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
    'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
    'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
    'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
    'tQIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 3,
  timestamp: 1718242776,
  transactions: [],
  prevHash: '000d918cda0035f220eb8607296bfc9b1baf47fc1a3151c2021b48337c590b58',
  hash: '000d66b80c5c8a7612829235bfda9fcc4c044da856eee78057d632cae8327cd7',
  nonce: 2029,
  merkleRoot: '',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
    'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
    '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
    'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
    'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
    'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
    'tQIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 4,
  timestamp: 1718242777,
  transactions: [
    {
      amount: 834,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: '9e469b8a802e4a01921ec195d7714e0b',
      senderSignature: 'bcSVMWod0FvrAXjSYoA0CMIn32WYXRpnD1nz75i0c/nfrz8e43CFhDVghQoa0+WX4JsYya+VM+C2eEHI6usgYD5BJ25tGEQOfylnEiU6ep7rhxUb91vMNm92IApoQ9o+jYRr60yJ/Cor9ry7bzUDROgmEAoOhCeq3Z4lwdtZeUh3I+NGTHmiPYRDpMC7OoFiRb5kqvvTs1Hbkks7HeJk1M+DcEj0MI4XigUQz2ewfKm5SKfSNUzQO1CdqlPHxTm0HNhCX4ZziMWuPcIm65BwAO5zTLKWVLMpP4TuHtk7UBhnYyOlzOpWp3sa2OFJOEKBuVEFm7FGkBf6bwLEvIC7pA==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 853,
      sender: 'Bob',
      recipient: 'Alice',
      tx_id: '75b51690d5864184bff74b5866f6de30',
      senderSignature: 'YHzrgNg+G6J9XFRaycMxzT7YMXjwE423XrYGeBgC9w/npMv6QW92M2xK0h2jZ2FjURNasvx3GmiV9hW7kamKBOJkBLLBMezjDoguVbX5vjYSsFjjjy7/sqgAbFiAeOFpncH/xTjUTeeHM6NMis9fbVgWSzROKg0OrmUM+S9lfx9YwBWMrhKY4Dj7CZX12HVpj242vMFDVpP1kz6ojkqxAewoweSgN2Tzfe4d9qW+ZRZymCLTF0cKhPrMbge4Sjqi78L/nHDW+rKhO+mbXSw5YedQbCRLUgtTH4J+VmVIJuG4bDwBP5I2K/vfSa4i1RnzrCE0XVpp87JhhP4CqdxA8A==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
        'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
        'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
        'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
        'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
        'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
        'RwIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 978,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: '463052cc7d684f0aa99081af588e015e',
      senderSignature: 'alz/ps/UM/IH65E/2OrfoMnGBI8DzjgXrCD36ZB4iRyViQixnZpDOYzdLv0sOjtrnc5Bq/2sz6vea9xVVXMe+zAz6ftkY+wuk11L+nvlHThSH2UB3Ym7jn7ds4d8H4pHvlqmrs7GhyUB2qm+0eqWCqWSEZODyfrPqFDx7jSP02/on6duSQ+HUbh+3kwnfz9I2aapxbKIyplb9Udof1COppBZYQ63zwk8GSj5rhon27I3kCmeFPwA0noTWTlfzareV4j0vmHZjfP2BaRIWjvTFxUwEHD6XPV5DgNpv5+pgg/PQ3cJih5ldJoUMhIspne7Ahxhv/U1EZoJFyFKkaOutA==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 432,
      sender: 'Bob',
      recipient: 'Alice',
      tx_id: '98acbbf7505944ff99f2fbe0dde2bf9c',
      senderSignature: 'flLXPF+XlxtkQ/61n+0oU7DaWVElM2fGHx6wrhZFToy/Y2iWZn3xaVD66/ReJPLmfL9pEEeKyuBHfJRYXbWVjCGoDP2dguhIPuOA2IvI8Ue9FlzIRkslTTn/xhL4Q2nNrKnGRxNptlp9gDeCz33vCLyJa+UBMOweinm29ms0DHy7cp59Y7LFL9ykDnZj38RiGdP6gJ6beAUuwrh21B4VMnJ5GkBZkt/Xo8jriiz5vz9gEwTnmzrpr2mv84hg2REkLYYDiNdCUlTA5pX5YDbn0oKmcvWsp6W2iBZQ8IJSLqwmmrmijRAVpYcpLz3F5rW6aE756Ey+DQY9c9sbghn59Q==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
        'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
        'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
        'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
        'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
        'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
        'RwIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    }
  ],
  prevHash: '000d66b80c5c8a7612829235bfda9fcc4c044da856eee78057d632cae8327cd7',
  hash: '0001ef802e0faffebe81213d356f810773985c5fe7725268c27f2111be25d6ae',
  nonce: 2492,
  merkleRoot: 'a848f803ab32a7a8f31a654cd6d99d0cce02dd9af65809cabee5d8a722de0850',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
    'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
    'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
    'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
    'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
    'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
    'RwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 5,
  timestamp: 1718242777,
  transactions: [
    {
      amount: 265,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: 'c49146924e5148f2be907c318f0028e0',
      senderSignature: 'RKZ3xK72R4DMtn3iUMBVbqXjVPnRu6K4OH/9uuc/V94Zsk8jRyHOToJrnb7513lkpQVCnyQ7pDZ4XXKaMhhuEkhgIQkyElMXSNly9Mb3uFHacfG73yqLbuCu4UH4lYvTd+fZKXq7nqCpzvA4PRV2f8XeYW+TDMJGHwaLx2aHJ4Kos+444ABwTiQBACrhKVQx3mhIV3yx6bmcnkISZazafIbt/K5Eu70HIacn71050oSepulmqZbTnuFvB6/4rf3MsC6SgsgwscZUd1hDEJIr1VMHIiDH0K2Bq7vLMoBZqejUJ3PtrzUqiGm4OZ6f21NlUmbfGckEW9DE+lC/mOq9ZQ==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 674,
      sender: 'Bob',
      recipient: 'Alice',
      tx_id: '90b31aaadde5452cb396f3e6827a84b1',
      senderSignature: 'S1xtcERhBx2kQtWWs38uvdOYIVcWjfxgQ6XqEBcA4ewoU8sQ0CLXm/iSMdexc77kLVvws9wsX3WRogH9HTMTfox0dvuLVZn4FKctQkj+uttPYCbD4YNgprepcu+nUeU3+7gGojk0MeiQwOcOnI2MC2yePFeJd9k2xUn99rNGw1MwesFUautU1L4JuSCl/y8uqco6fthmgmtMUkYqQAsYCCVVwIteCVsJtQAW+SKNk01oocLm0fRXbqhEvEKyHu9Y+UkVRtD9vv60aH+N3yO7Fn7SmAviwxvfFIgQHTgHhKmjHYfBM9HxuOIUWiezDVRbO231KTq3S9VkgfhBqT0M2g==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
        'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
        'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
        'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
        'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
        'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
        'RwIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    }
  ],
  prevHash: '0001ef802e0faffebe81213d356f810773985c5fe7725268c27f2111be25d6ae',
  hash: '000a2b9870e820dc12226ee2c2491fa8b33db972f337665f6e2e9ca188321ac4',
  nonce: 7071,
  merkleRoot: 'a4e66210f63c6998873a774414494a80d69fa08e0bc8ffb09222fb79040c7a08',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
    'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
    'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
    'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
    'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
    'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
    'RwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 6,
  timestamp: 1718242777,
  transactions: [],
  prevHash: '000a2b9870e820dc12226ee2c2491fa8b33db972f337665f6e2e9ca188321ac4',
  hash: '000f182742e608a230fadc85c2ded0c31e96d975788bd89390df581307b45982',
  nonce: 17125,
  merkleRoot: '',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
    'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
    'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
    'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
    'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
    'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
    'RwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 7,
  timestamp: 1718242777,
  transactions: [
    {
      amount: 323,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: '34b3a5b243304fd5a45711ce2762653f',
      senderSignature: 'ktc+Yq/pEBDr7B1mlpSA5E0XGH8DZrMGYPz2P0dOuL/gkDUZSBz1FFXomtnaofOf3Glj9knFD88CQ8nHI1r8+Otj3x2obC1hX47euwy0n3eHx8zNGDzQrWRQEy5EfABP/L/kh3IAEgN9UCcB1dSON13RR1LrcdVgmqc3LdUKJnV/2zoGueqXtApm1NjM0iQFSACBOeI6MGFBcWqIDcIuDggssvpDtS8T0xum+0R19DTDeGAMKrgkSh7IIQFwvhqrP53Tc4i+MxcHclSPGbPnYKY9HhZ0bn1fn/LIfMzJR3Np02TGTZX9MgZSQxmz1aPmu9h2KDEMrro3Wvha6dC1Xg==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    }
  ],
  prevHash: '000f182742e608a230fadc85c2ded0c31e96d975788bd89390df581307b45982',
  hash: '000bcc862c34aa0b244ad82f7bf6f74dfbd32e75909d11263e9350104e7737b0',
  nonce: 1670,
  merkleRoot: 'e93ee7fdf1c102e18a6fbdd9a53eeee0bff63b4074a94564701f511e67e93cdb',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
    'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
    'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
    'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
    'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
    'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
    'RwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 8,
  timestamp: 1718242777,
  transactions: [
    {
      amount: 83,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: 'e031c2f762524335bf7b1d69d292e60a',
      senderSignature: 'c5yQXDhokOMqr1b470Tcwhy6S5AKZwnpthkURfoKamnhLBGR8p7CjteU+5vWgQzDAit7z9jvBcPehL/+PZguHmuxv6CdIzSb6vP2Oiy6yAtqgf0Dj71wUncebz8UEbAmvID8hEps6LWxSAlkCSPd2TN//POD4lNFBg8Pgfj9LbrRFV2FBycffdCvQb6LEUc6kogzxn4KNaFWfrdsuro02xuodONB+qRm/cPoyEP+fOWUIHVMSwMxRHRtJ8QXK1dTI2dGzXhYrRNn1hIasGwk7/YsuvCh8fkwkpNhKX3o1wBKDgLOGam46Ucu3EbokqDp5rDii6eRTF9nTfLX1nVi6Q==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 373,
      sender: 'Bob',
      recipient: 'Alice',
      tx_id: '0ea59750b77246f9ac21444807057d31',
      senderSignature: 'L5uzhckLRZe0XA+zgcfVJOzEGjHh0Lpc1OYhAxpv+EfD82aRrBNAbdsIPXNwwzUr6q7D8obGM+05C9Zg/baG0q6S/hjTnhaHsgWzC+ETlaHzkjvYky3+MOMe221fRPNdF2Z2tum19PlhbnAncirtTCNKz+Pg8366ezwQ43qNcxharP5Ncf/GzJ+n2s4DV4AlY/ivUoAQIx/R6iXkjA+pCGT79ysKnMC545nvvVWsgZEuXAN1VMYZnsX2GM/wOTetYU82LcJ7dz5W2CqtWPzvm8Wj15HU2jPQaX+p1yDPeRfFSXTi3DdbVXQjFT863eTiRM+z8CrqGRNpadN+Ep6bsw==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
        'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
        'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
        'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
        'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
        'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
        'RwIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 492,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: 'c8eeac2ba20f4a598f4acca768853c5f',
      senderSignature: 'DwvMrMHMxo8dMa5IarBLP6lU1HDke1qy3VhTPUO5tFgIVQ6PfSyBph8ipb2rJs3nTASScXBn5ayEiuKtALaD8LLMAjnQS47FfVdsc+jf0+eptrY+bg/qADbCi0XbX0gXNC96Ii47KyNgqm/FTJcVoDYQRlfDm82f0w1Fi3oqXXtxouaeDLa6cA3JzWmzvPntfLfetplzg/YaOoTtU70/yfNiQ3UVp1KFOgXm5hvTL+HD9tmdxPgy8Rm7iLZwPGBATvG46gB0yNQWDWrliZp58QDlMzEs0RqA1ACrlMpcoGIXEldnZV6w8IU8eHPQ59hDjCXBqxYr7jOc8NuoAxobdw==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 721,
      sender: 'Bob',
      recipient: 'Alice',
      tx_id: '37ff17e501b941a6a4b83c9761912479',
      senderSignature: 'RFt3FS3xYFJsEwLpW95yFla6FDFJhF3qP5Q8ELQaL3P3jRtMv7mdFbRceGTWo0uQ7e5c04+BHZQdenvl3zNVJ6ObSM/ZNkxssbzRknab3G6+wzzcnqZ+52vj5Kv0PPOTzlIVw3fHd4uR9JBrISXTYM3WYAXoAPq0YEUQoEKtgA4TwWnggK4NwfhVfG4kkZeG9CBGZtWZKddrwkn0BXrbtuq1NaEb0eBqAHqswPXgo9mD3FqnG6AunCOT/NCP+7el8kjeT9EG4K1DtN0kZhUxDX1VU1zOWDYRhQB7QU9PqOp+Ykm7wFDZ9m9bNK1CemF0oOIQzt6atxBBaZxAJgoXWw==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
        'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
        'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
        'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
        'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
        'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
        'RwIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    }
  ],
  prevHash: '000bcc862c34aa0b244ad82f7bf6f74dfbd32e75909d11263e9350104e7737b0',
  hash: '0008dfb8f25af4e47d19a2386be26988d360b679edf8811f1a33e59bc03f246f',
  nonce: 11707,
  merkleRoot: '83ba16833bca2c6246d9fbc45a777fee559f3339fbe2b38204ace21ffee10495',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
    'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
    'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
    'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
    'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
    'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
    'RwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 9,
  timestamp: 1718242777,
  transactions: [
    {
      amount: 45,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: '0a68ad5ab13a447ba0f8dac9c51f1c57',
      senderSignature: 'SycXuwZI3/qETFzupY0J7HzXsfY+TyMwCXMXFwsTkaAZuGVPkF262PGt+rxssmDpdiC1edo0IY27Y+12VeyRVKmbmUcJ22BpqWS8ioI7OUl6tyUPOgJTHAbUP/f+29q0LkBpLFmdDu+SuCYxaBGX4pjHtN9eLS0xS2Y92U+0IFiLLVq0oqXz34zuokIYJPm+x2cVgWvfSmxcTLGYUbFe8xxNeU4mgM5TPxeDY9KTdB0Y0R6PocZYAVjBYvYdkBHANh2yNrA2xpmUZOAZ3quBOi/n4YCahcJ3Da1QYcpKhkY+j/VUIq+Ptnq9B2XP61OsGt4xscwjf9j85ZnuuWwmKw==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    }
  ],
  prevHash: '0008dfb8f25af4e47d19a2386be26988d360b679edf8811f1a33e59bc03f246f',
  hash: '00027e120248a9fd0cc098e71b5fd285f624a60ca6623d159fa2d644ea3ff43d',
  nonce: 4121,
  merkleRoot: '08020ec354be9c2145597211c005400402b461265c0d617236b8cf98d6f0e168',
  difficulty: 3,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
    'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
    'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
    'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
    'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
    'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
    'RwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 10,
  timestamp: 1718242778,
  transactions: [
    {
      amount: 345,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: '367290c3b49d4e1e9f7d12679e93ecd4',
      senderSignature: 'Sk4B5d3pr+1H8krAamAPA6j8y6B8LrAuyb8NUNzSwu6OsyVPhCutUgAW04vFwoXEy4aQFZMXsPKJLH3bEbHmzdCR2tdpZ6TyG8Rrb6Ju79r+Qhfg5d/U8gDBhIrwbnWqmB08bFDp9wXAhinE30JMssSjcDJKTeMDgc/o4FLzpLWKd+3cI1JN2+HeMeWc1SjUUj1s2zLRylIxQPqHjFz6zJgeREBKxfnq+5jkoJnYosoEEJhEBvkHoTDG1GIdqfP67K2vOqu1hJiVh+9Uo21fycrPXPtqt/O8sMYRIKWZ7XdDummNArjOaSaUYItzda+F64H8LZIm0q8N95EAT1Q4Lg==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 719,
      sender: 'Bob',
      recipient: 'Alice',
      tx_id: '222dcfeb33874347b366a2d079144895',
      senderSignature: 'LsdAm6/8bF5f2Q13W1kthRXuDcQoW8psDPniPQvHcl9sHI62AnJisb0eZGjjMhacwTnaCh7h5wYfunTsvLODc4lNRDFf98tGTMTcqW7KN3yGVjilxZoPk76Z0NSX10BVeSj+AYiXCZe/NlYhLYXsUusKad3ncWBfjYQ55ZSpsfD/OcFzQgrEeclRuhqw7onjnJAigMBeRCK+qMsINdUn4pQLA89q+r+VyldvyVm/JE4pvubynd3bJxFy8yproLKHBJopSOklVmAsNnwF8ZH+0yb4IlrSX+IIcUB9OoLudXnJzYNxT92ztA1eGeHPARuCI7fNYvZX3G9ilzT5JSk5Mg==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
        'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
        'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
        'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
        'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
        'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
        'RwIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 806,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: '11550f2c98664d1ba4446f881924d206',
      senderSignature: 'Aq9frZjVn03HRCR++tpsEEO+T87N3IODtYd14jfZAsvO4eyyahaFsB3hOq1r1u2soYQoRttAueX7iQkxJwGtM99/kc1ArP79HVO56Nbvx3va37HPvAXFyb+x9dCJwmPzIep1IwByhaALvpDEv6la+I9WjUSHgO01PouevvurSxzPfDaRYZV43lOgeB1ghjdOz7bFqaZszrrYoHOgzux6wE0FZFJ6t+oGxZw8hWNYAcvcQp04haW/CZp+uzRf6fBE7rE9/gb0A0CY1U30xoP3AZ1V1LOv3wgeBiLH8BCkQNzdwjPpwa5LXfw9BIg6AtL2gy5XwuE9H8NvrGLibp+tpg==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    }
  ],
  prevHash: '00027e120248a9fd0cc098e71b5fd285f624a60ca6623d159fa2d644ea3ff43d',
  hash: '000076306cf27ee440e325b5e787272529061583a2f74e45628be7c3285ad60a',
  nonce: 41431,
  merkleRoot: '4760b6639856425cd20268938261cef4932a1b80e2e99b621e55a9141473a084',
  difficulty: 4,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
    'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
    'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
    'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
    'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
    'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
    'RwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
{
  index: 11,
  timestamp: 1718242778,
  transactions: [
    {
      amount: 632,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: 'eca8fa306a294d84b05af332c9248fbb',
      senderSignature: 'c0cJflCKeX8ETpz43DjKzEAXgbIoRcSYxRrwe/r9l2s8fWEKKJrmHW+4ZARtEZjq3kjJXQBZSOXi1qgncw4G/hj9Us7hDFvIKAXlyuC9Z85jDq9mOnGipLr1Y7P2lB3R+03iQDvc10V4BAmcUwC1Yib2RLwBBKRpKzMecxn+oDBN8YA3BTEyFTvChI+8QBjczYApFsPpyeI6gZTxcp3NOquqH0hL/PJAYpNdoVag7tTSJ2eHL+wj+LipnAPV8CKcLbqmxAUpSAhG5ziTbJzm9W5nkPZv71MJsvxlHSTI/StUe1TPx4DNkLDTE/Hx3bJn04/+1rPAW/ewjHUaVY9w7Q==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 539,
      sender: 'Bob',
      recipient: 'Alice',
      tx_id: '21939212e44f4b90a0d4c8b6ae734546',
      senderSignature: 'XAr0AuqplkTzHrHELXeLH7M/NgX+UXma5KgldhTP4X+fcfLBxHijTJYGyyx/jw8Tdvz0U8E1aLQNypqspPjXw7vQXzB1MFwPi4AoNVEfmO6a8O+GImnXHth4owC9CPFZ4aOqBPg/48VvySxI34m+r2BvD21S1o18ElIQkqoeP27vlcztZZDmFnypQUitp3cPPKf6ReSzrRQGUZZyvrqshEplGOE/fuI8eH7jL6B50iUdaDHiTnblly2A61Oadb6HoGF1vNaJtrIboL1OBRk8Qzy0Wyg0X5ZCdK1ZNIZlperRuM3UJ8SYOxaTNfm+fXPZcM1btViFTMx+ax+soq0OdQ==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
        'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
        'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
        'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
        'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
        'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
        'RwIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    },
    {
      amount: 127,
      sender: 'Alice',
      recipient: 'Bob',
      tx_id: '7becd89367874b278fd853c7dc97d07e',
      senderSignature: 'AsBI52GO2Zziv0puLUBdlhWuiOavrTGyI8u98/9Enmt4/qbePrUc2Y/UHlnrDxfzHn2vAOniC26Pl9/PNPBThkE0DRoTMueSyza/jR4fK8SpRml3pvF4SLNHN+AMgozK76I8v/B8z4Td7KgVLsDiyfO4yVqfh+1zdrPUKlgFJcv//KWovN+rD8xmVqqvUW548mOLgs6kZNoGBrVF5IGc2JxstG79SH/VnQcF9PAgUE0/gZ5S+ijkDzALw3dINFJ22VqMjfCMljTZBWj9DAvDGDMadatJiTAlFqTmx9KnOe4ZUHpaG711KaSCtNPcVjVXEy+jHCxuHaeLv7NZnezedw==',
      senderPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNVr68pcRFhDRF9dCDL1\r\n' +
        'u3NmjLIyoap66fjdS4IY6cnfSJkz7+nlCgrBW/TJw2Iju/+FXJv8kS1UMmx3ce5C\r\n' +
        '5jplylsGqO/xj2E7unxhhVA8X++K9XA67r8CADsuwNK48QV8b3FBPP7x0G35X982\r\n' +
        'H9bULOq9hDpSyIW/fLRz+T/MCkZ2VuYBIMJg7Y3eHWxI4QxmPPXs7ER37sWFvZeg\r\n' +
        'UUylk6q9ZcWyXhquaRl1npSQlfZfGYcV8J1X77hI1arnTJY5artLPh/xgZLxH6Qj\r\n' +
        'rmzES36kv3eJFCWEhhN7YsYYsngPfG9H2gL14gm+PAqKSKvSPaZvF4yP8x3tQAUR\r\n' +
        'tQIDAQAB\r\n' +
        '-----END PUBLIC KEY-----\r\n'
    }
  ],
  prevHash: '000076306cf27ee440e325b5e787272529061583a2f74e45628be7c3285ad60a',
  hash: '0000318d7b99fb626e4fbf64d0b74d216fe922bc6742a9430f3e542809de2f54',
  nonce: 40713,
  merkleRoot: '042215026317d014f62167dfa2cb4b071e73a89ac77895bb8cc381cafafe46d3',
  difficulty: 4,
  minerPublicKey: '-----BEGIN PUBLIC KEY-----\r\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQiq5MvOdB25Nxj4HGCI\r\n' +
    'tCYi+zWxXutRgub6+2EgbpBHKO26DO3O7wxBQgxBCFavHmRGc7gPHM1Z+UPRYa63\r\n' +
    'vfqjzFuSBFXiLpzx4R6mhcoyjbQpAvkAeVRvzqNzVE0LoruV0JMq3t99TLD5ekMa\r\n' +
    'QEXb4ZEv+g9wHylRu9O2PEhFHgY8Yd0xfgVjsnVHZLIrODja+P6vJpd1nD3IxnKW\r\n' +
    'cfAK3LP/Py8VxIUhCqlghZu9jKp+WwtbM/BdmGI1lAAJjLckxNm60YUrlesLXeSq\r\n' +
    'KgeFJBOsPA0a7rAJYcXw7oQi802xyq8KBJWXrbvrm5xn68d4OkCTb0A7HAYRPmE2\r\n' +
    'RwIDAQAB\r\n' +
    '-----END PUBLIC KEY-----\r\n'
}
```
