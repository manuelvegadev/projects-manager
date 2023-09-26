import { GetServerSideProps } from "next";
import { IProjectStatusResponse } from "@/types/responses/git.types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { getAllProjects } from "@/utils/git-actions";
import {
  Button,
  Column,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";

interface IHomePage {
  projects: IProjectStatusResponse[];
}

export default function Home({ projects }: IHomePage) {
  async function updateProject(project: IProjectStatusResponse) {
    const url = new URL("/api/git/deploy", window.location.origin);
    url.searchParams.append("projectId", project.id);

    const response = await fetch(url.toString());
    const data = await response.json();

    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Grid>
      <Column span={16}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Name</TableHeader>
              <TableHeader scope="col">Path</TableHeader>
              <TableHeader scope="col">Status</TableHeader>
              <TableHeader scope="col">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, projectIndex) => (
              <TableRow key={projectIndex}>
                <TableHeader scope="row">{project.name}</TableHeader>
                <TableCell>{project.path}</TableCell>
                <TableCell>
                  <div style={{ height: "10rem", overflow: "scroll" }}>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={"json"}
                      showLineNumbers
                      wrapLines={true}
                    >
                      {JSON.stringify(project.status, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    onClick={async () => {
                      await updateProject(project);
                    }}
                  >
                    🚀 Deploy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Column>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const projects: IProjectStatusResponse[] = await getAllProjects();

  return {
    props: { projects: JSON.parse(JSON.stringify(projects)) },
  };
};
