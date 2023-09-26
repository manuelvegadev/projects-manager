import { Column, Grid, ListItem, UnorderedList } from "@carbon/react";

export default function Home() {
  return (
    <>
      <Grid>
        <Column span={16}>
          <span style={{ textAlign: "center" }}>
            <h1>Projects Manager</h1>
          </span>
        </Column>
        <Column span={16}>
          <p>Manage your projects with ease.</p>
          <p>
            With Projects Manager you can easily manage your projects and deploy
            them to your server.
          </p>
          <UnorderedList isExpressive>
            <ListItem>
              <strong>Manage</strong> your projects
            </ListItem>
            <ListItem>
              <strong>Deploy</strong> your projects
            </ListItem>
            <ListItem>
              <strong>Monitor</strong> your projects
            </ListItem>
          </UnorderedList>
        </Column>
      </Grid>
    </>
  );
}
