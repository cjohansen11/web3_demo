
# Web3 Demo

This is a basic introduction to Web3. In this repo you'll be able to compile, deploy, and interact with a Smart contract on the Ethereum network

## Features

- Compile Smart Contract
- Deploy to your preferred Ethereum network
- Interact with the Smart Contract via NodeJS


## Installation

Navigate to the web3 folder and initialize with yarn

```bash
  yarn install
```

Then navigate to ./demo/

```bash
  Copy config.example.js
  Insert
    - Infura (or your preferred Provider) address
    - Primary account address and private key
    - Secondary account address and private key
    - Contract address once deployed
```


## Usage/Examples

Deployment (from web3 folder)

```javascript
    node demo/deploy.js
```

Retrieve contract balance (from web3 folder)

```javascript
    node demo/getBalance.js
```

Play lottery from secondary account (from web3 folder)

```javascript
    node demo/playLottery.js
```

Pick winner (from web3 folder && assuming 3 or more accounts have entered)

```javascript
    node demo/pickWinner.js
```

