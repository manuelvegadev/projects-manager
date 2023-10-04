import { usersAttributes } from "@/db/models/users";
import { dbModels } from "@/db/client";

interface IGetUserByOauth {
  (id: string, provider: string): Promise<usersAttributes | null>;
}

export const getUserByOauth: IGetUserByOauth = async (id, provider) => {
  return await dbModels.users.findOne({
    where: {
      id,
      provider,
    },
  });
};
