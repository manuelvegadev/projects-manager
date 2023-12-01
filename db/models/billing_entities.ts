import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { invoices, invoicesId } from './invoices';

export interface billing_entitiesAttributes {
  uuid: string;
  name: string;
  document: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  created_at: number;
  updated_at: number;
  deleted_at?: number;
}

export type billing_entitiesPk = "uuid";
export type billing_entitiesId = billing_entities[billing_entitiesPk];
export type billing_entitiesOptionalAttributes = "uuid" | "created_at" | "updated_at" | "deleted_at";
export type billing_entitiesCreationAttributes = Optional<billing_entitiesAttributes, billing_entitiesOptionalAttributes>;

export class billing_entities extends Model<billing_entitiesAttributes, billing_entitiesCreationAttributes> implements billing_entitiesAttributes {
  uuid!: string;
  name!: string;
  document!: string;
  street!: string;
  city!: string;
  state!: string;
  country!: string;
  postal_code!: string;
  created_at!: number;
  updated_at!: number;
  deleted_at?: number;

  // billing_entities hasMany invoices via billed_by_entity_uuid
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
  // billing_entities hasMany invoices via billed_to_entity_uuid
  billed_to_entity_uu_invoices!: invoices[];
  getBilled_to_entity_uu_invoices!: Sequelize.HasManyGetAssociationsMixin<invoices>;
  setBilled_to_entity_uu_invoices!: Sequelize.HasManySetAssociationsMixin<invoices, invoicesId>;
  addBilled_to_entity_uu_invoice!: Sequelize.HasManyAddAssociationMixin<invoices, invoicesId>;
  addBilled_to_entity_uu_invoices!: Sequelize.HasManyAddAssociationsMixin<invoices, invoicesId>;
  createBilled_to_entity_uu_invoice!: Sequelize.HasManyCreateAssociationMixin<invoices>;
  removeBilled_to_entity_uu_invoice!: Sequelize.HasManyRemoveAssociationMixin<invoices, invoicesId>;
  removeBilled_to_entity_uu_invoices!: Sequelize.HasManyRemoveAssociationsMixin<invoices, invoicesId>;
  hasBilled_to_entity_uu_invoice!: Sequelize.HasManyHasAssociationMixin<invoices, invoicesId>;
  hasBilled_to_entity_uu_invoices!: Sequelize.HasManyHasAssociationsMixin<invoices, invoicesId>;
  countBilled_to_entity_uu_invoices!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof billing_entities {
    return billing_entities.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    document: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(32),
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
    tableName: 'billing_entities',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "billing_entities_pk",
        unique: true,
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
  }
}
