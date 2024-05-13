import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { z } from "zod";
import { writeJson, writeText } from "./io.js";

const exFile = promisify(execFile);
const sParser = z.string();

export default class PictGenerator {
  private filepathModel: string;
  private pictLocation: string;

  public generated?: string;

  constructor(filepathModel: string, pictBinaryLocation: string) {
    this.filepathModel = resolve(process.cwd(), sParser.parse(filepathModel));
    this.pictLocation = resolve(
      process.cwd(),
      sParser.parse(pictBinaryLocation),
    );
    this.generated = undefined;
  }

  public async generate(
    output: "json" | "text",
    save?: boolean,
    saveLocation?: string,
    seedLocation?: string,
  ) {
    const args = this._prepArgs(output, seedLocation);

    const { stdout } = await exFile(this.pictLocation, [
      this.filepathModel,
      ...args,
    ]);
    this.generated = sParser.parse(stdout);

    if (save == true && typeof saveLocation === "string") {
      const sLoc = resolve(process.cwd(), sParser.parse(saveLocation));

      if (output == "json") {
        await writeJson(this.generated, sLoc);
      } else {
        await writeText(this.generated, sLoc);
      }
    }
  }

  private _prepArgs(outputType: "json" | "text", seedLocation?: string) {
    const input = [outputType, seedLocation];
    const output = [];

    for (let i = 0; i < input.length; i++) {
      if (i === 0) {
        output.push(input[i] === "json" ? "-f:json" : "-f:text");
      } else if (i === 1 && typeof input[i] !== "undefined") {
        output.push(`-e:${input[i]}`);
      }
    }

    return output;
  }
}
