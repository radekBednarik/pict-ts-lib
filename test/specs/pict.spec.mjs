// import PictGenerator from "../../dist/pict.js";
import { expect } from "chai";
import { describe, beforeEach, it } from "mocha";
import { existsSync } from "fs";
import { rimraf } from "rimraf";
import PictGenerator from "pwtg";

async function deleteOutputs(outputs) {
  await rimraf(outputs);
}

describe("PictGenerator", function () {
  let generator;
  let jsonOutputLoc = "test/output.json";
  let txtOutputLoc = "test/output.txt";

  let seedInputTxt = "test/test-data/seed-input.txt";

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

  it("does not save .json and generated text is available in prop", async function () {
    await generator.generate("json", false);

    const exists = existsSync(jsonOutputLoc);

    expect(exists).to.be.false;
    expect(generator.generated).to.be.a("string");
    expect(generator.generated).not.have.length(0);
  });

  it("does not save as .txt and generated text is available in prop", async function () {
    await generator.generate("text", false);

    const exists = existsSync(txtOutputLoc);

    expect(exists).to.be.false;
    expect(generator.generated).to.be.a("string");
    expect(generator.generated).not.have.length(0);
  });

  it("save as .json with using the seed file input", async function () {
    await generator.generate("json", true, jsonOutputLoc, seedInputTxt);

    const exists = existsSync(jsonOutputLoc);

    expect(exists).to.be.true;
    expect(generator.generated).to.be.a("string");
    expect(generator.generated).not.have.length(0);
  });

  it("save as .txt with using the seed file input", async function () {
    await generator.generate("text", true, txtOutputLoc, seedInputTxt);

    const exists = existsSync(txtOutputLoc);

    expect(exists).to.be.true;
    expect(generator.generated).to.be.a("string");
    expect(generator.generated).not.have.length(0);
  });
});
