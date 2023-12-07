import React from "react";
// @ts-ignore TODO: Remove when typed.
import { Accordion, AccordionItem, CodeSnippet } from "@carbon/react";
import { Asterisk, Edit, Password, Time } from "@carbon/icons-react";
import { formatDateTime } from "@/utils";

export enum MetaDataKnowKeys {
  id = "id",
  created_at = "created_at",
  updated_at = "updated_at",
}

export type MetaDataKeys = MetaDataKnowKeys | string;

export const metaDataCopyable = [MetaDataKnowKeys.id];

export const metaDataIcons = {
  [MetaDataKnowKeys.id]: Password,
  [MetaDataKnowKeys.created_at]: Time,
  [MetaDataKnowKeys.updated_at]: Edit,
};

export const metaDataHeaders = {
  [MetaDataKnowKeys.id]: "Identifier",
  [MetaDataKnowKeys.created_at]: "Created at",
  [MetaDataKnowKeys.updated_at]: "Updated at",
};

export const MetaData: React.FC<{
  values: { [key: MetaDataKeys]: React.ReactNode | Date };
}> = ({ values }) => {
  return (
    <Accordion>
      <AccordionItem title="Metadata (read-only)">
        <div>
          {Object.entries(values).map(([key, value], index, items) => {
            const header = metaDataHeaders[key as MetaDataKnowKeys] ?? key;
            const Icon = metaDataIcons[key as MetaDataKnowKeys] ?? Asterisk;

            return (
              <div
                key={key}
                style={{
                  marginBottom: index === items.length - 1 ? 0 : "0.8125rem",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  columnGap: ".75rem",
                  gridAutoRows: "min-content",
                }}
              >
                <div
                  style={{
                    gridColumn: "1 / 2",
                    gridRow: "1 / 3",
                    alignSelf: "center",
                    lineHeight: 0,
                  }}
                >
                  <Icon size={24} />
                </div>
                <div style={{ fontWeight: "bold" }}>{header}</div>
                <div>
                  {metaDataCopyable.includes(key as MetaDataKnowKeys) ? (
                    <div style={{ paddingBlockStart: ".125rem" }}>
                      <CodeSnippet type={"inline"} align={"right"}>
                        {value}
                      </CodeSnippet>
                    </div>
                  ) : value instanceof Date ? (
                    formatDateTime(value)
                  ) : (
                    value
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </AccordionItem>
    </Accordion>
  );
};
