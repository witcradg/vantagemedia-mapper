import { promises as fs } from "node:fs";
import path from "node:path";

import type { LocationRecord } from "@/types/location-record";

const selectedAddressPath = path.join(
  process.cwd(),
  "data",
  "selected-address.json"
);

export async function readSelectedLocation(): Promise<LocationRecord> {
  const fileContents = await fs.readFile(selectedAddressPath, "utf8");

  return JSON.parse(fileContents) as LocationRecord;
}
