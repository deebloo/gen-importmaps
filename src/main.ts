#! /usr/bin/env node

import path from "node:path";
import { parseArgs } from "node:util";

import { PackageAnalyzer } from "./package-analyzer.js";

const args = parseArgs({
  options: {
    root: {
      type: "string",
      default: "./",
    },
  },
});

const analyzer = new PackageAnalyzer(args.values.root);
const importMap = new Map<string, string>();

for await (let res of analyzer) {
  if (res.config.module) {
    importMap.set(res.config.name, path.join("/", res.path, res.config.module));
  } else if (res.config.main) {
    importMap.set(res.config.name, path.join("/", res.path, res.config.main));
  }
}

const res: Record<string, string> = {};

for (let [key, val] of importMap) {
  res[key] = val;
}

console.log(res);
