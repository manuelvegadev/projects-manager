import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  ComboBox,
  InputHidden,
  InputNumber,
  InputText,
  NoInputNumber,
} from "./sub-components";
import {
  Button,
  ComposedModal,
  FluidForm,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@carbon/react";
import clsx from "clsx";
import { ChildrenProps, FormBuilderProps } from "@/components/form-builder";

export const FormBuilder = <F extends FieldValues, R>({
  children,
  onSubmit,
  onSuccess,
  onError,
  defaultValues,
  isModal = false,
  isModalOpen = false,
  isModalFormFluid = true,
  modalLabel,
  modalTitle,
  modalSubmitButtonText = "Save",
  modalWrapperProps,
  modalHeaderProps,
  modalBodyProps,
  modalFooterProps,
  modalFormContainerProps,
}: FormBuilderProps<F, R>) => {
  //region React States
  const [isSubmitting, setIsSubmitting] =
    React.useState<ChildrenProps<F>["isSubmitting"]>(false);
  const [error, setError] = React.useState<ChildrenProps<F>["error"]>(false);
  const [success, setSuccess] =
    React.useState<ChildrenProps<F>["success"]>(false);

  const [successMessage, setSuccessMessage] =
    React.useState<ChildrenProps<F>["successMessage"]>();
  const [errorMessage, setErrorMessage] =
    React.useState<ChildrenProps<F>["errorMessage"]>();

  const [open, setOpen] = React.useState(isModalOpen);
  //endregion

  const formHook = useForm<F>({
    ...(defaultValues ?? undefined),
  });
  const {
    formState: { errors, isValid },
    getValues,
  } = formHook;

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    setError(false);
    setSuccess(false);
    try {
      const response = await onSubmit(getValues());
      setSuccess(true);

      if (onSuccess) onSuccess(getValues(), response);
    } catch (e) {
      setError(true);
      if (onError) {
        if (e instanceof Error) onError(getValues(), e.message);
        onError(getValues());
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFieldComponents: ChildrenProps<F>["formFieldComponents"] = {
    InputText: InputText,
    InputNumber: InputNumber,
    InputHidden: InputHidden,
    NoInputNumber: NoInputNumber,
    ComboBox: ComboBox,
  };

  Object.keys(formFieldComponents).forEach(
    (key) =>
      (formFieldComponents[
        key as keyof typeof formFieldComponents
      ].defaultProps = { formHook }),
  );

  const childrenValue = children({
    formErrors: errors,
    errorMessage,
    successMessage,
    isSubmitting,
    success,
    error,
    formFieldComponents,
    canSubmit: isValid,
  });

  return isModal ? (
    <ComposedModal open={open} {...modalWrapperProps}>
      <ModalHeader
        label={modalLabel}
        title={modalTitle}
        {...modalHeaderProps}
      />
      <form style={{ display: "contents" }} onSubmit={submitHandler}>
        <ModalBody hasForm hasScrollingContent {...modalBodyProps}>
          <div
            {...{
              modalFormContainerProps,
              className: clsx({
                ["cds--form"]: true,
                ["cds--form--fluid"]: isModalFormFluid,
                [modalFormContainerProps?.className ?? ""]:
                  !!modalFormContainerProps?.className,
              }),
            }}
          >
            {childrenValue}
          </div>
        </ModalBody>
        <ModalFooter {...modalFooterProps}>
          <Button kind="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button kind="primary" type={"submit"} disabled={!isValid}>
            {modalSubmitButtonText}
          </Button>
        </ModalFooter>
      </form>
    </ComposedModal>
  ) : (
    <FluidForm onSubmit={submitHandler}>{childrenValue}</FluidForm>
  );
};
