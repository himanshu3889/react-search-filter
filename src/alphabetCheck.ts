function isUpperCaseAlphabet(ASCII: number): boolean {
    return 65 <= ASCII && ASCII <= 90;
  }
  
  function isLowerCaseAlphabet(ASCII: number): boolean {
    return 97 <= ASCII && ASCII <= 122;
  }

export {isUpperCaseAlphabet, isLowerCaseAlphabet}