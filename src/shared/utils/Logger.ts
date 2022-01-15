/* eslint-disable no-console */
import { formatISO } from 'date-fns';

export const getDateTime = (): string => formatISO(new Date());

export const logFormat = (module: string) => [`[${getDateTime()}]`, `[${module}]`];

export const logger = {
  info: (module: string, ...args: unknown[]) => console.log(...logFormat(module), ...args),
  error: (module: string, ...args: unknown[]) => console.error(...logFormat(module), ...args),
};
