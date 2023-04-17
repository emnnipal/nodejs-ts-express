import createServer from './app';
import { APP, NODE_ENV, PORT } from './modules/shared/environment';
import { logger } from './modules/shared/utils/logger';

const app = createServer();

app.listen(PORT, () => {
  logger.info(`Listening on PORT: ${PORT}, APP: ${APP}, NODE_ENV: ${NODE_ENV}`);
});
