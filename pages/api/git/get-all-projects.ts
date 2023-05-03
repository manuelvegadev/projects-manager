import { SimpleGit, StatusResult } from "simple-git";
import { NextApiRequest, NextApiResponse } from "next";
import { IGitProjectConfig } from "@/utils/git-actions.types";
import { initSimpleGit } from "@/utils/git-actions";
import projects from "@/config/projects";
import { IProjectStatusResponse } from "@/types/responses/git.types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  res.status(200).json(projectsStatus);
}
