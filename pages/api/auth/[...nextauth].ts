import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { loginCallback } from "@/lib";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;
      await loginCallback({ user, account });
      return true;
    },
  },
});
