import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { z } from "zod";
import { writeJson, writeText } from "./io.js";

const exFile = promisify(execFile);
const sParser = z.string();

export default class PictGenerator {
  private filepath: string;
  private pictLocation: string;

  constructor(filepath: string, pictLocation: string) {
    this.filepath = resolve(process.cwd(), sParser.parse(filepath));
    this.pictLocation = resolve(process.cwd(), sParser.parse(pictLocation));
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
        this.filepath,
        "-f:json",
      ]);
      generated = sParser.parse(stdout);
    } else {
      const { stdout } = await exFile(this.pictLocation, [
        this.filepath,
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
