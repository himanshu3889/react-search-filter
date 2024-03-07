import {searchMatchPositions} from "../src/searchMatchPositions";
import {INFINITY} from "../src/searchEngine";

describe("searchMatchPositions functionality", () => {
  it("should find the positions of the match case sensitively", async () => {
    const positions = await searchMatchPositions({
      text: "Hello World",
      pattern: "World",
      hasCaseSensitive: true,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: false,
    });
    expect(positions).toEqual([6]);
  });

  it("should not find the match when case does not match", async () => {
    const positions = await searchMatchPositions({
      text: "Hello World",
      pattern: "world", // lowercase 'w'
      hasCaseSensitive: true,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: false,
    });
    expect(positions).toEqual([]);
  });

  it("should find the positions of the match ignoring case", async () => {
    const positions = await searchMatchPositions({
      text: "Hello World",
      pattern: "world", // lowercase 'w'
      hasCaseSensitive: false,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: false,
    });
    expect(positions).toEqual([6]);
  });

  it("should find multiple matches within the text", async () => {
    const positions = await searchMatchPositions({
      text: "Hello World, World",
      pattern: "World",
      hasCaseSensitive: false,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: false,
    });
    expect(positions).toEqual([6, 13]);
  });

  it("should limit the number of matches found by maxMatchCount and match only words", async () => {
    const positions = await searchMatchPositions({
      text: "World, Hello World World, worLdworld, World World",
      pattern: "World",
      hasCaseSensitive: false,
      maxMatchCount: 2, // Limit to 2 matches
      hasMatchOnlyWords: true,
    });
    expect(positions).toEqual([13, 38]);
  });

  it("should match whole words only", async () => {
    const positions = await searchMatchPositions({
      text: "Hello Worldly",
      pattern: "World",
      hasCaseSensitive: false,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: true,
    });
    expect(positions).toEqual([]);
  });

  it("should not match partial words when hasMatchOnlyWords is true", async () => {
    const positions = await searchMatchPositions({
      text: "Hello Worldly",
      pattern: "World",
      hasCaseSensitive: false,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: true,
    });
    expect(positions).toEqual([]);
  });

  it("large text small pattern", async () => {
    const largeText = "a".repeat(100000) + "FindMe" + "a".repeat(100000);
    const positions = await searchMatchPositions({
      text: largeText,
      pattern: "FindMe",
      hasCaseSensitive: false,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: false,
    });

    expect(positions).toEqual([100000]);
  }, 10000);

  it("large text large pattern no word match no case sensitive", async () => {
    const pattern = "hi".repeat(10000);
    const largeText =
      "a".repeat(100000) + pattern + "Z".repeat(100000) + pattern;
    const result = await searchMatchPositions({
      text: largeText,
      pattern: pattern,
      hasCaseSensitive: false,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: false,
    });

    expect(result).toEqual([100000, 220000]);
  }, 10000);

  it("large text large pattern word match no case sensitive", async () => {
    const pattern = "hi".repeat(10000);
    const pattern2 = "hI".repeat(10000);
    const largeText =
      "a".repeat(100000) + pattern2 + "Z".repeat(100000) + " " + pattern2;
    const result = await searchMatchPositions({
      text: largeText,
      pattern: pattern,
      hasCaseSensitive: false,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: true,
    });

    expect(result).toEqual([220001]);
  }, 10000);


  it("large text large pattern no word match case sensitive", async () => {
    const pattern = "hi".repeat(10000);
    const pattern2 = "hI".repeat(10000);
    const largeText =
      "a".repeat(100000) + pattern2 + "Z".repeat(100000) + pattern + "h".repeat(100000);
    const result = await searchMatchPositions({
      text: largeText,
      pattern: pattern,
      hasCaseSensitive: true,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: false,
    });

    expect(result).toEqual([220000]);
  }, 10000);


  it("large text large pattern word match case sensitive", async () => {
    const pattern = "hi".repeat(10000);
    const pattern2 = "hI".repeat(10000);
    const largeText =
      "a".repeat(100000) + pattern2 + "Z".repeat(100000) + " " + pattern2;
    const result = await searchMatchPositions({
      text: largeText,
      pattern: pattern,
      hasCaseSensitive: true,
      maxMatchCount: INFINITY,
      hasMatchOnlyWords: true,
    });

    expect(result).toEqual([]);
  }, 10000);
});
