const { ethers } = require('ethers');
const provider = new ethers.getDefaultProvider();
const random = require('./randomNumber');

const fs = require('fs');

// Could throw and should probably be handled.
const j = fs.readFileSync('wallet.json', 'utf8');
const w  = await new ethers.Wallet.fromEncryptedJson(j, process.env.PASS);
const ip = new ethers.providers.InfuraProvider('ropsten', process.env.INFURA_API);
const wallet = w.connect(ip);

const requestRandom = require('../utils/requestRandom.js')(wallet);
const waitRandom = require('../utils/waitRandom.js')(wallet);

module.exports = {
  name: 'bet',
  description: 'place a bet',
  async execute(message, args) {
		const coin = args[0];
    console.log(coin);
		if (coin === 'heads' || coin === 'tails') {
			message.channel.send(`You have placed a bet on ${coin}!`);
		} else {
			message.channel.send(
				'your bet choice was not valid. Chose heads or tails'
			);
			return;
		}

		try {
			const {txHash} = await requestRandom();
			message.channel.send(`requested randomness: https://ropsten.etherscan.io/tx/${txHash} - this might take a while`);
		} catch (err) {
			console.log(err.err);
			message.channel.send(err.message);
			return
		}

		waitRandom().then(({txHash, num}) => {
			message.channel.send(`Got randomness: https://ropsten.etherscan.io/tx/${txHash} - ${num.toString()}`);

			const isOdd = num.mod(2).eq(1);

			if (coin === 'heads' && !isOdd) {
				message.channel.send('The coin lands on heads, you win !');
			} else if (coin === 'heads' && isOdd) {
				message.channel.send('The coin lands on tails... you lose !');
			} else if (coin === 'tails' && !isOdd) {
				message.channel.send('The coin lands on heads... you lose !');
			} else if (coin === 'tails' && isOdd) {
				message.channel.send('The coin lands on heads... you win !');
			}
		}).catch(err => {
			message.channel.send(`could not get randomness :(`);
		});

	},
};
