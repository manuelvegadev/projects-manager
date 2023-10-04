import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { servers, serversId } from './servers';

export interface ssh_key_pairsAttributes {
  uuid: string;
  private_key_file: string;
  passphrase?: string;
}

export type ssh_key_pairsPk = "uuid";
export type ssh_key_pairsId = ssh_key_pairs[ssh_key_pairsPk];
export type ssh_key_pairsOptionalAttributes = "uuid" | "passphrase";
export type ssh_key_pairsCreationAttributes = Optional<ssh_key_pairsAttributes, ssh_key_pairsOptionalAttributes>;

export class ssh_key_pairs extends Model<ssh_key_pairsAttributes, ssh_key_pairsCreationAttributes> implements ssh_key_pairsAttributes {
  uuid!: string;
  private_key_file!: string;
  passphrase?: string;

  // ssh_key_pairs hasMany servers via ssh_key_pair_uuid
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

  static initModel(sequelize: Sequelize.Sequelize): typeof ssh_key_pairs {
    return ssh_key_pairs.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    private_key_file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passphrase: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ssh_key_pairs',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "ssh_key_pairs_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
  }
}
