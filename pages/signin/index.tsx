import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
// @ts-ignore
import { Button, Column, Content, Grid, Stack } from "@carbon/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ArrowLeft } from "@carbon/icons-react";
import { useRouter } from "next/navigation";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push } = useRouter();

  return (
    <Content>
      <Grid>
        <Column span={16}>
          <Stack gap={5}>
            <Button
              kind={"secondary"}
              renderIcon={ArrowLeft}
              onClick={() => {
                push("/");
              }}
            >
              Back to home
            </Button>
            {Object.values(providers).map((provider) => (
              <Button onClick={() => signIn(provider.id)} key={provider.name}>
                Sign in with {provider.name}
              </Button>
            ))}
          </Stack>
        </Column>
      </Grid>
    </Content>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/app" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
