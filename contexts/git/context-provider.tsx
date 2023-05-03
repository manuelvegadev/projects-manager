import { GitContext } from "./";
import { Git } from "@/utils/git-actions";
import React from "react";

interface IGItContextProvider {
  children: React.ReactNode;
}

export const GitContextProvider = ({ children }: IGItContextProvider) => {
  const git = new Git();

  return <GitContext.Provider value={git}>{children}</GitContext.Provider>;
};

export default GitContextProvider;
