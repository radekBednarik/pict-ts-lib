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

  constructor(filepathModel: string, pictBinaryLocation: string) {
    this.filepathModel = resolve(process.cwd(), sParser.parse(filepathModel));
    this.pictLocation = resolve(
      process.cwd(),
      sParser.parse(pictBinaryLocation),
    );
  }

  public async generate(
    output: "json" | "text",
    save?: boolean,
    saveLocation?: string,
  ) {
    const sLoc = resolve(process.cwd(), sParser.parse(saveLocation));
    let generated: string = "";

    if (output == "json") {
      const { stdout } = await exFile(this.pictLocation, [
        this.filepathModel,
        "-f:json",
      ]);
      generated = sParser.parse(stdout);
    } else {
      const { stdout } = await exFile(this.pictLocation, [
        this.filepathModel,
        "-f:text",
      ]);
      generated = sParser.parse(stdout);
    }

    if (save == true && typeof saveLocation === "string") {
      if (output == "json") {
        await writeJson(generated, sLoc);
      } else {
        await writeText(generated, sLoc);
      }
    } else {
      console.log(generated);
    }
  }
}
