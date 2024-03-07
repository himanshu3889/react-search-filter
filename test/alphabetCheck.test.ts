import {isUpperCaseAlphabet, isLowerCaseAlphabet} from "../src/alphabetCheck";

describe("check if alphabet is uppercase", () => {
  it("check with upper case alphabet", () => {
    const char = "A";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(true);
  });

  it("check with lower case alphabet", () => {
    const char = "Z";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(true);
  });

  it("check with upper case alphabet", () => {
    const char = "a";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with lower case alphabet", () => {
    const char = "z";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with special character", () => {
    const char = "$";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with special character", () => {
    const char = "_";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with numeric character", () => {
    const char = "5";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with empty string", () => {
    const char = "";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with non-alphabetic special character", () => {
    const char = "%";
    const asciiValue = char.charCodeAt(0);
    expect(isUpperCaseAlphabet(asciiValue)).toBe(false);
  });
});

describe("check if alphabet is lowercase", () => {
  it("check with upper case alphabet", () => {
    const char = "A";
    const asciiValue = char.charCodeAt(0);
    expect(isLowerCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with lower case  alphabet", () => {
    const char = "Z";
    const asciiValue = char.charCodeAt(0);
    expect(isLowerCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with upper case alphabet", () => {
    const char = "a";
    const asciiValue = char.charCodeAt(0);
    expect(isLowerCaseAlphabet(asciiValue)).toBe(true);
  });

  it("check with lower case alphabet", () => {
    const char = "z";
    const asciiValue = char.charCodeAt(0);
    expect(isLowerCaseAlphabet(asciiValue)).toBe(true);
  });

  it("check with special character", () => {
    const char = "$";
    const asciiValue = char.charCodeAt(0);
    expect(isLowerCaseAlphabet(asciiValue)).toBe(false);
  });

  it("check with special character", () => {
    const char = "_";
    const asciiValue = char.charCodeAt(0);
    expect(isLowerCaseAlphabet(asciiValue)).toBe(false);
  });
});
