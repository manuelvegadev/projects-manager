import { Account, User } from "next-auth";
import { dbModels } from "@/db/client";
import { usersAttributes } from "@/db/models/users";

interface ICreateUserFromOauth {
  ({
    user,
    account,
  }: {
    user: User;
    account: Account;
  }): Promise<usersAttributes>;
}

export const createUserFromOauth: ICreateUserFromOauth = async ({
  user: { email, id, image, name },
  account: { provider },
}) => {
  const uuid = crypto.randomUUID();

  return await dbModels.users.create({
    uuid,
    id: id,
    provider: provider,
    name: name as string,
    email: email as string,
    image: image as string,
  });
};
