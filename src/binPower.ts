import {IBinPow} from "./types";

async function binPower({base, power, mod}: IBinPow): Promise<number> {
  let result: number = 1;
  while (power) {
    if (power % 2) {
      result = (result * base) % mod;
    }
    base = (base * base) % mod;
    power = Math.floor(power / 2);
  }
  return result;
}

export {binPower};
