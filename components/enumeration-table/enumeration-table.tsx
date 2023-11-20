import React from "react";

type EnumerationTableProps = {
  items: React.ReactNode[];
} & React.HTMLAttributes<HTMLDivElement>;

export const EnumerationTable: React.FC<EnumerationTableProps> = ({
  items,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: ".8125rem .5rem",
        ...style,
      }}
      {...props}
    >
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <span
              style={{
                color: "var(--cds-text-primary)",
              }}
            >
              {index + 1}.
            </span>
            <span
              style={{
                color: "var(--cds-text-primary)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {item}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};
