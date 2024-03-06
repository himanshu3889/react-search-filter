export type IBinPow = {
    base: number;
    power: number;
    mod: number;
  }
  
  export type IAddCharacterToHash = {
    hash: number;
    base: number;
    character: string;
    hasCaseSensitive: boolean;
    mod: number;
  }
  
  export type IRemoveCharacterFromHash = {
    hash: number;
    basePowerK: number;
    character: string;
    hasCaseSensitive: boolean;
    mod: number;
  }
  
  export type IMatchingPositions = {
    text: string;
    pattern: string;
    hasCaseSensitive?: boolean;
    maxMatchCount?: number;
    hasMatchOnlyWords?: boolean;
  }
  
  export type IHasAMatch = {
    text: string;
    pattern: string;
    hasCaseSensitive?: boolean;
    hasMatchOnlyWords?: boolean,
  }
  

  export type IRollingSearchPositions = {
    array: Array<string | { [key: string]: any }>
    searchFields?: string[];
    pattern: string;
    hasCaseSensitive?: boolean;
    maxMatchCount?: number;
    hasMatchOnlyWords?: boolean;
  }

  export type IRollingSearch = {
    array: Array<string | { [key: string]: any }>
    searchFields?: string[];
    boolArrayResult?: boolean;
    pattern: string;
    hasCaseSensitive?: boolean;
    hasMatchOnlyWords?: boolean;
  }