import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { invoices, invoicesId } from './invoices';

export interface bank_accountsAttributes {
  uuid: string;
  account_holder_name: string;
  account_holder_document: string;
  account_number: string;
  swift_code: string;
  account_type: string;
  bank: string;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}

export type bank_accountsPk = "uuid";
export type bank_accountsId = bank_accounts[bank_accountsPk];
export type bank_accountsOptionalAttributes = "uuid" | "created_at" | "updated_at" | "deleted_at";
export type bank_accountsCreationAttributes = Optional<bank_accountsAttributes, bank_accountsOptionalAttributes>;

export class bank_accounts extends Model<bank_accountsAttributes, bank_accountsCreationAttributes> implements bank_accountsAttributes {
  uuid!: string;
  account_holder_name!: string;
  account_holder_document!: string;
  account_number!: string;
  swift_code!: string;
  account_type!: string;
  bank!: string;
  created_at!: number;
  updated_at!: number;
  deleted_at?: number;

  // bank_accounts hasMany invoices via bank_account_uuid
  invoices!: invoices[];
  getInvoices!: Sequelize.HasManyGetAssociationsMixin<invoices>;
  setInvoices!: Sequelize.HasManySetAssociationsMixin<invoices, invoicesId>;
  addInvoice!: Sequelize.HasManyAddAssociationMixin<invoices, invoicesId>;
  addInvoices!: Sequelize.HasManyAddAssociationsMixin<invoices, invoicesId>;
  createInvoice!: Sequelize.HasManyCreateAssociationMixin<invoices>;
  removeInvoice!: Sequelize.HasManyRemoveAssociationMixin<invoices, invoicesId>;
  removeInvoices!: Sequelize.HasManyRemoveAssociationsMixin<invoices, invoicesId>;
  hasInvoice!: Sequelize.HasManyHasAssociationMixin<invoices, invoicesId>;
  hasInvoices!: Sequelize.HasManyHasAssociationsMixin<invoices, invoicesId>;
  countInvoices!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof bank_accounts {
    return bank_accounts.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    account_holder_name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    account_holder_document: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    account_number: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    swift_code: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    account_type: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    bank: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('EXTRACT(epoch FROM now())')
    },
    updated_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('EXTRACT(epoch FROM now())')
    },
    deleted_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bank_accounts',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "bank_accounts_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
  }
}
