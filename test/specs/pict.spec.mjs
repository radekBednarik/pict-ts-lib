import PictGenerator from "../../dist/pict.js";
import { expect } from "chai";
import { describe, beforeEach, it } from "mocha";
import { existsSync } from "fs";
import { rimraf } from "rimraf";

async function deleteOutputs(outputs) {
  await rimraf(outputs);
}

describe("PictGenerator", function () {
  let generator;
  let jsonOutputLoc = "test/output.json";
  let txtOutputLoc = "test/output.txt";

  beforeEach(async function () {
    await deleteOutputs([jsonOutputLoc, txtOutputLoc]);

    generator = new PictGenerator(
      "test/test-data/test-inputs-text-01.txt",
      "binaries/pict",
    );
  });

  this.afterAll(async function () {
    await deleteOutputs([jsonOutputLoc, txtOutputLoc]);
  });

  it("saves output as .json", async function () {
    await generator.generate("json", true, jsonOutputLoc);

    const exist = existsSync(jsonOutputLoc);

    expect(exist).to.be.true;
  });

  it("saves output as .txt", async function () {
    await generator.generate("text", true, txtOutputLoc);

    const exist = existsSync(txtOutputLoc);

    expect(exist).to.be.true;
  });
});
