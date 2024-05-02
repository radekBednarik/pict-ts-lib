import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { z } from "zod";

async function _readFile(filepath: string): Promise<string> {
  try {
    const fp = z.string().parse(filepath);
    const ffp = resolve(process.cwd(), fp);

    return await readFile(ffp, { encoding: "utf-8" });
  } catch (error) {
    throw new Error(
      `func _readFile failed to read content of the file from: ${filepath}`,
    );
  }
}

async function _saveFile(data: string, filepath: string): Promise<void> {
  try {
    const fp = z.string().parse(filepath);
    const ffp = resolve(process.cwd(), fp);
    const d = z.string().parse(data);

    await writeFile(ffp, d);
  } catch (error) {
    throw new Error(
      `func _writeFile failed to write content to the file: ${filepath}`,
    );
  }
}

export async function readJson(filepath: string): Promise<any> {
  try {
    const fp = z.string().parse(filepath);
    const ffp = resolve(process.cwd(), fp);

    const data = await _readFile(ffp);

    return JSON.parse(data);
  } catch (error) {
    throw new Error(
      `func readJson failed to return data as JSON object with error: ${error}`,
    );
  }
}

export async function writeJson(data: any, filepath: string): Promise<void> {
  try {
    const fp = z.string().parse(filepath);
    const ffp = resolve(process.cwd(), fp);
    const d = z.string().parse(JSON.stringify(data));

    await _saveFile(d, ffp);
  } catch (error) {
    throw new Error(
      `func writeJson failed to save JSON data as string with error: ${error}`,
    );
  }
}
