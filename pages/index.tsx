import { NextPage } from "next";
// @ts-ignore
import { Button, Column, Content, Grid, Link, Stack } from "@carbon/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@carbon/icons-react";

const AppPage: NextPage = () => {
  const { push } = useRouter();

  return (
    <Content>
      <Grid>
        <Column span={16}>
          <Stack gap={7}>
            <h1>Projects Manager</h1>
            <Button
              onClick={() => {
                push("/app");
              }}
              renderIcon={ArrowRight}
            >
              Go to App
            </Button>
            <small>
              By{" "}
              <Link href={"https://manuelvega.dev"} target={"_blank"}>
                Manuel Vega
              </Link>
            </small>
          </Stack>
        </Column>
      </Grid>
    </Content>
  );
};

export default AppPage;
