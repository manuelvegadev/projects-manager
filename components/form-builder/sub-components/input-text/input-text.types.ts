import React from "react";
import { TextInput } from "@carbon/react";
import { UseFormReturn } from "react-hook-form";

export interface IInputTextProps
  extends Omit<
    React.ComponentProps<typeof TextInput>,
    "onChange" | "id" | "labelText"
  > {
  name: string;
  label: string;
  formHook?: UseFormReturn<any>;
  defaultValue?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  floatingErrorMessage?: boolean;
  fluid?: boolean;
}
