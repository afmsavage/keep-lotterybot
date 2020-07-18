
const { ethers } = require('ethers');
const provider = new ethers.getDefaultProvider();
const random = require('./randomNumbers');

module.exports = {
  name: 'bet',
  description: 'place a bet',
  async execute(message, args) {

    if(args === 'heads' || args === 'tails'){
    message.channel.send(`You have placed a bet on ${args}!`);

    const response = await random();

    if(args === 'heads' && (response % 2 === 0)) {
    message.channel.send('The coin lands on heads, you win !');
    }

    else if (args === 'heads' && (response % 2 === 1)){
    message.channel.send('The coin lands on tails... you lose !');
    }

    else if(args === 'tails' && (response % 2 === 0)){
    message.channel.send('The coin lands on heads... you lose !');
    }

    else if(args === 'tails' && (response % 2 === 1)){
    message.channel.send('The coin lands on heads... you win !');
    }

    }

    else{
    message.channel.send('your bet choice was not valid. Chose heads or tails');
    }
}
};