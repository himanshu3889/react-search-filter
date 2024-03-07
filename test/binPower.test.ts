import {binPower} from "../src/binPower";

describe("find the power using fast exponentiation", () => {
  it("large power check", async () => {
    const base = 10;
    const power = 13;
    const mod = 10;
    const result = await binPower({base: base, power: power, mod: mod});
    expect(result).toBe(0);
  });

  it("small power check", async () => {
    const base = 7;
    const power = 3;
    const mod = 10;
    const result = await binPower({base: base, power: power, mod: mod});
    expect(result).toBe(base ** power % mod);
  });

  it("large power with different base", async () => {
    const base = 5;
    const power = 20;
    const mod = 10;
    const result = await binPower({base: base, power: power, mod: mod});
    expect(result).toBe(base ** power % mod);
  });

  it("large power with small base", async () => {
    const base = 29;
    const power = 14;
    const mod = 999999929;
    const result = await binPower({base: base, power: power, mod: mod});
    expect(result).toBe(435483423);
  });

  it("large power with larger base and larger mod", async () => {
    const base = 2929292929;
    const power = 1414141414;
    const mod = 999999929;
    const result = await binPower({base: base, power: power, mod: mod});
    expect(result).toBe(40919289);
  });
});
