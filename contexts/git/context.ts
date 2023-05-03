import { createContext } from "react";
import { Git } from "@/utils/git-actions";

export const GitContext = createContext<Git>({} as Git);

export default GitContext;
