import {RollingSearch} from "../src/searchEngine";

describe("searchMatchPositions functionality", () => {
  it("search the pattern no case sensitive indices result", async () => {
    const array = [
      {text: "hello world"},
      {text: "this is another way World_"},
      {text: "worlds Worlds woldS hi worLdS"},
    ];
    const searchEngine = new RollingSearch(array);
  it("search the pattern no case sensitive indices result", async () => {
    const array = [
      {text: "hello world"},
      {text: "this is another way World_"},
      {text: "worlds Worlds woldS hi worLdS"},
    ];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.search({pattern: pattern});
    expect(result).toEqual([0, 1, 2]);
  });

  it("search the pattern case sensitive indices result", async () => {
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.search({
      pattern: pattern,
      hasCaseSensitive: true,
    });
    expect(result).toEqual([]);
  });

  it("search the pattern only word indices result", async () => {
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.search({
      pattern: pattern,
      hasMatchOnlyWords: true, // TODO: NEED TO SET IT TO FALSE
    });
    expect(result).toEqual([0]);
  });

  it("search the pattern only word indices result on particular fields", async () => {
    const array = [{text: "hello worlD", tags:"hello"}, {text: "this is another way World_", tags:"world"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.search({
      pattern: pattern,
      hasMatchOnlyWords: true,
      searchFields: ["tags"]
    });
    expect(result).toEqual([1]);
  });

  it("search the pattern only word and case sensitive indices result", async () => {
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.search({
      pattern: pattern,
      hasCaseSensitive: true,
      hasMatchOnlyWords: true,
    });
    expect(result).toEqual([]);
  });

  it("search the pattern only word only match indices result", async () => {
    const array = [{text: "hello worlD", tags:"hello"}, {text: "this is another way World_", tags:"world"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.search({
      pattern: pattern,
      hasMatchOnlyWords: true,
      onlyMatchIndices: false,
    });
    expect(result).toEqual([{text: true, tags:false}, {text: false, tags:true}]);
  });

  it("search the pattern only word only match indices indices result with max object 2 at a time", async () => {
    const array = [
      {text: "hello worlD woRld World world"},
      {text: "this is another way World_"},
      {text: "this is world of WORLDS_"},
      {text: "world only"},
      {text: "another world"},
    ];
    const searchEngine = new RollingSearch(array, 2);
    const pattern = "world";
    async function search() {
      const result = await searchEngine.search({
        pattern: pattern,
        hasMatchOnlyWords: true,
        onlyMatchIndices: true,
      });
      return result;
    }
    const result1 = await search();
    expect(result1).toEqual([0, 2]);

    const result2 = await search();
    expect(result2).toEqual([3, 4]);
  });

  it("search the pattern only word result with max object 2 at a time", async () => {
    const array = [
      {text: "hello worlD woRld World world"},
      {text: "this is another way World_"},
      {text: "this is world of WORLDS_"},
      {text: "world only"},
      {text: "another world"},
    ];
    const searchEngine = new RollingSearch(array, 2);
    const pattern = "world";
    async function search() {
      const result = await searchEngine.search({
        pattern: pattern,
        hasMatchOnlyWords: true,
        onlyMatchIndices: false,
      });
      return result;
    }
    const result1 = await search();
    expect(result1).toEqual([{text: true}, {text: false}]);
    
    const result2 = await search();
    expect(result2).toEqual([{text: true}, {text:true}]);

    const result3 = await search();
    expect(result3).toEqual([{text: true}]);
  });

  it("search the pattern no case sensitive", async () => {
    const array = [{text: "hello world"}, {text: "this is another way World_"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      pattern: pattern,
    });
    expect(result).toEqual([{text: [6]}, {text: [20]}]);
  });

  it("search the pattern case sensitive", async () => {
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      pattern: pattern,
      hasCaseSensitive: true,
    });
    expect(result).toEqual([{text: []}, {text: []}]);
  });

  it("search the pattern only word", async () => {
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.searchPositions({
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
      pattern: pattern,
      hasCaseSensitive: true,
      hasMatchOnlyWords: true,
    });
    expect(result).toEqual([]);
  });

  it("search the pattern only word with max match 0", async () => {
    const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      pattern: pattern,
      hasMatchOnlyWords: true,
      maxMatchCount: 0,
    });
    expect(result).toEqual([{text: []}, {text: []}]);
  });

  it("search the pattern only word with max match 2", async () => {
    const array = [
      {text: "hello worlD woRld World world"},
      {text: "this is another way World_"},
    ];
    const searchEngine = new RollingSearch(array);
    const pattern = "world";
    const result = await searchEngine.searchPositions({
      pattern: pattern,
      hasMatchOnlyWords: true,
      maxMatchCount: 2,
    });
    expect(result).toEqual([{text: [6, 12]}, {text: []}]);
  });

  it("search the pattern only word with max object search match 2 at a time", async () => {
    const array = [
      {text: "hello worlD woRld World world"},
      {text: "this is another way World_"},
      {text: "this is world of WORLDS_"},
      {text: "world only"},
      {text: "another world"},
    ];
    const searchEngine = new RollingSearch(array, 2);
    const pattern = "world";
    async function searchPattern() {
      const result = await searchEngine.searchPositions({
        pattern: pattern,
        hasMatchOnlyWords: true,
        maxMatchCount: 2,
      });
      return result;
    }
    const result1 = await searchPattern();
    expect(result1).toEqual([{text: [6, 12]}, {text: []}]);
    const result2 = await searchPattern();
    expect(result2).toEqual([{text: [8]}, {text: [0]}]);
    const result3 = await searchPattern();
    expect(result3).toEqual([{text: [8]}]);
  });
});
