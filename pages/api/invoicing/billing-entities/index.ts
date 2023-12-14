import { routeHandler } from "@/lib";
import { dbModels } from "@/db/client";
import { SCOPES } from "@/db/scopes";
import { billing_entities } from "@/db/models/billing_entities";

export type BillingEntitiesResponseMethods = {
  GET: {
    rows: billing_entities[];
  };
};

export default routeHandler<BillingEntitiesResponseMethods>({
  GET: {
    handler: async ({ res, genResponse }) => {
      const invoices = await dbModels.billing_entities
        .scope([SCOPES.BILLING_ENTITY.NOT_DELETED])
        .findAll();

      res.json(genResponse({ rows: invoices }));
    },
  },
});
