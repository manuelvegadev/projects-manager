import type { Sequelize } from "sequelize";
import { bank_accounts as _bank_accounts } from "./bank_accounts";
import type { bank_accountsAttributes, bank_accountsCreationAttributes } from "./bank_accounts";
import { billing_entities as _billing_entities } from "./billing_entities";
import type { billing_entitiesAttributes, billing_entitiesCreationAttributes } from "./billing_entities";
import { billing_items as _billing_items } from "./billing_items";
import type { billing_itemsAttributes, billing_itemsCreationAttributes } from "./billing_items";
import { invoices as _invoices } from "./invoices";
import type { invoicesAttributes, invoicesCreationAttributes } from "./invoices";
import { projects as _projects } from "./projects";
import type { projectsAttributes, projectsCreationAttributes } from "./projects";
import { repositories as _repositories } from "./repositories";
import type { repositoriesAttributes, repositoriesCreationAttributes } from "./repositories";
import { servers as _servers } from "./servers";
import type { serversAttributes, serversCreationAttributes } from "./servers";
import { ssh_key_pairs as _ssh_key_pairs } from "./ssh_key_pairs";
import type { ssh_key_pairsAttributes, ssh_key_pairsCreationAttributes } from "./ssh_key_pairs";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _bank_accounts as bank_accounts,
  _billing_entities as billing_entities,
  _billing_items as billing_items,
  _invoices as invoices,
  _projects as projects,
  _repositories as repositories,
  _servers as servers,
  _ssh_key_pairs as ssh_key_pairs,
  _users as users,
};

export type {
  bank_accountsAttributes,
  bank_accountsCreationAttributes,
  billing_entitiesAttributes,
  billing_entitiesCreationAttributes,
  billing_itemsAttributes,
  billing_itemsCreationAttributes,
  invoicesAttributes,
  invoicesCreationAttributes,
  projectsAttributes,
  projectsCreationAttributes,
  repositoriesAttributes,
  repositoriesCreationAttributes,
  serversAttributes,
  serversCreationAttributes,
  ssh_key_pairsAttributes,
  ssh_key_pairsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const bank_accounts = _bank_accounts.initModel(sequelize);
  const billing_entities = _billing_entities.initModel(sequelize);
  const billing_items = _billing_items.initModel(sequelize);
  const invoices = _invoices.initModel(sequelize);
  const projects = _projects.initModel(sequelize);
  const repositories = _repositories.initModel(sequelize);
  const servers = _servers.initModel(sequelize);
  const ssh_key_pairs = _ssh_key_pairs.initModel(sequelize);
  const users = _users.initModel(sequelize);

  invoices.belongsTo(bank_accounts, { as: "bank_account_uu", foreignKey: "bank_account_uuid"});
  bank_accounts.hasMany(invoices, { as: "invoices", foreignKey: "bank_account_uuid"});
  invoices.belongsTo(billing_entities, { as: "billed_by_entity_uu", foreignKey: "billed_by_entity_uuid"});
  billing_entities.hasMany(invoices, { as: "invoices", foreignKey: "billed_by_entity_uuid"});
  invoices.belongsTo(billing_entities, { as: "billed_to_entity_uu", foreignKey: "billed_to_entity_uuid"});
  billing_entities.hasMany(invoices, { as: "billed_to_entity_uu_invoices", foreignKey: "billed_to_entity_uuid"});
  billing_items.belongsTo(invoices, { as: "invoice_uu", foreignKey: "invoice_uuid"});
  invoices.hasMany(billing_items, { as: "billing_items", foreignKey: "invoice_uuid"});
  projects.belongsTo(repositories, { as: "repository_uu", foreignKey: "repository_uuid"});
  repositories.hasMany(projects, { as: "projects", foreignKey: "repository_uuid"});
  projects.belongsTo(servers, { as: "server_uu", foreignKey: "server_uuid"});
  servers.hasMany(projects, { as: "projects", foreignKey: "server_uuid"});
  servers.belongsTo(ssh_key_pairs, { as: "ssh_key_pair_uu", foreignKey: "ssh_key_pair_uuid"});
  ssh_key_pairs.hasMany(servers, { as: "servers", foreignKey: "ssh_key_pair_uuid"});
  servers.belongsTo(users, { as: "user_uu", foreignKey: "user_uuid"});
  users.hasMany(servers, { as: "servers", foreignKey: "user_uuid"});

  return {
    bank_accounts: bank_accounts,
    billing_entities: billing_entities,
    billing_items: billing_items,
    invoices: invoices,
    projects: projects,
    repositories: repositories,
    servers: servers,
    ssh_key_pairs: ssh_key_pairs,
    users: users,
  };
}
