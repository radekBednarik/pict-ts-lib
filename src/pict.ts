import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { z } from "zod";
import { writeJson, writeText } from "./io.js";

const exFile = promisify(execFile);
const sParser = z.string();
const nParser = z.number();

export default class PictGenerator {
  private filepathModel: string;
  private pictLocation: string;

  public generated?: string;

  constructor(filepathModel: string, pictBinaryLocation: string) {
    this.filepathModel = this._resolveToFullpath(filepathModel);
    this.pictLocation = this._resolveToFullpath(pictBinaryLocation);

    this.generated = undefined;
  }

  public async generate(
    output: "json" | "text",
    save?: boolean,
    saveLocation?: string,
    seedLocation?: string,
    combinationsOrder?: number,
  ) {
    const args = this._prepArgs(output, seedLocation, combinationsOrder);

    const { stdout } = await exFile(this.pictLocation, [
      this.filepathModel,
      ...args,
    ]);
    this.generated = sParser.parse(stdout);

    if (save == true && typeof saveLocation === "string") {
      const sLoc = this._resolveToFullpath(saveLocation);

      if (output == "json") {
        await writeJson(this.generated, sLoc);
      } else {
        await writeText(this.generated, sLoc);
      }
    }
  }

  private _prepArgs(
    outputType: "json" | "text",
    seedLocation?: string,
    combinationsOrder?: number,
  ) {
    const input = [
      sParser.parse(outputType),
      sParser.optional().parse(seedLocation),
      nParser.optional().parse(combinationsOrder),
    ];
    const output = [];

    for (let i = 0; i < input.length; i++) {
      if (i === 0) {
        output.push(input[i] === "json" ? "-f:json" : "-f:text");
      } else if (i === 1 && typeof input[i] !== "undefined") {
        output.push(`-e:${this._resolveToFullpath(seedLocation!)}`);
      } else if (i === 2 && typeof input[i] !== "undefined") {
        output.push(`-o:${combinationsOrder}`);
      }
    }

    return output;
  }

  private _resolveToFullpath(subpath: string) {
    return resolve(process.cwd(), sParser.parse(subpath));
  }
}
