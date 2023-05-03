import { SimpleGit, simpleGit } from "simple-git";
import projects from "@/config/projects";
import { IGitProjectConfig, IInitSimpleGit } from "@/utils/git-actions.types";

export function initProjects() {
  for (const projectName in Object.keys(projects)) {
    initSimpleGitProject(projects[projectName]);
  }
}

export function initSimpleGitProject(project: IGitProjectConfig) {
  return initSimpleGit({
    baseDir: project.path,
    username: project.git.user.name,
    password: project.git.user.password,
  });
}

export function initSimpleGit({
  baseDir,
  username,
  password,
}: IInitSimpleGit): SimpleGit {
  const git: SimpleGit = simpleGit(baseDir);

  git.addConfig("user.name", username);
  git.addConfig("user.password", password);

  return git;
}
