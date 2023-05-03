import { StatusResult } from "simple-git";

export interface IProjectStatusResponse {
  name: string;
  path: string;
  status: StatusResult;
}
