import { IGitProjectConfig, IGitUserConfig } from "@/utils/git-actions.types";

const defaultGitUser: IGitUserConfig = {
  name: process.env.GIT_USERNAME!,
  password: process.env.USER_PASSWORD!,
};

const projects: { [key: string]: IGitProjectConfig } = {
  "ts-inventory-manager": {
    name: "Ticketsoft Inventory Manager",
    path: "/Users/mvega/WebstormProjects/ts-inventory-manager",
    buildCommand: "yarn run build",
    git: {
      user: defaultGitUser,
    },
  },
  "testing-repo": {
    name: "Testing Repo",
    path: "/Users/mvega/WebstormProjects/testing-repo",
    buildCommand: "cat readme.md",
    git: {
      user: defaultGitUser,
    },
  },
};

export default projects;
