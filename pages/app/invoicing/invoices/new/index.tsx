import { UIShell } from "@/components";
import { Column, Grid } from "@carbon/react";

export default function NewInvoicePage() {
  return (
    <UIShell>
      <Grid>
        <Column span={16}>
          <h1>New Invoice</h1>
        </Column>
      </Grid>
    </UIShell>
  );
}
