import { UIShell } from "@/components";
import { Button, Column, Grid, Link } from "@carbon/react";
import { Add } from "@carbon/icons-react";
import { useRouter } from "next/navigation";

export default function InvoicingPage() {
  const { push } = useRouter();

  return (
    <UIShell>
      <Grid>
        <Column span={16}>
          <h1>Invoicing</h1>
        </Column>
        <Column span={16}>
          <Button renderIcon={Add}>New invoice</Button>
        </Column>
        <Column span={16}>
          <Link
            onClick={() => {
              push("/app/invoicing/invoices/default");
            }}
          >
            Default invoice
          </Link>
        </Column>
      </Grid>
    </UIShell>
  );
}
