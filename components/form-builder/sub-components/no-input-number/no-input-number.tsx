import React from "react";
import styles from "./no-input-number.module.scss";
import clsx from "clsx";

interface INoInputNumberProps {
  label: string;
  value: number;
  formatter?: (value: number) => string;
}

export const NoInputNumber: React.FC<INoInputNumberProps> = ({
  label,
  value,
  formatter,
}) => (
  <div className="cds--number">
    <span className={"cds--label"}>{label}</span>
    <div
      className={clsx([
        "cds--number__input-wrapper align-content-center",
        styles["no-input-number__value"],
      ])}
    >
      {formatter ? formatter(value) : value}
    </div>
  </div>
);
