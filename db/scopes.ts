import { initModels } from "@/db/models/init-models";

export const SCOPES = {
  INVOICE: {
    WITH_DETAILS: "withDetails",
  },
};

export const initScopes = (models: ReturnType<typeof initModels>) => {
  const { invoices } = models;

  invoices.addScope(SCOPES.INVOICE.WITH_DETAILS, {
    include: [
      {
        association: invoices.associations.billing_items,
        as: "items",
      },
      {
        association: invoices.associations.billed_by_entity_uu,
        as: "billed_by",
      },
      {
        association: invoices.associations.billed_to_entity_uu,
        as: "billed_to",
      },
      {
        association: invoices.associations.bank_account_uu,
        as: "bank_account",
      },
    ],
  });
};
