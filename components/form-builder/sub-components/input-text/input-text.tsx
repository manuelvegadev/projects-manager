import {
  TextInput,
  unstable__FluidTextInput as FluidTextInput,
} from "@carbon/react";
import React, { useId } from "react";
import { getErrorMessage } from "@/components/form-builder";
import { RegisterOptions } from "react-hook-form";
import { IInputTextProps } from "./input-text.types";
import clsx from "clsx";

export const InputText: React.FC<IInputTextProps> = ({
  formHook,
  label,
  name,
  defaultValue,
  onChange,
  required = false,
  floatingErrorMessage = false,
  fluid = false,
  ...props
}) => {
  const id = useId();

  const Field = fluid ? FluidTextInput : TextInput;

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setValue(name, value);
    await trigger(name);
    if (onChange) onChange(value);
  };

  const inputProps: React.ComponentProps<typeof TextInput> = {
    ...props,
    id: id + name,
    labelText: label,
    defaultValue: defaultValue,
    onChange: onChangeHandler,
  };

  if (!formHook) {
    return <Field {...inputProps} />;
  }

  const {
    register,
    formState: { errors },
    trigger,
    setValue,
  } = formHook;

  const registerOptions: RegisterOptions = {};

  if (required) registerOptions.required = getErrorMessage.required();
  registerOptions.onChange = onChangeHandler;

  return (
    <Field
      {...inputProps}
      {...register(name, registerOptions)}
      invalid={!!errors[name]}
      invalidText={errors[name]?.message as string}
      className={clsx(
        {
          "cds--input__floating-error-message": floatingErrorMessage,
        },
        props.className,
      )}
    />
  );
};
