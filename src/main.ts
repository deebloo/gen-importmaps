import { execSync } from "node:child_process";

const pkgs = JSON.parse(
  execSync("npm ls --all --json --lockfile-only").toString()
);

console.log(pkgs);
