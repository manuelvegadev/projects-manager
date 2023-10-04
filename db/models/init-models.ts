import type { Sequelize } from "sequelize";
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
  _projects as projects,
  _repositories as repositories,
  _servers as servers,
  _ssh_key_pairs as ssh_key_pairs,
  _users as users,
};

export type {
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
  const projects = _projects.initModel(sequelize);
  const repositories = _repositories.initModel(sequelize);
  const servers = _servers.initModel(sequelize);
  const ssh_key_pairs = _ssh_key_pairs.initModel(sequelize);
  const users = _users.initModel(sequelize);

  projects.belongsTo(repositories, { as: "repository_uu", foreignKey: "repository_uuid"});
  repositories.hasMany(projects, { as: "projects", foreignKey: "repository_uuid"});
  projects.belongsTo(servers, { as: "server_uu", foreignKey: "server_uuid"});
  servers.hasMany(projects, { as: "projects", foreignKey: "server_uuid"});
  servers.belongsTo(ssh_key_pairs, { as: "ssh_key_pair_uu", foreignKey: "ssh_key_pair_uuid"});
  ssh_key_pairs.hasMany(servers, { as: "servers", foreignKey: "ssh_key_pair_uuid"});
  servers.belongsTo(users, { as: "user_uu", foreignKey: "user_uuid"});
  users.hasMany(servers, { as: "servers", foreignKey: "user_uuid"});

  return {
    projects: projects,
    repositories: repositories,
    servers: servers,
    ssh_key_pairs: ssh_key_pairs,
    users: users,
  };
}
