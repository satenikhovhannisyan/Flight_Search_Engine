// Return a fresh object where all fields are marked as touched (true)
export const getAllTouched = (initialobject) =>
  Object.fromEntries(Object.keys(initialobject).map((field) => [field, true]))