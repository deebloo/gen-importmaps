import fs from "node:fs/promises";
import path from "node:path";

import { Lockfile, PackageJson } from "./package-json.js";

export interface AnalyzerResult {
  path: string;
  config: PackageJson;
}

export class PackageAnalyzer {
  #lockfile: Lockfile | null = null;
  #root = "./";

  constructor(root?: string) {
    if (root) {
      this.#root = root;
    }
  }

  async *[Symbol.asyncIterator]() {
    if (this.#lockfile === null) {
      this.#lockfile = await this.readLockfile();
    }

    const packages = Object.keys(this.#lockfile.packages);

    while (packages.length) {
      const pkg = packages.shift();

      if (pkg) {
        try {
          const buffer = await fs.readFile(path.join(pkg, "package.json"));
          const pkgJson: PackageJson = JSON.parse(buffer.toString());

          if (pkgJson.type === "module") {
            yield { path: pkg, config: pkgJson };
          }
        } catch {}
      }
    }
  }

  async readLockfile(): Promise<Lockfile> {
    const res = await fs.readFile(path.join(this.#root, "package-lock.json"));

    return JSON.parse(res.toString());
  }
}
