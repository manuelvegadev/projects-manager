import React from "react";
import { ClickableTile } from "@carbon/react";
import { useRouter } from "next/navigation";
// @ts-ignore Until the package is updated
import { ArrowRight } from "@carbon/icons-react";

interface TileLinkProps {
  children: React.ReactNode;
  href: string;
  pictogram?: React.ElementType;
  style?: React.CSSProperties;
}

export const TileLink: React.FC<TileLinkProps> = ({
  children,
  href,
  pictogram: Pictogram,
  style,
}) => {
  const { push } = useRouter();

  return (
    <ClickableTile
      href={href}
      onClick={(e) => {
        e.preventDefault();
        push(href);
      }}
      style={{
        ...{
          border: "2px solid var(--cds-border-subtle-01)",
          flex: "1 1 300px",
        },
        ...(style ? style : {}),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "4rem",
          fontSize: "1.125rem",
        }}
      >
        {children}
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {Pictogram ? <Pictogram width={48} height={48} /> : <div />}
          <span style={{ color: "var(--cds-link-primary)" }}>
            <ArrowRight size={20} />
          </span>
        </span>
      </div>
    </ClickableTile>
  );
};
