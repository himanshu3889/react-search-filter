import {searchMatchPositions} from "./searchMatchPositions";
import {IRollingSearchPositions, IRollingSearch} from "./types";
import {searchMatch} from "./searchMatch";

const INFINITY: number = 1000000007;

class RollingSearch {
  // TODO: Implement the excludeSearchFields also
  async search({
    array,
    searchFields,
    pattern,
    boolArrayResult = true,
    hasCaseSensitive = false,
    hasMatchOnlyWords = false,
  }: IRollingSearch): Promise<{[key: string]: boolean}[] | boolean[]> {
    const result: {[key: string]: boolean}[] = [];
    const indicesBoolResult: boolean[] = [];
    for (const object of array) {
      const objectResult: {[key: string]: boolean} = {};
      let objectBoolOrResult = false;
      if (searchFields != null) {
        // If searchFields is provided
        for (const field of searchFields!) {
          const text: any = (object as {[key: string]: any})[field];
          if (typeof text !== "string") {
            continue;
          }
          const currResult: boolean = await searchMatch({
            text: text,
            pattern: pattern,
            hasCaseSensitive: hasCaseSensitive,
            hasMatchOnlyWords: hasMatchOnlyWords,
          });
          if (boolArrayResult === false) {
            objectResult[field] = currResult;
          } else {
            objectBoolOrResult ||= currResult;
          }
          if (objectBoolOrResult === true) {
            break;
          }
        }
      } else {
        // If searchFields are not provided, search on all fields of each respective object
        for (const field of Object.keys(object)) {
          const text: any = (object as {[key: string]: any})[field];
          if (typeof text !== "string") {
            continue;
          }
          const currResult: boolean = await searchMatch({
            text: text,
            pattern: pattern,
            hasCaseSensitive: hasCaseSensitive,
            hasMatchOnlyWords: hasMatchOnlyWords,
          });
          if (boolArrayResult === false) {
            objectResult[field] = currResult;
          } else {
            objectBoolOrResult ||= currResult;
          }
          if (objectBoolOrResult === true) {
            break;
          }
        }
      }
      if (boolArrayResult === false) {
        result.push(objectResult);
      } else {
        indicesBoolResult.push(objectBoolOrResult);
      }
    }
    if (boolArrayResult) {
      return indicesBoolResult;
    }
    return result;
  }

  async searchPositions({
    array,
    searchFields,
    pattern,
    hasCaseSensitive = false,
    maxMatchCount = INFINITY,
    hasMatchOnlyWords = false,
  }: IRollingSearchPositions): Promise<{[key: string]: number[]}[]> {
    const result: {[key: string]: number[]}[] = [];
    for (const object of array) {
      const objectResult: {[key: string]: number[]} = {};
      if (searchFields != null) {
        // If searchFields is provided
        for (const field of searchFields!) {
          const text: any = (object as {[key: string]: any})[field];
          if (typeof text !== "string") {
            continue;
          }
          const resultIndices: number[] = await searchMatchPositions({
            text: text,
            pattern: pattern,
            hasCaseSensitive: hasCaseSensitive,
            maxMatchCount: maxMatchCount,
            hasMatchOnlyWords: hasMatchOnlyWords,
          });
          objectResult[field] = resultIndices;
        }
      } else {
        // If searchFields are not provided, search on all fields of each respective object
        for (const field of Object.keys(object)) {
          const text: any = (object as {[key: string]: any})[field];
          if (typeof text !== "string") {
            continue;
          }
          const resultIndices: number[] = await searchMatchPositions({
            text: text,
            pattern: pattern,
            hasCaseSensitive: hasCaseSensitive,
            maxMatchCount: maxMatchCount,
            hasMatchOnlyWords: hasMatchOnlyWords,
          });
          objectResult[field] = resultIndices;
        }
      }
      result.push(objectResult);
    }
    return result;
  }
}

export {RollingSearch, INFINITY};
