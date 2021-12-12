/* eslint-disable no-console */
import { formatISO } from 'date-fns';

export const getDateTime = (): Date | string => formatISO(new Date());

export const logger = (module: string, ...args: unknown[]) => {
  console.log(`[${getDateTime()}]`, `[${module}]`, ...args);
};

export const errLogger = (module: string, ...args: unknown[]) => {
  console.error(`[${getDateTime()}]`, `[${module}]`, ...args);
};
