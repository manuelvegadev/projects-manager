import { NextApiRequest, NextApiResponse } from "next";
import projects from "@/config/projects";
import { initSimpleGitProject } from "@/utils/git-actions";
import { execSync } from "child_process";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    const projectId = req.query.projectId as string;
    const project = projects[projectId];

    const git = initSimpleGitProject(project);

    const fetchResult = await git.fetch();
    const pullResult = await git.pull();
    let buildResult = "";

    if (project.buildCommand) {
      const stdout = execSync(`cd ${project.path} && ${project.buildCommand}`);
      buildResult = stdout.toString();
    }

    res.status(200).json({ fetchResult, pullResult, buildResult });
  } catch (error) {
    res.status(500).json({ error });
  }
}
