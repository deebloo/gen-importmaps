export interface LockfilePackage {
  name?: string;
  license?: string;
  version: string;
  resolved?: string;
  integrity?: string;
  dev?: boolean;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  engines?: Record<string, string>;
  funding?: any;
  hasInstallScript?: boolean;
  optional?: boolean;
  os?: string[];
  bin?: Record<string, string> | string;
}

export interface Lockfile {
  name: string;
  packages: Record<string, LockfilePackage>;
  version: string;
  lockfileVersion: number;
  requires: boolean;
}

export interface PackageJson {
  name: string;
  type?: string;
  main?: string;
  module?: string;
  exports?: Record<string, { import?: string }>;
}
