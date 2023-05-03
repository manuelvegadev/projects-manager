import { NextApiRequest, NextApiResponse } from "next";
import { getAllProjects } from "@/utils/git-actions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectsStatus = await getAllProjects();
  res.status(200).json(projectsStatus);
}
