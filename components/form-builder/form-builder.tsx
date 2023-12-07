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
  InlineNotification,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Loading,
  // @ts-ignore TODO: Remove this when @carbon/react is updated
  Layer,
} from "@carbon/react";
import clsx from "clsx";
import { ChildrenProps, FormBuilderProps } from "@/components/form-builder";

export const FormBuilder = <F extends FieldValues, R>(
  props: FormBuilderProps<F, R>,
) => {
  const {
    children,
    onSubmit,
    onSuccess,
    onError,
    defaultValues,
    isModal,
    isFluid = false,
  } = props;

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
  //endregion

  const formHook = useForm<F>({
    ...defaultValues,
  });
  const {
    formState: { errors, isValid },
    getValues,
    watch,
  } = formHook;

  watch(() => {
    setSuccess(false);
    setError(false);
  });

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

  const components: ChildrenProps<F>["components"] = {
    InputText: InputText,
    InputNumber: InputNumber,
    InputHidden: InputHidden,
    NoInputNumber: NoInputNumber,
    ComboBox: ComboBox,
    Box: ({ children, ...props }) => (
      <div
        style={isFluid ? { padding: "1rem 0.8125rem" } : { padding: "1rem" }}
        {...props}
      >
        {children}
      </div>
    ),
  };

  Object.keys(components).forEach(
    (key) =>
      (components[key as keyof typeof components].defaultProps = { formHook }),
  );

  const childrenValue = children({
    formErrors: errors,
    errorMessage,
    successMessage,
    isSubmitting,
    success,
    error,
    components,
    canSubmit: isValid,
  });

  if (!isModal) {
    return <FluidForm onSubmit={submitHandler}>{childrenValue}</FluidForm>;
  }

  const {
    isModalOpen,
    isModalFormFluid = true,
    modalLabel,
    modalTitle,
    modalSubmitButtonText = "Save",
    modalWrapperProps,
    modalHeaderProps,
    modalBodyProps,
    modalFooterProps,
    modalFormContainerProps,
  } = props;

  return (
    <ComposedModal
      open={isModalOpen.value}
      {...modalWrapperProps}
      onClose={(e) => {
        e.preventDefault();
        isModalOpen.set(false);
      }}
    >
      <Loading
        active={isSubmitting}
        description={"Loading..."}
        small={false}
        withOverlay
      />
      <ModalHeader
        label={modalLabel}
        title={modalTitle}
        {...modalHeaderProps}
      />
      <form style={{ display: "contents" }} onSubmit={submitHandler}>
        <ModalBody
          hasForm
          hasScrollingContent
          aria-label={modalTitle}
          {...modalBodyProps}
          style={{ paddingBlockEnd: "5rem" }}
        >
          <div
            {...{
              ...modalFormContainerProps,
              className: clsx({
                ["cds--form"]: true,
                ["cds--form--fluid"]: isModalFormFluid,
                [modalFormContainerProps?.className ?? ""]:
                  !!modalFormContainerProps?.className,
              }),
            }}
          >
            <Layer>{childrenValue}</Layer>
          </div>
        </ModalBody>
        <ModalFooter {...modalFooterProps}>
          <Button kind="secondary" onClick={() => isModalOpen.set(false)}>
            Cancel
          </Button>
          <Button kind="primary" type={"submit"} disabled={!isValid}>
            {isValid ? modalSubmitButtonText : "Fill required fields"}
          </Button>
        </ModalFooter>
      </form>
      {success || error ? (
        <InlineNotification
          style={{
            position: "absolute",
            inset: "1rem",
            top: "auto",
            bottom: "5rem",
            maxInlineSize: "calc(100% - 2rem)",
            zIndex: 1,
          }}
          title={success ? "Done!" : "An error has occurred"}
          subtitle={success ? successMessage : errorMessage}
          kind={success ? "success" : "error"}
          hideCloseButton={true}
        />
      ) : null}
    </ComposedModal>
  );
};
