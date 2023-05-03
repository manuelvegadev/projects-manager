export interface IInitSimpleGit {
  baseDir: string;
  username: string;
  password: string;
}

export interface IGitConfig {
  name: string;
  password: string;
}

export interface IGitUserConfig {
  name: string;
  password: string;
}

export interface IGitProjectConfig {
  name: string;
  path: string;
  git: {
    user: IGitUserConfig;
  };
}
