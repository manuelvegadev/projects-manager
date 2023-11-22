import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { bank_accounts, bank_accountsId } from './bank_accounts';
import type { billing_entities, billing_entitiesId } from './billing_entities';
import type { billing_items, billing_itemsId } from './billing_items';

export interface invoicesAttributes {
  uuid: string;
  name: string;
  billed_by_entity_uuid: string;
  billed_to_entity_uuid: string;
  date: number;
  due_date?: number;
  additional_notes?: string;
  bank_account_uuid: string;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}

export type invoicesPk = "uuid";
export type invoicesId = invoices[invoicesPk];
export type invoicesOptionalAttributes = "uuid" | "date" | "due_date" | "additional_notes" | "created_at" | "updated_at" | "deleted_at";
export type invoicesCreationAttributes = Optional<invoicesAttributes, invoicesOptionalAttributes>;

export class invoices extends Model<invoicesAttributes, invoicesCreationAttributes> implements invoicesAttributes {
  uuid!: string;
  name!: string;
  billed_by_entity_uuid!: string;
  billed_to_entity_uuid!: string;
  date!: number;
  due_date?: number;
  additional_notes?: string;
  bank_account_uuid!: string;
  created_at!: number;
  updated_at!: number;
  deleted_at?: number;

  // invoices belongsTo bank_accounts via bank_account_uuid
  bank_account_uu!: bank_accounts;
  getBank_account_uu!: Sequelize.BelongsToGetAssociationMixin<bank_accounts>;
  setBank_account_uu!: Sequelize.BelongsToSetAssociationMixin<bank_accounts, bank_accountsId>;
  createBank_account_uu!: Sequelize.BelongsToCreateAssociationMixin<bank_accounts>;
  // invoices belongsTo billing_entities via billed_by_entity_uuid
  billed_by_entity_uu!: billing_entities;
  getBilled_by_entity_uu!: Sequelize.BelongsToGetAssociationMixin<billing_entities>;
  setBilled_by_entity_uu!: Sequelize.BelongsToSetAssociationMixin<billing_entities, billing_entitiesId>;
  createBilled_by_entity_uu!: Sequelize.BelongsToCreateAssociationMixin<billing_entities>;
  // invoices belongsTo billing_entities via billed_to_entity_uuid
  billed_to_entity_uu!: billing_entities;
  getBilled_to_entity_uu!: Sequelize.BelongsToGetAssociationMixin<billing_entities>;
  setBilled_to_entity_uu!: Sequelize.BelongsToSetAssociationMixin<billing_entities, billing_entitiesId>;
  createBilled_to_entity_uu!: Sequelize.BelongsToCreateAssociationMixin<billing_entities>;
  // invoices hasMany billing_items via invoice_uuid
  billing_items!: billing_items[];
  getBilling_items!: Sequelize.HasManyGetAssociationsMixin<billing_items>;
  setBilling_items!: Sequelize.HasManySetAssociationsMixin<billing_items, billing_itemsId>;
  addBilling_item!: Sequelize.HasManyAddAssociationMixin<billing_items, billing_itemsId>;
  addBilling_items!: Sequelize.HasManyAddAssociationsMixin<billing_items, billing_itemsId>;
  createBilling_item!: Sequelize.HasManyCreateAssociationMixin<billing_items>;
  removeBilling_item!: Sequelize.HasManyRemoveAssociationMixin<billing_items, billing_itemsId>;
  removeBilling_items!: Sequelize.HasManyRemoveAssociationsMixin<billing_items, billing_itemsId>;
  hasBilling_item!: Sequelize.HasManyHasAssociationMixin<billing_items, billing_itemsId>;
  hasBilling_items!: Sequelize.HasManyHasAssociationsMixin<billing_items, billing_itemsId>;
  countBilling_items!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof invoices {
    return invoices.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    billed_by_entity_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'billing_entities',
        key: 'uuid'
      }
    },
    billed_to_entity_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'billing_entities',
        key: 'uuid'
      }
    },
    date: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('EXTRACT(epoch FROM now())')
    },
    due_date: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    additional_notes: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "2048"
    },
    bank_account_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bank_accounts',
        key: 'uuid'
      }
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
    tableName: 'invoices',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "invoices_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
  }
}
