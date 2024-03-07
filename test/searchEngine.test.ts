import {RollingSearch} from "../src/searchEngine";

describe("searchMatchPositions functionality", () => {
  it("search the pattern no case sensitive bool result", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello world"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.search({array: array, pattern: pattern});
    expect(result).toEqual([true, true]);
  });

  it("search the pattern case sensitive bool result", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.search({
      array: array,
      pattern: pattern,
      hasCaseSensitive: true,
    });
    expect(result).toEqual([false, false]);
  });

  it("search the pattern only word bool result", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.search({
      array: array,
      pattern: pattern,
      hasMatchOnlyWords: true,
    });
    expect(result).toEqual([true, false]);
  });

  it("search the pattern only word and case sensitive bool result", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.search({
      array: array,
      pattern: pattern,
      hasCaseSensitive: true,
      hasMatchOnlyWords: true,
    });
    expect(result).toEqual([false, false]);
  });

  it("search the pattern only word no bool result", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.search({
      array: array,
      pattern: pattern,
      hasMatchOnlyWords: true,
      boolArrayResult: false,
    });
    expect(result).toEqual([{text: true}, {text: false}]);
  });

  // Search the pattern

  it("search the pattern no case sensitive", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello world"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      array: array,
      pattern: pattern,
    });
    expect(result).toEqual([{text: [6]}, {text: [20]}]);
  });

  it("search the pattern case sensitive", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      array: array,
      pattern: pattern,
      hasCaseSensitive: true,
    });
    expect(result).toEqual([{text: []}, {text: []}]);
  });

  it("search the pattern only word", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      array: array,
      pattern: pattern,
      hasMatchOnlyWords: true,
    });
    expect(result).toEqual([{text: [6]}, {text: []}]);
  });

  it("search the pattern only word and case sensitive", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      array: array,
      pattern: pattern,
      hasCaseSensitive: true,
      hasMatchOnlyWords: true,
    });
    expect(result).toEqual([{text: []}, {text: []}]);
  });

  it("search the pattern only word with max match 0", async () => {
    const searchEngine = new RollingSearch();
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      array: array,
      pattern: pattern,
      hasMatchOnlyWords: true,
      maxMatchCount: 0,
    });
    expect(result).toEqual([{text: []}, {text: []}]);
  });

  it("search the pattern only word with max match 2", async () => {
    const searchEngine = new RollingSearch();
    const array = [
      {text: "hello worlD woRld World world"},
      {text: "this is another way World_"},
    ];
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      array: array,
      pattern: pattern,
      hasMatchOnlyWords: true,
      maxMatchCount: 2,
    });
    expect(result).toEqual([{text: [6, 12]}, {text: []}]);
  });
});
