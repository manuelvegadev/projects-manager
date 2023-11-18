import { NextPage } from "next";
import { TileLink, UIShell } from "@/components";
// @ts-ignore Until the package is updated
import { Column, Grid, Stack } from "@carbon/react";
// @ts-ignore Until the package is updated
import { Receipt, Servers } from "@carbon/pictograms-react";

const AppPage: NextPage = () => {
  return (
    <UIShell>
      <Grid>
        <Column span={16}>
          <Stack gap={7}>
            <Stack gap={5}>
              <h1>Projects Manager</h1>
              <p>Manage your projects with ease.</p>
              <p>
                With Projects Manager you can easily manage your projects and
                deploy them to your server.
              </p>
            </Stack>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <TileLink href={"/servers"} pictogram={Receipt}>
                Invoicing
              </TileLink>
              <TileLink href={"/servers"} pictogram={Servers}>
                Servers
              </TileLink>
            </div>
          </Stack>
        </Column>
      </Grid>
    </UIShell>
  );
};

export default AppPage;
