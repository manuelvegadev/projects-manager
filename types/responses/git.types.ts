import { StatusResult } from "simple-git";

export interface IProjectStatusResponse {
  id: string;
  name: string;
  path: string;
  status: StatusResult;
}
