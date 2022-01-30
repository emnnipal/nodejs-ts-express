import { NODE_ENV } from '../configs/app';
import Logger from '../utils/Logger';

import morgan, { StreamOptions } from 'morgan';

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => NODE_ENV !== 'development';

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream,
  skip,
});

export default morganMiddleware;
