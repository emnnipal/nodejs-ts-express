/* eslint-disable no-console */
import dayjs from 'dayjs';

import { inspect } from 'util';

export const getDateTime = (): string => dayjs().format();

const logFormat = (level: keyof typeof console, logLabel: string, ...args: unknown[]) => [
  `[${getDateTime()}]`,
  `[${level}]`,
  logLabel,
  ...args.map((arg) => (typeof arg === 'object' ? inspect(arg, false, null, true) : arg)),
];

export const logger = {
  info: (label: string, ...args: unknown[]) => console.log(...logFormat('info', label, ...args)),
  warn: (label: string, ...args: unknown[]) => console.warn(...logFormat('warn', label, ...args)),
  error: (label: string, ...args: unknown[]) =>
    console.error(...logFormat('error', label, ...args)),
};
