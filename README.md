
# Rolling Search

Rolling search uses the Rabin-Karp algorithm to search the text pattern from the text data.


## Installation

```bash
  npm install rolling-search
```
    
## Features

- Find the objects having the text pattern.
- Find the specific indices in objects where text pattern matches.
- Find the match at the particular fields of the object



## Usage/Examples
There are different ways to match the pattern this library provides some of them are :

- **searchMatch**: This method finds if there is any match of the pattern in the text with provided parameters. Return the promise of the `boolean` result.

```javascript
import {searchMatch} from "rolling-search";

const result = await searchMatch({
      text: "Hello World",
      pattern: "world", // lowercase 'w'
      hasCaseSensitive: false,
      hasMatchOnlyWords: false,
    });


// Output result: true 
```



- **searchMatchPositions**: This method find the the indices wherever the pattern match in the text. Return the promise of the `indices array` (indices are the starting indices from where the pattern match in the text and each doesn't count the collided range)

```javascript
import {searchMatchPositions} from "rolling-search"

const result = await searchMatchPositions({
      text: "World, Hello World World, worLdworld, World World",
      pattern: "World",
      hasCaseSensitive: false,
      maxMatchCount: 2, // Limit to first 2 matches
      hasMatchOnlyWords: true,
    });

// Output result: [13, 28]
```

- **RollingSearch**: This class contain the searchMatch and searchMatchPositions methods with extra funtionality to search on the `specific fields` of the objects.


```javascript
import {RollingSearch} from "../src/searchEngine";

const searchEngine = new RollingSearch();

```

```javascript
const array = [{text: "hello worlD", tags:"hello"}, {text: "this is another way World_", tags:"world"}];
const pattern = "world";

const searchEngine = new RollingSearch(array);

const result = await searchEngine.search({
      pattern: pattern,
      hasMatchOnlyWords: true,
      onlyMatchIndices: false,
    });
// Output result = [{text: true, tags:false}, {text: false, tags:true}]
```

```javascript
const array = [{text: "hello worlD", tags:"hello"}, {text: "this is another way World_", tags:"world"}];
const pattern = "world";

const searchEngine = new RollingSearch(array);

const result = await searchEngine.search({
      pattern: pattern,
      hasMatchOnlyWords: true,  
      searchFields: ["tags"]   // search on particular tag
    });
// Output result = [1]
```


```javascript
const array = [
      {text: "hello worlD woRld World world"},
      {text: "this is another way World_"},
      {text: "this is world of WORLDS_"},
      {text: "world only"},
      {text: "another world"},
    ];
const pattern = "world";

const searchEngine = new RollingSearch(array, 2);  // limit to max two matches in an iteration

async function search() {
    const result = await searchEngine.search({
        pattern: pattern,
        hasMatchOnlyWords: true,
        onlyMatchIndices: false,
      });
      return result;
    }

const result1 = await search();
// Output result1 : [{text: true}, {text: false}]

const result2 = await search();
// Output result2 : [{text: true}, {text:true}]

const result3 = await search();
// Output result3 : [{text: true}]
```


```javascript
const array = [
      {text: "hello worlD woRld World world"},
      {text: "this is another way World_"},
    ];
const pattern = "world";

const searchEngine = new RollingSearch(array);

const result = await searchEngine.searchPositions({
    array: array,
    pattern: pattern,
    hasCaseSensitive:false,
    hasMatchOnlyWords: true,
    maxMatchCount: 2,
});
// Output result : [{text: [6, 12]}, {text: []}]
```



## 🔗 Links
[![github](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRFKUAwLfFz4a7EEtYc8SrMZJ3_6UAFqgC5g&s)](https://github.com/himanshu3889/rolling-search)
