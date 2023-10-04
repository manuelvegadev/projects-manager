import { Sequelize } from "sequelize";
import { initModels } from "@/db/models/init-models";

export const db = new Sequelize(
  process.env.POSTGRES_DATABASE as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: process.env.POSTGRES_HOST as string,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

export const dbModels = initModels(db);
