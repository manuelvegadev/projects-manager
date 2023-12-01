export const getErrorMessage = {
  required: () => "Required field",
  min: (value: number) => `The minimum allowed value is ${value}`,
  max: (value: number) => `The maximum allowed value is ${value}`,
};
