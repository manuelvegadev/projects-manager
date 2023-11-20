import { UIShell } from "@/components";
import { Column, Grid } from "@carbon/react";

export default function InvoicesPage() {
  return (
    <UIShell>
      <Grid>
        <Column span={16}>
          <h1>Invoices</h1>
        </Column>
      </Grid>
    </UIShell>
  );
}
