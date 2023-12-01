import { initModels } from "@/db/models/init-models";
import { Op } from "sequelize";

export const SCOPES = {
  INVOICE: {
    WITH_DETAILS: "withDetails",
    NOT_DELETED: "notDeleted",
    DELETED: "deleted",
  },
  BILLING_ENTITY: {
    NOT_DELETED: "notDeleted",
  },
};

// TODO: Separate the scopes by model on different files
export const initScopes = (models: ReturnType<typeof initModels>) => {
  const { invoices, billing_entities } = models;

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

  invoices.addScope(SCOPES.INVOICE.NOT_DELETED, {
    // @ts-ignore - The column can be null
    where: {
      deleted_at: {
        [Op.is]: null,
      },
    },
  });

  invoices.addScope(SCOPES.INVOICE.DELETED, {
    // @ts-ignore - The column can be null
    where: {
      deleted_at: {
        [Op.not]: null,
      },
    },
  });

  billing_entities.addScope(SCOPES.BILLING_ENTITY.NOT_DELETED, {
    // @ts-ignore - The column can be null
    where: {
      deleted_at: {
        [Op.is]: null,
      },
    },
  });
};
