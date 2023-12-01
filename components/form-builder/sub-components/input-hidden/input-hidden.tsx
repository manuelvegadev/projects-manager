import React, { useId } from "react";
import { IInputHiddenProps } from "./input-hidden.types";

export const InputHidden: React.FC<IInputHiddenProps> = ({
  formHook,
  name,
  value = 0,
  valueAsNumber = false,
  ...props
}) => {
  const id = useId();

  const inputProps: React.HTMLProps<HTMLInputElement> = {
    id: id + name,
    type: "hidden",
    value,
    ...props,
  };

  if (!formHook) {
    return <input {...inputProps} />;
  }

  const { register } = formHook;
  return <input {...inputProps} {...register(name, { valueAsNumber })} />;
};
