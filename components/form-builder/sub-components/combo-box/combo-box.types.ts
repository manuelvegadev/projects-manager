import React from "react";
import { ComboBox } from "@carbon/react";
import { UseFormReturn } from "react-hook-form";
import { ComboBoxItem } from "./combo-box";

export type ComboBoxCarbonProps = Omit<
  React.ComponentProps<typeof ComboBox>,
  "items" | "onChange" | "itemToString" | "itemToElement" | "titleText"
>;

export interface IComboBoxProps extends ComboBoxCarbonProps {
  formHook?: UseFormReturn<any>;
  name: string;
  wrapText?: boolean;
  items: ComboBoxItem[];
  initialSelectedItem?: ComboBoxItem;
  onChange?: (event: ComboBoxItem) => void;
  itemToString?: (item: ComboBoxItem) => string;
  itemToElement?: (item: ComboBoxItem) => React.ReactNode;
  // size?: "sm" | "md" | "lg";
  // placeholder?: string;
  label: string;
  // required?: boolean;
  // direction?: "bottom" | "top";
}
