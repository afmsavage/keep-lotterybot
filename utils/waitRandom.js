const ethers = require('ethers');

const RandomBeaconImpl = require("@keep-network/keep-core/artifacts/KeepRandomBeaconServiceImplV1.json")
const RandomBeaconService = require("@keep-network/keep-core/artifacts/KeepRandomBeaconService.json")

module.exports = (wallet) => { // returns object with transaction hash
	return async () => {
		const serviceContract = new ethers.Contract(RandomBeaconService.networks["3"].address, RandomBeaconImpl.abi, wallet);

		const ret = new Promise((res, rej) => {
			serviceContract.on("*", function (ev) {
				if (ev.event === 'RelayEntryGenerated') {
					console.log(`[https://ropsten.etherscan.io/tx/${ev.transactionHash}] generated ${ev.args[0]}`);
					serviceContract.removeAllListeners();
					res({txHash: ev.transactionHash, num: ev.args[1]});
				}
			});
		});

		return ret;
	}
}

