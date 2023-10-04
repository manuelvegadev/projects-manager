import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { servers, serversId } from './servers';

export interface usersAttributes {
  uuid: string;
  provider: string;
  id: string;
  name: string;
  email: string;
  image: string;
}

export type usersPk = "uuid";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "uuid";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  uuid!: string;
  provider!: string;
  id!: string;
  name!: string;
  email!: string;
  image!: string;

  // users hasMany servers via user_uuid
  servers!: servers[];
  getServers!: Sequelize.HasManyGetAssociationsMixin<servers>;
  setServers!: Sequelize.HasManySetAssociationsMixin<servers, serversId>;
  addServer!: Sequelize.HasManyAddAssociationMixin<servers, serversId>;
  addServers!: Sequelize.HasManyAddAssociationsMixin<servers, serversId>;
  createServer!: Sequelize.HasManyCreateAssociationMixin<servers>;
  removeServer!: Sequelize.HasManyRemoveAssociationMixin<servers, serversId>;
  removeServers!: Sequelize.HasManyRemoveAssociationsMixin<servers, serversId>;
  hasServer!: Sequelize.HasManyHasAssociationMixin<servers, serversId>;
  hasServers!: Sequelize.HasManyHasAssociationsMixin<servers, serversId>;
  countServers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "users_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
  }
}
