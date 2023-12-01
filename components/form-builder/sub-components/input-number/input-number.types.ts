import React from "react";
import { NumberInput } from "@carbon/react";
import { UseFormReturn } from "react-hook-form";

export interface IInputNumberProps
  extends Omit<
    React.ComponentProps<typeof NumberInput>,
    "name" | "label" | "onChange"
  > {
  formHook?: UseFormReturn<any>;
  name: string;
  label: string;

  // defaultValue?: number;
  onChange?: (value: number) => void;
  // required?: boolean;
  // min?: number;
  // max?: number;
  // step?: number;
  // value?: number;
}
