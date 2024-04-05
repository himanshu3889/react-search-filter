
# Rolling Search

Rolling search uses the advanced algorithms to search the text pattern from the text data.


## Installation

Install my-project with npm

```bash
  npm install rolling-search
```
    
## Features

- Find the objects having the text pattern.
- Find the specific indices in objects where text pattern matches.


## Usage/Examples

```javascript
import {RollingSearch} from "../src/searchEngine";

const searchEngine = new RollingSearch();
const array = [{text: "hello worlD"}, {text: "this is another way World_"}];
const pattern = "world";
const result = await searchEngine.search({
    array: array,
    pattern: pattern,
    hasCaseSensitive: true,
    hasMatchOnlyWords: true,
});
// result = [false, false]



const array = [
      {text: "hello worlD woRld World world"},
      {text: "this is another way World_"},
    ];
const pattern = "world";
const result = await searchEngine.searchPositions({
    array: array,
    pattern: pattern,
    hasCaseSensitive:false,
    hasMatchOnlyWords: true,
    maxMatchCount: 2,
});
// result = [{text: [6, 12]}, {text: []}]
```

