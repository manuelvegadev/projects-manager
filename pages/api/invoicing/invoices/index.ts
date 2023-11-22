import { NextApiRequest, NextApiResponse } from "next";
import { dbModels } from "@/db/client";
import { SCOPES } from "@/db/scopes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const invoices = await dbModels.invoices
    .scope(SCOPES.INVOICE.WITH_DETAILS)
    .findAll();

  res.json(invoices);
}
