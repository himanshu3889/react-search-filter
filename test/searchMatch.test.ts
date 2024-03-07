import {searchMatch} from "../src/searchMatch";

describe("Search pattern in the test", () => {
  it("should find the match case sensitively", async () => {
    const result = await searchMatch({
      text: "Hello World",
      pattern: "World",
      hasCaseSensitive: true,
      hasMatchOnlyWords: false,
    });
    expect(result).toBe(true);
  });

  it("should not find the match when case does not match", async () => {
    const result = await searchMatch({
      text: "Hello World",
      pattern: "world", // lowercase 'w'
      hasCaseSensitive: true,
      hasMatchOnlyWords: false,
    });
    expect(result).toBe(false);
  });

  it("should find the match ignoring case", async () => {
    const result = await searchMatch({
      text: "Hello World",
      pattern: "world", // lowercase 'w'
      hasCaseSensitive: false,
      hasMatchOnlyWords: false,
    });
    expect(result).toBe(true);
  });

  it("should match whole words only", async () => {
    const result = await searchMatch({
      text: "Hello World",
      pattern: "World",
      hasCaseSensitive: false,
      hasMatchOnlyWords: true,
    });
    expect(result).toBe(true);
  });

  it("should not match partial words only match words", async () => {
    const result = await searchMatch({
      text: "Hello Worldly",
      pattern: "World",
      hasCaseSensitive: false,
      hasMatchOnlyWords: true,
    });
    expect(result).toBe(false);
  });

  it("large text small pattern", async () => {
    const text = "a".repeat(100000) + "Z".repeat(100000) + "FindMe";
    const result = await searchMatch({
      text: text,
      pattern: "FindMe",
      hasCaseSensitive: false,
      hasMatchOnlyWords: false,
    });

    expect(result).toBe(true);
  }, 10000);

  it("some random text", async () => {
    const pattern = "hi".repeat(10);
    const text = "didid" + pattern + "didid" ;
    const result = await searchMatch({
      text: text,
      pattern: pattern,
      hasCaseSensitive: false,
      hasMatchOnlyWords: false,
    });

    expect(result).toBe(true);
  });

  it("large text large pattern", async () => {
    const pattern = "hi".repeat(10000);
    const text = "d" + pattern + "a".repeat(100000) + "Z".repeat(100000) + pattern;
    const result = await searchMatch({
      text: text,
      pattern: pattern,
      hasCaseSensitive: false,
      hasMatchOnlyWords: false,
    });

    expect(result).toBe(true);
  }, 10000);
});
