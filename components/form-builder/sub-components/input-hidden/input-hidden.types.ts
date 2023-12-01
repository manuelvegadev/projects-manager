import React from "react";
import { UseFormReturn } from "react-hook-form";

export interface IInputHiddenProps extends React.HTMLProps<HTMLInputElement> {
  formHook?: UseFormReturn<any>;
  name: string;
  valueAsNumber?: boolean;
}
