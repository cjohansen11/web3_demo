// Require web3
const Web3 = require('web3')

// Import contract object from the compile script
const contractFile = require('./compile.js')

// Import private key to sign transaction
const { deployKey, primaryAdd, infura } = require('./config.js')

// Seperate the bytecode and the abi data
const bytecode = contractFile.evm.bytecode.object
const abi = contractFile.abi

// Create new web3 instance utilizing Infura as our "node"
let web3 = new Web3(infura)


// Deployment script
const deploy = async () => {

  console.log(`Attempting to deploy from account ${primaryAdd}`)
  const lottery = new web3.eth.Contract(abi)

  console.log('Deploying contract')
  const lotteryTx = lottery.deploy({
    data: bytecode
  });

  console.log('Creating transaction')
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
    from: primaryAdd,
    data: lotteryTx.encodeABI(),
    gas: 1500000
    },
    deployKey
  );

  console.log('Awaiting signed transaction')
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  )

  console.log(`Contract deployed at address ${createReceipt.contractAddress}`)
}

deploy()