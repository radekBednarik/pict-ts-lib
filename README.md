# PWTG - PairWise Test Generator

This simple library is a wrapper for Microsoft's [PICT](https://github.com/microsoft/pict) tool.

Unlike some other packages this library does not include PICT binaries.
User is expected to provide requested binary him/her self.
This is primarily for security reasons. It is not a good practise
to download npm packages with binaries inside.

## Preconditions

- [Node.js](https://nodejs.org) LTS
- downloaded or built binary for your OS - see the [PICT documentation](https://github.com/microsoft/pict)

## Installation

- run `npm install pwtg`

## Usage

### Generate tests into json file

```ts
import PictGenerator from "pwtg";

const generator = new Generator(
  "path/to/input-model-file.txt",
  "path/to/pict-binary",
);

await generator.generate("json", true, "path/to/output-json-file.json");
```

### Generate tests into txt file

```ts
import PictGenerator from "pwtg";

const generator = new Generator(
  "path/to/input-model-file.txt",
  "path/to/pict-binary",
);

await generator.generate("text", true, "path/to/output-text-file.txt");
```

### Just generate output string but do not save

```ts
import PictGenerator from "pwtg";

const generator = new Generator(
  "path/to/input-model-file.txt",
  "path/to/pict-binary",
);

await generator.generate("text", false);

console.log(generator.generated);
```
