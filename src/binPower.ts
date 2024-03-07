import {IBinPow} from "./types";

async function binPower({base, power, mod}: IBinPow): Promise<number> {
  let result: bigint = BigInt(1);
  let baseBig: bigint = BigInt(base);
  let powerBig: bigint = BigInt(power);
  let modBig: bigint = BigInt(mod);

  while (powerBig > 0n) {
    if (powerBig & 1n) {
      result = (result * baseBig) % modBig;
    }
    baseBig = (baseBig * baseBig) % modBig;
    powerBig >>= 1n;
  }

  return Number(result);
}

export {binPower};
