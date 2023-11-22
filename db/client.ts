import { Sequelize } from "sequelize";
import { initModels } from "@/db/models/init-models";
import { initScopes } from "@/db/scopes";

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

const dbModels = initModels(db);
initScopes(dbModels);

export { dbModels };
