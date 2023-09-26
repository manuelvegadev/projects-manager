import { GetServerSideProps } from "next";
import { IProjectStatusResponse } from "@/types/responses/git.types";
import { getAllProjects } from "@/utils/git-actions";
import { Button, ClickableTile, Column, Grid } from "@carbon/react";
// @ts-ignore
import { Add } from "@carbon/icons-react";

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
    <>
      <Grid>
        <Column span={16}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Projects list</h1>
            <Button renderIcon={Add} kind={"ghost"}>
              Add project
            </Button>
          </div>
        </Column>
      </Grid>
      <Grid>
        {projects.map((project, projectIndex) => (
          <Column
            sm={{ span: 4 }}
            md={{ span: 4 }}
            lg={{ span: 4 }}
            xlg={{ span: 4 }}
            max={{ span: 4 }}
            key={projectIndex}
          >
            <ClickableTile>
              <h5>{project.name}</h5>
              <code>{project.status.tracking}</code>
            </ClickableTile>
          </Column>
        ))}
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const projects: IProjectStatusResponse[] = await getAllProjects();

  return {
    props: { projects: JSON.parse(JSON.stringify(projects)) },
  };
};
