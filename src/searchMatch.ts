import { searchMatchPositions } from "./searchMatchPositions";
import { IHasAMatch } from "./types";

async function searchMatch({
    text,
    pattern,
    hasCaseSensitive = false,
    hasMatchOnlyWords = false
  }: IHasAMatch): Promise<boolean> {
    const resultIndices = await searchMatchPositions({
      text: text,
      pattern: pattern,
      hasCaseSensitive: hasCaseSensitive,
      hasMatchOnlyWords: hasMatchOnlyWords,
      maxMatchCount: 1,
    });
    return resultIndices.length > 0;
  }

export {searchMatch}