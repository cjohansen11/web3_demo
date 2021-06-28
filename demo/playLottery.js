const Web3 = require('web3')
const { abi } = require('./compile')
const { playerKey, contractAddress, infura, playerAddress } = require('./config.js')

// Instantiating a new web3 instance
let web3 = new Web3(infura)

// No need to create an instance of the contract becauce of the recieve method

// Function to create a transaction with the contract
const playLottery = async () => {
  console.log(`Making a call to contract at address ${contractAddress}`)
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: playerAddress,
      to: contractAddress,
      value: web3.utils.toWei('0.1', 'ether'),
      gas: 1500000
    },
    playerKey
  )
  web3.eth.sendSignedTransaction(createTransaction.rawTransaction)
    .once('sending', () => console.log('Sending transaction'))
    .once('sent', () => console.log('Transaction sent'))
    .once('transactionHash', (txHash) => console.log(`Transaction hash: ${txHash}`))
    .on('error', () => console.log(error.message))
    .then(receipt => console.log(receipt))
  // const createReceipt = await web3.eth.sendSignedTransaction(
  //   createTransaction.rawTransaction
  // )
  // console.log(`Transaction was successful with has ${createReceipt.transactionHash}`)
}

playLottery()