import React from "react";

export type StateHandler<T> = {
  value: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

/**
 * Creates a state handler object with a given value and setter function.
 */
export const createStateHandler = <T>(
  value: T,
  setter: React.Dispatch<React.SetStateAction<T>>,
): StateHandler<T> => ({
  value,
  set: setter,
});

/**
 * Returns a promise that resolves after a given number of milliseconds.
 * */
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
