import React from "react";

type DetailsTableProps = {
  details: {
    [key: string]: string;
  };
} & React.HTMLAttributes<HTMLDivElement>;

export const DetailsTable: React.FC<DetailsTableProps> = ({ details }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: ".8125rem 1.25rem",
      }}
    >
      {Object.entries(details).map(([key, value]) => {
        return (
          <React.Fragment key={key}>
            <span style={{ color: "var(--cds-text-secondary)" }}>{key}</span>
            <span style={{ color: "var(--cds-text-primary)" }}>{value}</span>
          </React.Fragment>
        );
      })}
    </div>
  );
};
