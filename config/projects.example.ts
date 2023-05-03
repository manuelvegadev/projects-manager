import { IGitProjectConfig } from "@/utils/git-actions.types";

const projects: { [key: string]: IGitProjectConfig } = {
  "project-name": {
    name: "Project Name",
    path: "/path/to/project",
    git: {
      user: {
        name: process.env.GIT_USERNAME!,
        password: process.env.USER_PASSWORD!,
      },
    },
  },
};

export default projects;
