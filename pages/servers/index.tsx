import { NextPage } from "next";
import { UIShell } from "@/components";
import { Column, Grid, Stack } from "@carbon/react";
// @ts-ignore Until the package is updated

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
