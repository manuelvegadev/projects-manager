import React from "react";
import { formatCurrency } from "@/utils";

type ServicesTableProps = {
  services: {
    id: string;
    description: string;
    hours: number;
    rate: number;
    total: number;
  }[];
} & React.HTMLAttributes<HTMLDivElement>;

export const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto",
        gridAutoRows: "2.5rem",
        ...style,
      }}
      {...props}
    >
      {[
        "Service # / Service description",
        "Hours worked",
        "Hourly rate",
        "Total Amount",
      ].map((header) => {
        return (
          <div
            key={header}
            style={{
              paddingInline: "1rem",
              backgroundColor: "var(--cds-layer-accent)",
              fontWeight: "bold",
              color: "var(--cds-text-primary)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {header}
          </div>
        );
      })}
      {services.map((service, index) => {
        const cellStyle: React.CSSProperties = {
          paddingInline: "1rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "var(--cds-layer)",
          color: "var(--cds-text-secondary)",
        };

        const numberStyle: React.CSSProperties = {
          display: "inline-block",
          width: "100%",
          textAlign: "right",
        };

        return (
          <React.Fragment key={service.id}>
            <div style={{ ...cellStyle }}>
              {index + 1}. {service.description}
            </div>
            <div style={cellStyle}>
              <span style={numberStyle}>{formatCurrency(service.hours)}</span>
            </div>
            <div style={cellStyle}>
              <span style={numberStyle}>{formatCurrency(service.rate)}</span>
            </div>
            <div style={cellStyle}>
              <span style={numberStyle}>{formatCurrency(service.total)}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
