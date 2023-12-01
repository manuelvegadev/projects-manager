import { NumberInput } from "@carbon/react";
import React, { useId } from "react";
import { getErrorMessage } from "@/components/form-builder";
import { RegisterOptions } from "react-hook-form";
import { IInputNumberProps } from "./input-number.types";

export const InputNumber: React.FC<IInputNumberProps> = ({
  formHook,
  label,
  name,
  defaultValue = 0,
  onChange,
  required = false,
  min = 0,
  max = 999999999,
  step = 1,
  ...props
}) => {
  const id = useId();

  const inputProps: React.ComponentProps<typeof NumberInput> = {
    ...props,
    id: id + name,
    label: label,
    defaultValue: defaultValue,
    max: max,
    min: min,
    step: step,
    // @ts-ignore TODO: Fix the types
    onChange: async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValue(name, value);
      await trigger(name);
      if (onChange) onChange(Number(value));
    },
    hideSteppers: true,
  };

  if (!formHook) {
    return <NumberInput {...inputProps} />;
  }

  const {
    register,
    formState: { errors },
    trigger,
    setValue,
  } = formHook;

  const registerOptions: RegisterOptions = {
    min: { value: min, message: getErrorMessage.min(min) },
    max: { value: max, message: getErrorMessage.max(max) },
    valueAsNumber: true,
  };

  if (required) registerOptions.required = getErrorMessage.required();

  return (
    // @ts-ignore TODO: Fix the types
    <NumberInput
      {...inputProps}
      {...register(name, registerOptions)}
      invalid={!!errors[name]}
      invalidText={errors[name]?.message as React.ReactNode}
    />
  );
};
