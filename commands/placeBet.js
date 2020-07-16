
const { ethers } = require('ethers');
const provider = new ethers.getDefaultProvider();

module.exports = {
  name: 'bet',
  description: 'place a bet',
  async execute(message) {
    message.channel.send(
      `You have placed a bet and ${result}!`
    );
  },
};
