import { Account, User } from "next-auth";
import { createUserFromOauth, getUserByOauth } from "@/lib";

export const loginCallback = async ({
  user,
  account,
}: {
  user: User;
  account: Account;
}) => {
  if (!account) return false;

  const { id } = user;
  const { provider } = account;

  const userFromDb = await getUserByOauth(id, provider);

  if (!userFromDb) await createUserFromOauth({ user, account });
};
