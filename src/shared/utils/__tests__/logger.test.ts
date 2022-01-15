import { getDateTime, logger } from '../logger';

describe('loggers', () => {
  const loggerSpy = jest.spyOn(console, 'log').mockImplementation();
  const errLoggerSpy = jest.spyOn(console, 'error').mockImplementation();

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
    logger.error(mockErrModule, mockDetails);

    expect(loggerSpy).toHaveBeenCalledWith(expect.any(String), `[${mockModule}]`, mockDetails);
    expect(errLoggerSpy).toHaveBeenCalledWith(
      expect.any(String),
      `[${mockErrModule}]`,
      mockDetails
    );
  });
});
