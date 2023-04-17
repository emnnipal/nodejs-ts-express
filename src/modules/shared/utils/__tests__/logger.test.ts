import { getDateTime, logger } from '../logger';

import { describe, expect, it, vi } from 'vitest';

import { inspect } from 'util';

const console = {
  error: vi.fn(),
  log: vi.fn(),
  warn: vi.fn(),
};

vi.stubGlobal('console', console);

describe('loggers', () => {
  it('should able to get date and time', () => {
    expect(getDateTime()).toBeDefined();
    expect(getDateTime()).toMatch(/([0-9]+)-([0-9]+)-([0-9]+)T([0-9]+):([0-9]+):([0-9]+)[\s\S]+/);
  });

  it('should log messages', () => {
    const mockDetails = {
      name: 'test',
    };
    const mockModule = 'ok';
    const mockErrModule = 'error';

    logger.info(mockModule, mockDetails);
    logger.warn(mockErrModule, mockDetails);
    logger.error(mockErrModule, mockDetails);

    expect(console.log).toHaveBeenCalledWith(
      expect.any(String),
      '[info]',
      mockModule,
      inspect(mockDetails, false, null, true)
    );
    expect(console.warn).toHaveBeenCalledWith(
      expect.any(String),
      '[warn]',
      mockErrModule,
      inspect(mockDetails, false, null, true)
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.any(String),
      '[error]',
      mockErrModule,
      inspect(mockDetails, false, null, true)
    );
  });
});
