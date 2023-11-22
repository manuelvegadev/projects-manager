import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { invoices, invoicesId } from './invoices';

export interface billing_itemsAttributes {
  uuid: string;
  invoice_uuid: string;
  description: string;
  hours_worked: number;
  hourly_rate: number;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}

export type billing_itemsPk = "uuid";
export type billing_itemsId = billing_items[billing_itemsPk];
export type billing_itemsOptionalAttributes = "uuid" | "hours_worked" | "created_at" | "updated_at" | "deleted_at";
export type billing_itemsCreationAttributes = Optional<billing_itemsAttributes, billing_itemsOptionalAttributes>;

export class billing_items extends Model<billing_itemsAttributes, billing_itemsCreationAttributes> implements billing_itemsAttributes {
  uuid!: string;
  invoice_uuid!: string;
  description!: string;
  hours_worked!: number;
  hourly_rate!: number;
  created_at!: number;
  updated_at!: number;
  deleted_at?: number;

  // billing_items belongsTo invoices via invoice_uuid
  invoice_uu!: invoices;
  getInvoice_uu!: Sequelize.BelongsToGetAssociationMixin<invoices>;
  setInvoice_uu!: Sequelize.BelongsToSetAssociationMixin<invoices, invoicesId>;
  createInvoice_uu!: Sequelize.BelongsToCreateAssociationMixin<invoices>;

  static initModel(sequelize: Sequelize.Sequelize): typeof billing_items {
    return billing_items.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    invoice_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'invoices',
        key: 'uuid'
      }
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    hours_worked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    hourly_rate: {
      type: DataTypes.DECIMAL,
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
    tableName: 'billing_items',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "billing_items_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
  }
}
