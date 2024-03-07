import {isUpperCaseAlphabet} from "./alphabetCheck";
import {binPower} from "./binPower";
import {INFINITY} from "./searchEngine";
import {
  IAddCharacterToHash,
  IMatchingPositions,
  IRemoveCharacterFromHash,
} from "./types";


function characterASCII(ch: string, hasCaseSensitive: boolean = false): number {
  const characterAscii = ch.charCodeAt(0);
  const isUpper = isUpperCaseAlphabet(characterAscii);
  if (isUpper && !hasCaseSensitive) {
    return characterAscii + 32;  // lowercase convert to uppercase
  }
  return characterAscii;
}


async function addCharacterToHash({
  hash,
  base,
  character,
  hasCaseSensitive,
  mod,
}: IAddCharacterToHash): Promise<number> {
  const charCode = characterASCII(character, hasCaseSensitive);
  return (((hash * base) % mod) + charCode) % mod;
}

async function removeCharacterFromHash({
  hash,
  basePowerK,
  character,
  hasCaseSensitive,
  mod,
}: IRemoveCharacterFromHash): Promise<number> {
  const charCode = characterASCII(character, hasCaseSensitive);
  return (mod + hash - (charCode * basePowerK) % mod) % mod;
}

async function searchMatchPositions({
  text,
  pattern,
  hasCaseSensitive = false,
  maxMatchCount = INFINITY,
  hasMatchOnlyWords = false,
}: IMatchingPositions): Promise<number[]> {
  const textLen: number = text.length;
  const patternLen: number = pattern.length;
  const resultIndices: number[] = [];

  const mod1: number = 9982443533;
  const base1: number = 31;
  const base1PowerK: number = await binPower({
    base: base1,
    power: patternLen,
    mod: mod1,
  });

  const mod2: number = 999999929;
  const base2: number = 29;
  const base2PowerK: number = await binPower({
    base: base2,
    power: patternLen,
    mod: mod2,
  });

  let patternHash1: number = 0;
  let patternHash2: number = 0;
  for (let patternIndex = 0; patternIndex < patternLen; patternIndex++) {
    patternHash1 = await addCharacterToHash({
      hash: patternHash1,
      base: base1,
      character: pattern[patternIndex],
      hasCaseSensitive: hasCaseSensitive,
      mod: mod1,
    });
    patternHash2 = await addCharacterToHash({
      hash: patternHash2,
      base: base2,
      character: pattern[patternIndex],
      hasCaseSensitive: hasCaseSensitive,
      mod: mod2,
    });
  }

  let textSubstrHash1: number = 0;
  let textSubstrHash2: number = 0;
  let textIndex: number = 0;
  while (textIndex < textLen) {
    textSubstrHash1 = await addCharacterToHash({
      hash: textSubstrHash1,
      base: base1,
      character: text[textIndex],
      hasCaseSensitive: hasCaseSensitive,
      mod: mod1,
    });

    textSubstrHash2 = await addCharacterToHash({
      hash: textSubstrHash2,
      base: base2,
      character: text[textIndex],
      hasCaseSensitive: hasCaseSensitive,
      mod: mod2,
    });

    if (textIndex - patternLen >= 0) {
      textSubstrHash1 = await removeCharacterFromHash({
        hash: textSubstrHash1,
        basePowerK: base1PowerK,
        character: text[textIndex - patternLen],
        hasCaseSensitive: hasCaseSensitive,
        mod: mod1,
      });
      textSubstrHash2 = await removeCharacterFromHash({
        hash: textSubstrHash2,
        basePowerK: base2PowerK,
        character: text[textIndex - patternLen],
        hasCaseSensitive: hasCaseSensitive,
        mod: mod2,
      });
    }
    const currMatchStartIndex = textIndex - patternLen + 1;
    const prevMatchStartIndex =
      resultIndices.length > 0
        ? resultIndices[resultIndices.length - 1]
        : -INFINITY;
    let addIndexToResult: boolean =
      currMatchStartIndex - prevMatchStartIndex >= patternLen &&
      textSubstrHash1 === patternHash1 &&
      textSubstrHash2 === patternHash2;

    addIndexToResult &&=
      !hasMatchOnlyWords ||
      ((currMatchStartIndex - 1 < 0 || text[currMatchStartIndex - 1] === " ") &&
        (textIndex + 1 >= textLen || text[textIndex + 1] === " "));

    if (addIndexToResult) {
      resultIndices.push(currMatchStartIndex);
    }
    if (resultIndices.length == maxMatchCount) {
      break;
    }
    textIndex += 1;
  }
  return resultIndices;
}


export {searchMatchPositions};
