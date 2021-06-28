const Web3 = require('web3')
const { abi } = require('./compile')
const { contractAddress, primaryAdd, infura } = require('./config.js')

// Instantiating a new web3 instance
let web3 = new Web3(infura)

// Creating a new instance of the contract
const lottery = new web3.eth.Contract(abi, contractAddress)

const getBalance = async () => {
  console.log(`Making a call to contract at address ${contractAddress}`)
  const data = await lottery.methods.getBalance().call({ 'from': primaryAdd })
  console.log(`The current balance of this contract is ${web3.utils.fromWei(data, 'ether')} eth`)
}

getBalance()