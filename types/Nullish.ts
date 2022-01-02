export const getOrThrow = <T>(value: T | null | undefined): T => {
  if (value === undefined || value === null) {
    throw new Error("Expected value to exist.");
  } else {
    return value;
  }
};
