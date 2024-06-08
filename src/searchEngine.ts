import {searchMatchPositions} from "./searchMatchPositions";
import {IRollingSearchPositions, IRollingSearch} from "./types";
import {searchMatch} from "./searchMatch";

const INFINITY: number = 4294967296; // 1 << 32

class RollingSearch {
  public array: Array<string | {[key: string]: any}>;
  public searchStartIndex: number;
  public maxObjectsToSearch: number;

  constructor(
    array: Array<string | {[key: string]: any}> = [],
    maxObjectsToSearch: number = 5
  ) {
    this.array = array;
    this.searchStartIndex = 0;
    this.maxObjectsToSearch = maxObjectsToSearch;
  }

  reset(maxObjectsToSearch: number, searchStartIndex: number = 0) {
    this.searchStartIndex = searchStartIndex;
    this.maxObjectsToSearch = maxObjectsToSearch;
  }

  // Return the result for which objects contain pattern with conditions
  async search({
    array = this.array,
    searchFields,
    pattern,
    onlyMatchIndices = true, // only the indices which contain pattern
    hasCaseSensitive = false,
    hasMatchOnlyWords = false,
  }: IRollingSearch): Promise<
    {[key: string]: boolean}[] | number[]
  > {
    const result: {[key: string]: boolean}[] = [];
    const indicesMatchOnlyResult: number[] = [];
    let matchObjectsFound: number = 0;

    // start from the index from where we left the search
    let currentIndex = this.searchStartIndex;
    const endIndex = this.searchStartIndex + this.maxObjectsToSearch - 1
    const arrayLength = array.length;
    while (currentIndex < arrayLength) {
      const object = array[currentIndex];
      const objectResult: {[key: string]: boolean} = {};
      let objectBoolOrResult = false;
      const fieldsToSearch = searchFields ? searchFields : Object.keys(object);
      for (const field of fieldsToSearch) {
        const text: any = (object as {[key: string]: any})[field];
        if (typeof text !== "string") {
          continue;
        }

        // Find the match in the current object of the array
        const currResult: boolean = await searchMatch({
          text: text,
          pattern: pattern,
          hasCaseSensitive: hasCaseSensitive,
          hasMatchOnlyWords: hasMatchOnlyWords,
        });

        // Set the object result
        if (onlyMatchIndices === false) {
          objectResult[field] = currResult;
        } else {
          objectBoolOrResult ||= currResult;
          if (objectBoolOrResult) {
            break;
          }
        }
      }

      if (objectBoolOrResult === true) {
        matchObjectsFound += 1;
      }

      if (!onlyMatchIndices) {
        result.push(objectResult);
      } else if (objectBoolOrResult === true) {
        indicesMatchOnlyResult.push(currentIndex);
      }

      // increment the current index for next iteration
      currentIndex++;
      
      // If found the max objects having pattern discontinue the search
      if (
        (!onlyMatchIndices && currentIndex > endIndex) ||
        (onlyMatchIndices && matchObjectsFound === this.maxObjectsToSearch)
      ) {
        break;
      }
    }
    this.reset(this.maxObjectsToSearch, currentIndex)
    if (onlyMatchIndices) {
      return indicesMatchOnlyResult;
    }
    return result;
  }

  async searchPositions({
    array = this.array,
    searchFields,
    pattern,
    hasCaseSensitive = false,
    maxMatchCount = INFINITY,
    hasMatchOnlyWords = false,
  }: IRollingSearchPositions): Promise<{[key: string]: number[]}[]> {
    const result: {[key: string]: number[]}[] = [];
    let matchObjectsFound = 0;

    // start from the index from where we left the search
    let currentIndex = this.searchStartIndex;
    const arrayLength = array.length;
    while (currentIndex < arrayLength) {
      const object = array[currentIndex];
      const objectResult: {[key: string]: number[]} = {};
      const fieldsToSearch = searchFields ? searchFields : Object.keys(object);
      for (const field of fieldsToSearch) {
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

      matchObjectsFound += 1;
      result.push(objectResult);

      // increment the current index for next iteration
      currentIndex++;

      // If found the max objects having pattern discontinue the search
      if (matchObjectsFound === this.maxObjectsToSearch) {
        break;
      }
    }
    this.reset(this.maxObjectsToSearch, currentIndex)
    return result;
  }
}

export {RollingSearch, INFINITY};
