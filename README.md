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

### Generate output using seed file

What is seeding and when to use it - see [HERE](https://github.com/microsoft/pict/blob/main/doc/pict.md#seeding)

```ts
import PictGenerator from "pwtg";

const generator = new Generator(
  "path/to/input-model-file.txt",
  "path/to/pict/binary",
);

await generator.generate(
  "text",
  true,
  "file/path/to/output-text-file.txt",
  "path/to/seed-text-file.txt",
);
```

### Generate output using different combinatorial order

For pair-wise approach, the (default) value of combinatorial
order is set to `2`.

However, you can set different order, as specified [HERE](https://github.com/microsoft/pict/blob/main/doc/pict.md#usage).

Simply put, the higher combinatorial order you set, the higher coverage
of possible combinations you get.

**Beware: if you set combinatorial order HIGHER then the highest number
of parameters, you will get an error**

```ts
import PictGenerator from "pwtg";

const generator = new Generator(
  "path/to/input-model-file.txt",
  "path/to/pict/binary",
);

await generator.generate(
  "text",
  true,
  "path/to/output-text-file.txt",
  undefined,
  3,
);
```
