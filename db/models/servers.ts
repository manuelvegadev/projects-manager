import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projects, projectsId } from './projects';
import type { ssh_key_pairs, ssh_key_pairsId } from './ssh_key_pairs';
import type { users, usersId } from './users';

export interface serversAttributes {
  uuid: string;
  name: string;
  host: string;
  username: string;
  authentication_type_uuid: string;
  ssh_key_pair_uuid?: string;
  ssh_password?: string;
  user_uuid: string;
  slug: string;
}

export type serversPk = "uuid";
export type serversId = servers[serversPk];
export type serversOptionalAttributes = "uuid" | "ssh_key_pair_uuid" | "ssh_password";
export type serversCreationAttributes = Optional<serversAttributes, serversOptionalAttributes>;

export class servers extends Model<serversAttributes, serversCreationAttributes> implements serversAttributes {
  uuid!: string;
  name!: string;
  host!: string;
  username!: string;
  authentication_type_uuid!: string;
  ssh_key_pair_uuid?: string;
  ssh_password?: string;
  user_uuid!: string;
  slug!: string;

  // servers hasMany projects via server_uuid
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
  // servers belongsTo ssh_key_pairs via ssh_key_pair_uuid
  ssh_key_pair_uu!: ssh_key_pairs;
  getSsh_key_pair_uu!: Sequelize.BelongsToGetAssociationMixin<ssh_key_pairs>;
  setSsh_key_pair_uu!: Sequelize.BelongsToSetAssociationMixin<ssh_key_pairs, ssh_key_pairsId>;
  createSsh_key_pair_uu!: Sequelize.BelongsToCreateAssociationMixin<ssh_key_pairs>;
  // servers belongsTo users via user_uuid
  user_uu!: users;
  getUser_uu!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser_uu!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser_uu!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof servers {
    return servers.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    host: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authentication_type_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    ssh_key_pair_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'ssh_key_pairs',
        key: 'uuid'
      }
    },
    ssh_password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uuid'
      }
    },
    slug: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: "servers_pk2"
    }
  }, {
    sequelize,
    tableName: 'servers',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "servers_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
      {
        name: "servers_pk2",
        unique: true,
        fields: [
          { name: "slug" },
        ]
      },
    ]
  });
  }
}
