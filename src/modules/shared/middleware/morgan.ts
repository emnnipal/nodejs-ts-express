import { NODE_ENV } from '../environment';
import { logger } from '../utils/logger';

import morgan, { StreamOptions } from 'morgan';

const stream: StreamOptions = {
  write: (message) => logger.info(message),
};

const skip = () => NODE_ENV !== 'development';

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream,
  skip,
});

export default morganMiddleware;
