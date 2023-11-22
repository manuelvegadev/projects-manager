import { NextApiRequest, NextApiResponse } from "next";
import { getAllProjects } from "@/utils/git-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const projectsStatus = await getAllProjects();
  res.status(200).json(projectsStatus);
}
