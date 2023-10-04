import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { repositories, repositoriesId } from './repositories';
import type { servers, serversId } from './servers';

export interface projectsAttributes {
  uuid: string;
  server_uuid: string;
  name: string;
  root_path: string;
  repository_uuid: string;
}

export type projectsPk = "uuid";
export type projectsId = projects[projectsPk];
export type projectsOptionalAttributes = "uuid";
export type projectsCreationAttributes = Optional<projectsAttributes, projectsOptionalAttributes>;

export class projects extends Model<projectsAttributes, projectsCreationAttributes> implements projectsAttributes {
  uuid!: string;
  server_uuid!: string;
  name!: string;
  root_path!: string;
  repository_uuid!: string;

  // projects belongsTo repositories via repository_uuid
  repository_uu!: repositories;
  getRepository_uu!: Sequelize.BelongsToGetAssociationMixin<repositories>;
  setRepository_uu!: Sequelize.BelongsToSetAssociationMixin<repositories, repositoriesId>;
  createRepository_uu!: Sequelize.BelongsToCreateAssociationMixin<repositories>;
  // projects belongsTo servers via server_uuid
  server_uu!: servers;
  getServer_uu!: Sequelize.BelongsToGetAssociationMixin<servers>;
  setServer_uu!: Sequelize.BelongsToSetAssociationMixin<servers, serversId>;
  createServer_uu!: Sequelize.BelongsToCreateAssociationMixin<servers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof projects {
    return projects.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    server_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'servers',
        key: 'uuid'
      }
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    root_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    repository_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'repositories',
        key: 'uuid'
      }
    }
  }, {
    sequelize,
    tableName: 'projects',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "projects_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
  }
}
