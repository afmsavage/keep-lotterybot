const ethers = require('ethers');

const RandomBeaconImpl = require('@keep-network/keep-core/artifacts/KeepRandomBeaconServiceImplV1.json');
const RandomBeaconService = require('@keep-network/keep-core/artifacts/KeepRandomBeaconService.json');

module.exports = (wallet) => {
  console.log(wallet);
  return async () => {
    const serviceContract = new ethers.Contract(
      '0x6c04499B595efdc28CdbEd3f9ed2E83d7dCCC717', // RandomBeaconService.networks['3'].address,
      RandomBeaconImpl.abi,
      wallet
    );

    let entryFee = ethers.utils.parseEther('0.1');
    try {
      entryFee = await serviceContract.entryFeeEstimate(0);
    } catch (err) {
      console.log(`could not get estimate ${err}`);
    }
    console.log(`estimated entry fee ${entryFee}`);

    try {
      const relayEntry = await serviceContract['requestRelayEntry()']({
        value: entryFee,
      });
      return { txHash: relayEntry.hash };
    } catch (err) {
      throw {
        err: err,
        message: `failed to request randomness, try again later`,
      };
    }

    // We could wait for the block but we don't have to.
    // const r = await relayEntry.wait();
    // console.log(`entry submitted`);
  };
};
