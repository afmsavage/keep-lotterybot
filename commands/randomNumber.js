const fs = require('fs');
const ethers = require('ethers');

const RandomBeaconImpl = require('@keep-network/keep-core/artifacts/KeepRandomBeaconServiceImplV1.json');
const RandomBeaconService = require('@keep-network/keep-core/artifacts/KeepRandomBeaconService.json');

module.exports = async function random() {
  let wallet;
  try {
    const j = fs.readFileSync('wallet.json', 'utf8');
    const w = await new ethers.Wallet.fromEncryptedJson(j, process.env.PASS);
    const ip = new ethers.providers.InfuraProvider(
      'ropsten',
      process.env.INFURA_API
    );
    wallet = w.connect(ip);
    console.log(wallet);

    const serviceContract = new ethers.Contract(
      RandomBeaconService.networks['3'].address,
      RandomBeaconImpl.abi,
      wallet
    );
    const relayReqIdEv = serviceContract.filters.RelayEntryRequested(null);
      console.log(relayReqIdEv);
    serviceContract.on(relayReqIdEv, (e) => {
      console.log(`req id: ${e.toString()}`);
      serviceContract.once(
        serviceContract.filters.RelayEntryGenerated(null, null),
        (rid, num) => {
          console.log(rid.toString(), num.toString());
        }
      );
    });

    let entryFee = ethers.utils.parseEther('0.1');
    try {
      // currently broken?
      entryFee = await serviceContract.entryFeeEstimate(0);
    } catch (err) {
      console.log(`could not get estimate ${err}`);
    }

    console.log(`estimated entry fee ${entryFee}`);
    const relayEntry = await serviceContract['requestRelayEntry()']({
      value: entryFee,
    });
    console.log('waiting for entry');
    const r = await relayEntry.wait();
    //console.log(r);
  } catch (err) {
    console.error(`Could not get randomness: ${err.message}`);
    process.exit(1);
  }
}

// module.exports = random().catch((err) => {
//   console.error(err);
// });
