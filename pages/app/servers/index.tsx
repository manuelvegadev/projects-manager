import { NextPage } from "next";
import { UIShell } from "@/components";
// @ts-ignore Until the package is updated
import { Column, Grid, Stack } from "@carbon/react";

const Page: NextPage = () => {
  return (
    <UIShell>
      <Grid>
        <Column span={16}>
          <Stack gap={7}>
            <h1>Servers</h1>
          </Stack>
        </Column>
      </Grid>
    </UIShell>
  );
};

export default Page;
