const { ethers } = require('ethers');
const provider = new ethers.getDefaultProvider();
const random = require('./randomNumber');

module.exports = {
  name: 'bet',
  description: 'place a bet',
  async execute(message, args) {
    console.log(args[0]);
    const response = Math.floor(Math.random() * 10);
    // const response = await random();
    if (args[0] === 'heads' || args[0] === 'tails') {
      message.channel.send(`You have placed a bet on ${args[0]}!`);

      if (args[0] === 'heads' && response % 2 === 0) {
        message.channel.send('The coin lands on heads, you win !');
      } else if (args[0] === 'heads' && response % 2 === 1) {
        message.channel.send('The coin lands on tails... you lose !');
      } else if (args[0] === 'tails' && response % 2 === 0) {
        message.channel.send('The coin lands on heads... you lose !');
      } else if (args[0] === 'tails' && response % 2 === 1) {
        message.channel.send('The coin lands on heads... you win !');
      }
    } else {
      message.channel.send(
        'your bet choice was not valid. Chose heads or tails'
      );
    }
  },
};
