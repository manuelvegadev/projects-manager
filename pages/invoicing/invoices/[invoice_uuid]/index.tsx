import {
  DetailsTable,
  EnumerationTable,
  ServicesTable,
  UIShell,
} from "@/components";
// @ts-ignore
import { Column, Grid, Layer, Stack, Theme, Tile } from "@carbon/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { formatCurrency, numberToWords } from "@/utils";
// @ts-ignore
import * as colors from "@carbon/colors";
import React from "react";

type Query = {
  invoice_uuid: string;
};

export const getServerSideProps = (async ({ query }) => {
  const { invoice_uuid } = query as Query;

  return {
    props: {
      query: {
        invoice_uuid,
      },
    },
  };
}) satisfies GetServerSideProps<{ query: Query }>;

const InvoiceTile: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Tile style={{ backgroundColor: colors.blue[10] }}>
      <Layer>{children}</Layer>
    </Tile>
  );
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
const InvoicePage = ({ query }: PageProps) => {
  return (
    <UIShell>
      <Grid>
        <Column span={16} style={{ marginBlockEnd: "4rem" }}>
          <h1>
            Invoice <code>{query.invoice_uuid}</code>
          </h1>
          <small>November 11th 2023</small>
        </Column>
        <Column span={16} lg={{ span: 12, offset: 2 }}>
          <Theme theme={"g10"}>
            <Tile style={{ padding: "2rem" }}>
              <Layer>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <h1>Invoice</h1>
                  </div>

                  <div>
                    <DetailsTable
                      details={{
                        "Invoice#": "001",
                        "Invoice Date": "November 11th 2023",
                        "Due Date": "November 11th 2023",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      gridRow: "1 / 3",
                      gridColumn: "2 / 3",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                    }}
                  >
                    <h1>LOGO</h1>
                  </div>

                  <InvoiceTile>
                    <DetailsTable
                      details={{
                        "Billed by": "Manuel Vega",
                        Address:
                          "Calle 55A # 2AW - 45 T13 A503, Neiva, Colombia - 410001",
                        PAN: "1234567890",
                      }}
                    />
                  </InvoiceTile>

                  <InvoiceTile>
                    <DetailsTable
                      details={{
                        "Billed to": "US AP / Suzanna Arrazcaeta - Auxis, Inc",
                        Address:
                          "8151 Peters Road Suite 3500 Plantation, FL 33324",
                      }}
                    />
                  </InvoiceTile>

                  <div style={{ gridColumn: "1 / 3" }}>
                    <ServicesTable
                      services={[
                        {
                          id: "1",
                          description: "Android App Development",
                          hours: 500,
                          rate: 40,
                          total: 20000,
                        },
                        {
                          id: "2",
                          description: "iOS App Development",
                          hours: 500,
                          rate: 40,
                          total: 20000,
                        },
                      ]}
                    />
                  </div>

                  <div style={{ gridColumn: "1 / 2" }}>
                    <InvoiceTile>
                      <Stack gap={5}>
                        <h5>Bank & Payment Details</h5>
                        <DetailsTable
                          details={{
                            "Account Holder Name": "Foobar Labs",
                            "Account Number": "45366287987",
                            "IFSC Code": "SBIN0018159",
                            "SWIFT Code": "SBININBB476",
                            "Account Type": "Savings",
                            Bank: "State Bank of India",
                            UPI: "foobarlabs@oksbi",
                          }}
                        />
                      </Stack>
                    </InvoiceTile>
                  </div>

                  <div style={{ gridColumn: "1 / 2" }}>
                    <InvoiceTile>
                      <Stack gap={5}>
                        <h5>Terms and Conditions</h5>
                        <EnumerationTable
                          items={[
                            "Please pay within 15 days from the date of invoice, overdue interest @ 14%\n" +
                              "will be charged on delayed payments.",
                            "Please quote invoice number when remitting funds.",
                          ]}
                        />
                      </Stack>
                    </InvoiceTile>
                  </div>

                  <div style={{ gridColumn: "1 / 2" }}>
                    <InvoiceTile>
                      <Stack gap={5}>
                        <h5>Additional Notes</h5>
                        <span>
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using &apos;Content here,
                          content here.
                        </span>
                      </Stack>
                    </InvoiceTile>
                  </div>

                  <div style={{ gridColumn: "1 / 2", paddingInline: "1rem" }}>
                    For any enquiries, email us on{" "}
                    <strong>contact@foobarstudio.com</strong> or call us on{" "}
                    <strong>+91 98765 43210</strong>
                  </div>

                  <div
                    style={{
                      gridColumn: "2 / 3",
                      gridRow: "5 / 9",
                      paddingInline: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>Subtotal</h5>
                      <h5>{formatCurrency(21000)}</h5>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "var(--cds-support-success)",
                      }}
                    >
                      <h5>Discount</h5>
                      <h5>{formatCurrency(-50)}</h5>
                    </div>
                    <hr />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <h4>Total</h4>
                      <h3>{formatCurrency(20950)}</h3>
                    </div>
                    <div>
                      <small style={{ color: "var(--cds-text-secondary)" }}>
                        Invoice Total (in words)
                      </small>
                      <p>{numberToWords(20950)} dollars only</p>
                    </div>
                    <hr />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5>EarlyPay Discount</h5>
                        <h5>{formatCurrency(50)}</h5>
                      </div>
                      <small style={{ color: "var(--cds-text-secondary)" }}>
                        If paid before Nov 30, 2023 | 09:00 PM (EST)
                      </small>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "var(--cds-support-info)",
                      }}
                    >
                      <h5>EarlyPay Amount</h5>
                      <h5>{formatCurrency(20900)}</h5>
                    </div>
                  </div>
                </div>
              </Layer>
            </Tile>
          </Theme>
        </Column>
      </Grid>
    </UIShell>
  );
};

export default InvoicePage;
