import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';

export interface repositoriesAttributes {
  uuid: string;
  label: string;
  name: string;
  url: string;
  token: string;
}

export type repositoriesPk = "uuid";
export type repositoriesId = repositories[repositoriesPk];
export type repositoriesOptionalAttributes = "uuid";
export type repositoriesCreationAttributes = Optional<repositoriesAttributes, repositoriesOptionalAttributes>;

export class repositories extends Model<repositoriesAttributes, repositoriesCreationAttributes> implements repositoriesAttributes {
  uuid!: string;
  label!: string;
  name!: string;
  url!: string;
  token!: string;

  // repositories hasMany projects via repository_uuid
  projects!: projects[];
  getProjects!: Sequelize.HasManyGetAssociationsMixin<projects>;
  setProjects!: Sequelize.HasManySetAssociationsMixin<projects, projectsId>;
  addProject!: Sequelize.HasManyAddAssociationMixin<projects, projectsId>;
  addProjects!: Sequelize.HasManyAddAssociationsMixin<projects, projectsId>;
  createProject!: Sequelize.HasManyCreateAssociationMixin<projects>;
  removeProject!: Sequelize.HasManyRemoveAssociationMixin<projects, projectsId>;
  removeProjects!: Sequelize.HasManyRemoveAssociationsMixin<projects, projectsId>;
  hasProject!: Sequelize.HasManyHasAssociationMixin<projects, projectsId>;
  hasProjects!: Sequelize.HasManyHasAssociationsMixin<projects, projectsId>;
  countProjects!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof repositories {
    return repositories.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'repositories',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "repositories_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
  }
}
