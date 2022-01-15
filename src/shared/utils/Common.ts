export const flattenObject = (data: Record<string, unknown>): Record<string, unknown> => {
  const getEntries = (
    collection: unknown[] | Record<string, unknown>,
    prefix = ''
  ): [string, unknown][] =>
    Object.entries(collection).flatMap(([key, value]) =>
      Object(value) === value
        ? getEntries(value as Record<string, unknown>, `${prefix} ${key}`)
        : [[`${prefix} ${key}`, value]]
    );

  return Object.fromEntries(getEntries(data));
};
