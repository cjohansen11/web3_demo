const Web3 = require('web3')
const { abi } = require('./compile')
const { deployKey, contractAddress, primaryAdd, infura } = require('./config.js')

// Instantiating a new web3 instance
let web3 = new Web3(infura)

// Creating a new instance of the contract
const lottery = new web3.eth.Contract(abi, contractAddress)

// Encode ABI method
const encodedABI = web3.eth.abi.encodeFunctionCall({
  inputs: [],
  name: 'pickWinner',
  outputs: [],
  type: 'function'
}, [])

const pickWinner = async () => {
  console.log(`Making a call to contract at address ${contractAddress}`)
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: primaryAdd,
      to: contractAddress,
      gas: 1500000,
      data: encodedABI
    },
    deployKey
  )
  web3.eth.sendSignedTransaction(createTransaction.rawTransaction)
    .once('sending', () => console.log('Sending transaction'))
    .once('sent', () => console.log('Transaction sent'))
    .once('transactionHash', (txHash) => console.log(`Transaction hash: ${txHash}`))
    .on('error', () => console.log(error.message))
    .then(receipt => console.log(receipt))
}

pickWinner()