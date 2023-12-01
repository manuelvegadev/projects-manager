import { DefaultValues, FieldErrors, FieldValues } from "react-hook-form";
import React from "react";
import {
  ComposedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@carbon/react";
import {
  InputText,
  NoInputNumber,
  InputNumber,
  InputHidden,
  ComboBox,
} from "./sub-components";

export type ChildrenProps<F extends FieldValues> = {
  formErrors: FieldErrors<F>;
  errorMessage?: string;
  successMessage?: string;
  isSubmitting: boolean;
  success: boolean;
  error: boolean;
  canSubmit: boolean;
  formFieldComponents: {
    InputText: typeof InputText;
    InputNumber: typeof InputNumber;
    InputHidden: typeof InputHidden;
    NoInputNumber: typeof NoInputNumber;
    ComboBox: typeof ComboBox;
  };
};

export type FormBuilderProps<FormType extends FieldValues, ResponseType> = {
  onSubmit: (values: FormType) => ResponseType | Promise<ResponseType>;
  onSuccess?: (values: FormType, response: ResponseType) => void;
  onError?: (values: FormType, reason: string | void) => void;
  defaultValues?: DefaultValues<FormType>;

  children: (
    formBuilderChildrenProps: ChildrenProps<FormType>,
  ) => React.ReactNode;

  isModal?: boolean;
  isModalOpen?: boolean;
  isModalFormFluid?: boolean;
  modalLabel?: string;
  modalTitle?: string;
  modalSubmitButtonText?: string;
  modalWrapperProps?: Omit<React.ComponentProps<typeof ComposedModal>, "open">;
  modalHeaderProps?: Omit<
    React.ComponentProps<typeof ModalHeader>,
    "label" | "title"
  >;
  modalBodyProps?: Omit<React.ComponentProps<typeof ModalBody>, "hasForm">;
  modalFooterProps?: React.ComponentProps<typeof ModalFooter>;
  modalFormContainerProps?: React.HTMLAttributes<HTMLDivElement>;
};
