import { ComboBox as ComboBoxCarbon } from "@carbon/react";
import React, { useId } from "react";
import { RegisterOptions } from "react-hook-form";
import { IComboBoxProps } from "./combo-box.types";
import clsx from "clsx";
import { getErrorMessage } from "@/components/form-builder";

export type ComboBoxItem = {
  id: number;
  text: string;
};

export const ComboBox: React.FC<IComboBoxProps> = ({
  formHook,
  name,
  label,
  onChange,
  required = false,
  wrapText = false,
  ...props
}) => {
  const id = useId();

  // @ts-ignore
  const inputProps: React.ComponentProps<typeof ComboBoxCarbon> = {
    ...props,
    id: id + name,
    titleText: label,
    onChange: ({ selectedItem }) => {
      setValue(name, (selectedItem as ComboBoxItem)?.id);
      if (onChange) onChange(selectedItem as ComboBoxItem);
    },
    shouldFilterItem: ({ inputValue, item, itemToString }) => {
      return itemToString!(item)
        .toLowerCase()
        .includes(inputValue?.toLowerCase() || ""); // Not sure if works
    },
    className: clsx({ "combo-box--wrap-text": wrapText }, props.className),
  };

  if (!formHook) {
    return <ComboBoxCarbon {...inputProps} />;
  }

  const {
    register,
    formState: { errors },
    setValue,
  } = formHook;

  const registerOptions: RegisterOptions = {
    // min: { value: min, message: getErrorMessage.min(min) },
    // max: { value: max, message: getErrorMessage.max(max) },
    // valueAsNumber: true,
  };

  if (required) registerOptions.required = getErrorMessage.required();

  const registerProps = {
    ...register(name, registerOptions),
    onChange: undefined,
  };

  return (
    // @ts-ignore
    <ComboBoxCarbon
      {...inputProps}
      {...registerProps}
      invalid={!!errors[name]}
      invalidText={errors[name]?.message as string}
    />
  );
};
