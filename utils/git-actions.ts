import { SimpleGit, simpleGit, StatusResult } from "simple-git";
import projects from "@/config/projects";
import { IGitProjectConfig, IInitSimpleGit } from "@/utils/git-actions.types";
import { IProjectStatusResponse } from "@/types/responses/git.types";

export async function getAllProjects() {
  const projectsStatus: IProjectStatusResponse[] = await Promise.all(
    Object.keys(projects).map(async (projectName) => {
      const project: IGitProjectConfig = projects[projectName];

      const git: SimpleGit = initSimpleGit({
        baseDir: project.path,
        username: project.git.user.name,
        password: project.git.user.password,
      });

      const status: StatusResult = await git.status();

      return {
        name: project.name,
        path: project.path,
        status,
      };
    })
  );

  return projectsStatus;
}

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
