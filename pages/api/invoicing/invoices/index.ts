import { routeHandler } from "@/lib";
import { dbModels } from "@/db/client";
import { SCOPES } from "@/db/scopes";

export default routeHandler({
  GET: {
    handler: async ({ res }) => {
      const invoices = await dbModels.invoices
        .scope([SCOPES.INVOICE.WITH_DETAILS, SCOPES.INVOICE.NOT_DELETED])
        .findAll();
      res.json(invoices);
    },
  },
});
