import { useContext } from "react";
import GitContext from "./context";

export const useGit = () => {
  const context = useContext(GitContext);

  if (!context) {
    console.error("Error deploying the Confirm context");
  }

  return context;
};

export default useGit;
