import type { NextApiRequest, NextApiResponse } from "next";
import { simpleGit, SimpleGit } from "simple-git";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const git: SimpleGit = simpleGit(
    "/Users/mvega/WebstormProjects/ts-inventory-manager"
  );

  git.addConfig("user.name", "Manuel Vega");
  git.addConfig("user.password", "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");

  const status = await git.status();

  res.status(200).json({ status });
}
