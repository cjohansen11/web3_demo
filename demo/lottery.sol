//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Lottery {

  // State variables - An array of payable addresses for all players and the manager (deployer of the contract)
  address payable[] public players;
  address public manager;

  // Constructor - sets the manager variable to equal the address of the account that deployed the contract
  constructor() {
    manager = msg.sender;
  }

  // Modifers - These act as conditional statements that can be placed inside the delcaration of a new method
  modifier notManager() {
    require(msg.sender != manager, "The manager cannot play in this lottery");
    _;
  }

  modifier onlyManager() {
    require(msg.sender == manager, "Only the manager can view the balance");
    _;
  }

  modifier correctValue() {
    require(msg.value == 0.1 ether, "Please resubmit with 0.1 eth");
    _;
  }

  modifier enoughPlayers() {
    require(players.length >= 3, "Not enough players");
    _;
  }


  // Receive is a catch all for any Eth sent to the contract address
  // Without Receive or Fallback this address would not be able to receive funds and would result in an error to the sender
  receive() external payable notManager correctValue {
    players.push(payable(msg.sender));
  }

  // Basic get method. Returns the balance of this contract
  // Get method don't cost any Eth because no changes are occuring to the chain
  function getBalance() public view onlyManager returns(uint) {
    return address(this).balance;
  }

  // Helper method to create a random number (Not truly random due to the use of 'blocks' but works for now)
  function random() public view onlyManager returns(uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
  }

  // Method to pick the winner
  function pickWinner() public onlyManager enoughPlayers {

    // Creates new variable to hold the randomly generated number
    uint r = random();

    // Create new variable type of address to store the winner
    address payable winner;

    // Uses the random number and modulo to select the winner from the Players array
    winner = players[r % players.length];

    // Seperates the winnings - 10% to the manager and the remainder to the winner
    uint managerFee = (getBalance() * 10) / 100;
    uint winnerPrize = (getBalance() * 90) / 100;

    // Set the managers address to payable and transfers managerFee
    payable (manager).transfer(managerFee);

    // Sends prize money to the winner address
    winner.transfer(winnerPrize);

    // Resets the players array
    players = new address payable[](0);
  }
}