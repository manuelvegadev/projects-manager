import { NextApiRequest, NextApiResponse } from "next";
import { dbModels } from "@/db/client";
import { SCOPES } from "@/db/scopes";
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

  const invoices = await dbModels.invoices
    .scope(SCOPES.INVOICE.WITH_DETAILS)
    .findAll();

  res.json(invoices);
}
